const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    // createdAt: {
    //     type: Date,
    //     expires: 60,
    //     default: Date.now
    // },
    // expireAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: { expires: '1m' },
    // },
})

// collection creation
const Token = mongoose.model("Token", tokenSchema)

module.exports=Token
