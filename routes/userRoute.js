const router = require('express').Router()
const User = require("../model/userSchema")
const Token = require("../model/TokenSchema")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const Authenticate = require("../middleware/Authenticate")
const sendEmail = require('../util/sendEmail')

// user validation
const validateRegUser = [
    body('name').not().trim().isEmpty().withMessage("Fullname is required."),
    body('email').not().trim().isEmpty().withMessage("Email is required.").isEmail().withMessage("Please Enter a valid Email"),
    body('password').not().trim().isEmpty().withMessage("Password is required.").isLength({ min: 6 }).withMessage("Password should contain minimum 6 character"),
    body('cpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Confirm Password doesn't match")
        } else {
            return true
        }
    })
]

// Create A New User
router.post('/create', validateRegUser, async (req, res, next) => {
    let { name, email, password, cpassword } = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({error:errors.formatWith(err=>err.msg).mapped()})
        } else {
            let user = await User.findOne({ email: email, verified:true})
            let unverifiedUser = await User.findOne({ email: email, verified:false})
            
            if (user) {
                res.status(400).json({error:"Email already exist"})
            } else {
                if(unverifiedUser){
                    await unverifiedUser.remove()
                    await Token.deleteOne({userId:unverifiedUser._id})
                }
                
                const hashedPassword = await bcrypt.hash(password, 10)
                let createdUser = await User.create({ name, email, password: hashedPassword })
                
                const token = jwt.sign({ _id: createdUser._id }, process.env.SECRET_KEY)
                
                await Token.create({ userId: createdUser._id, token: token })
                
                const url = `${process.env.CLIENT}user/${createdUser._id}/verify/${token}`

                // Email Template 
                // const email_temp = `<div style="min-height:50px;width:100%;padding:10px 0;"><a href=${url} style="text-decoration:none; background:#474bfc;color:white;padding:10px 30px;border-radius:4px;font-size:1.2rem;cursor:pointer;">Verify Account</a></div>`
                const email_temp = url
                
                // Remove the user from user and token model if not verified account after 5 min
                // setTimeout(async () => {
                //     createdUser = await User.findOne({ email: createdUser.email, verified: false })
                    // await createUserToken.remove()
                    // await createdUser.remove()
                // }, 300000)
                
                req.body.emailData={userEmail:createdUser.email, subject:"Please Verify Your Account", text:email_temp}
                next()                
            }
        }
        
    } catch (err) {
        res.status(400).json({error:err.message})
    }
},
    sendEmail
)

// Verify account 
router.get('/user/:id/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, verified:false })
        const checkToken = await Token.findOne({ userId: req.params.id, token: req.params.token })
        
        if (!user || !checkToken) {
            res.status(400).json({error:"Invalid Link"})
        } else if(user && checkToken) {
            await User.findByIdAndUpdate({ _id: req.params.id }, {verified: true })
            await checkToken.remove()

            const token = await jwt.sign({ _id: req.params.id }, process.env.SECRET_KEY, { expiresIn: "7d" })
            res.status(200).json({message:"Email Verified Successfully",token, name:user.name})
        }

    } catch (err) {
        res.status(400).json({error_verify:err.message})
    }
})

// Login A User
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            res.status(400).json({error:"Please fill the form correctly"})
        } else {
            const user = await User.findOne({ email: email, verified:true })
        
            if (!user) {
                res.status(400).json({error:"No account with this Email"})
            } else {
                const checkPassword = await bcrypt.compare(password, user.password)
                if (checkPassword) {
                    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
                    res.status(200).json({ message: "User Login Successfully", token, name:user.name })
                } else {
                    res.status(400).json({error:"Wrong Info"})
                }
            }
        }
            
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

// Check Auth
router.get('/auth', Authenticate, (req, res) => {
    res.status(200).json({message:"Authenticate User", name:req.rootUser.name})
})

// send main
router.get("/mail",async (req, res, next)=>{
    req.body.emailData={userEmail:'shajib.dev@outlook.com', subject:"Please Verify Your Account", text:"This is just a demo text to check the is gone to reciever or not perfectly. so please dont be afraid of this email."}
    next()    
}, sendEmail)


module.exports = router