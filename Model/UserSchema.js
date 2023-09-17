const mongoose = require("mongoose")
const JWT = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user","admin",],
        default : "user"

    }
})

userSchema.methods.generateJWT = function(){
    const token = JWT.sign(
        { _id: this._id, name: this.name, email: this.email, role: this.role },
        process.env.KEY,
        { expiresIn: "27d" }
      );
      return token;
}

module.exports = mongoose.model("user", userSchema)