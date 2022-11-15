const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.json({msg:"app work 123"})
})

module.exports = router;