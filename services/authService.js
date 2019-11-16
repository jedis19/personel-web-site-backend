var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')

var User = require("../models/user")


//Kayıt olma işlemi
router.post('/register',async (req,res) =>{
    var user = new User(req.body);
    var checkUser = await User.findOne({email:user.email})
    if(!checkUser){
        user.save((error) => {
            if(!error){
                return res.status(200).send({message:'User has been created'});
            }
            return res.sendStatus(401).send({message:error})
        })
    }
    if(checkUser){
        return res.status(400).send({message:'Bu maile ait bir üyelik zaten var'})
    }
   
})

//Login işlemi
router.post('/login',cors(corsOptions),async (req,res) =>{
    res.setHeader('Access-Control-Allow-Origin', "https://mywebapp-506a1.firebaseapp.com");
    var userData =  req.body
    var user= await User.findOne({email:userData.email});
    if(!user){
        return res.status(400).send({message:"invalid email or password"})
    }
    if(userData.email != user.email){
        return res.status(400).send({message:"invalid email or password"}) 
    }
    if(userData.password != user.password){
        return res.status(400).send({message:"invalid email or password"}) 
    }
    var name = user.firstName
    var lastName = user.lastName;
    var email = user.email;
    var payload = {}
    var token = jwt.encode(payload,"12345")
    
    
    return res.status(200).send({token,name,lastName,email})
})


var authService = {router}


module.exports = authService

