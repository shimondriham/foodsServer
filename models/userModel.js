const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secret");
const userScema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    role: {
        type:String , default:"regular"
    },
    date_creatad:{
        type:Date , default:Date.now()
    }
});

exports.UserModel =  mongoose.model("users", userScema);

exports.genToken = (_usreId)=>{
    let token = jwt.sign({_id:_usreId},config.tokenSecret,{expiresIn:"600mins"});
    return token;
}
exports.validUser = (_badyData)=>{
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),  
        email: Joi.string().min(2).max(99).required().email(),  
        pass: Joi.string().min(2).max(99).required(),  
    })
    return joiSchema.validate(_badyData);
}
exports.validLogin = (_badyData)=>{
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).required().email(),  
        pass: Joi.string().min(2).max(99).required(),  
    })
    return joiSchema.validate(_badyData);
}