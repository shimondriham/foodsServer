const mongoose = require("mongoose");
const joi = require("joi");
const foodScema = new mongoose.Schema({
    name: String,
    img: String,
    cal: Number,
    price: Number
});

const FoodModel = mongoose.model("foods", foodScema);
exports.FoodModel = FoodModel;
// exports.FoodModel =  mongoose.model("foods", foodScema);


exports.validFood = (_badyData) => {
    let joiSchema = joi.object({
        name: joi.string().min(2).max(99).required(),
        img: joi.string().min(2).max(300).allow(null,""),
        cal: joi.number().min(1).max(9999).required(),
        price: joi.number().min(1).max(9999).required()
    })
    return joiSchema.validate(_badyData);
}