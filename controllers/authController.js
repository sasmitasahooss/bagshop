const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');
const userModel = require("../models/user-model")

module.exports.registerUser =async function(req,res){
    try{
        let {fullname, email, password}= req.body;
        let user = await userModel.findOne({email:email});
        if(user){} return res.status(401).send("you already have an account");
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt,async function(err, hash){
                if (err) return res.send(err.message);
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                })
                let token= generateToken(user);
                res.cookie("token", token);
                res.send("user created successfully");
            })
        })
       
    }
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginUser = async function (req,res) {
    let{email, password}=req.body;
    let user = await userModel.findOne({email:email});
    if (!user) 
        return req.flash("error","You have not created any account yet");
    bcrypt.compare(password, user.password, function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
           res.redirect("/shop")
        }
        else{
            req.flash("error","Incorrect Password");
           
            res.redirect("/")
        }
    })
    
};

module.exports.logoutUser = async function(req,res){
    
}