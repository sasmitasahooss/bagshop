const express= require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index",{error, loggedin:false});
});

router.get("/logout", isLoggedin, function(req,res){
    res.cookie("token",'');
    res.redirect("/");
})

router.get("/shop",isLoggedin,async function(req,res){
        let products= await productModel.find();
        let success=req.flash("success",)
     res.render("shop",{products, success});
 })

 router.get("/cart", isLoggedin, async function(req,res){
    // let products = await productModel.find();
    // let success = req.flash("success");
    let user = await userModel
               .findOne({email:req.user.email})
               .populate("cart")
    res.render("cart", {user});
})
router.get("/addtocart/:id", isLoggedin, async function(req,res){
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.id)
    await user.save();
    req.flash("success", "Added to cart")
    res.redirect("/shop")
})


module.exports= router