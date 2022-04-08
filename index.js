const express = require('express')
const app = express()
const port =process.env.PORT || 8000
const path = require('path');
const bodyparser = require("body-parser")
require('dotenv').config()
require('./db/conn')

app.use(express.json())
app.use(bodyparser.json())

app.use("/api", require("./routes/userRoute"))

// 3: setup in heroku 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"/my-app/build/")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,"my-app",'build','index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})