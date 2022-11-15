const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, validUser, validLogin, genToken } = require("../models/userModel")
const { authToken } = require("../auth/authToken")
const router = express.Router();

router.get("/", async (req, res) => {
    // let data = await UserModel.find({});
    // res.json(data);
    // console.log(data);
    res.json({msg:"users work"});
})

router.get("/userInfo", authToken, async (req, res) => {
    let user = await UserModel.findOne({ _id: req.tokenData._id }, { pass: 0 });
    res.json(user);

})


router.post("/", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.pass = await bcrypt.hash(user.pass, 10);
        await user.save();
        user.pass = "****"
        res.status(201).json(user);
    }
    catch (err) {
        if(err.code==11000){
            return res.status(400).json({msg:"Email already in system"})
        }
        console.log(err);
        res.status(500).json({ err: "err", err});
    }

});

router.post("/login", async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    let user = await UserModel.find({ email: req.body.email });
    if (user.length < 1) {
        return res.status(401).json({ msg: "user not found" });
    }
    let passValid = await bcrypt.compare(req.body.pass, user[0].pass);
    if (!passValid) {
        return res.status(401).json({ msg: "password worng" });
    }
    let newToken = genToken(user[0]._id);
    res.json({ token: newToken })

})

module.exports = router;