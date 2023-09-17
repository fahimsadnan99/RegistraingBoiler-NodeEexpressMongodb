const express = require('express');
const {signIn,signUp} = require('../controller/userController')



const User = express.Router()

User.route("/signIn").post(signIn)
User.route("/signUp").post(signUp)



module.exports = User;