const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PasswordSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    url: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = User = mongoose.model("passwords", PasswordSchema);