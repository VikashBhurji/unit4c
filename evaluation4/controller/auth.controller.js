require('dotenv');
const jwt=require('jsonwebtoken');
const {User}=require('../models/user.model');
const newToken=(user)=>{
    return jwt.sign({user},'${process.env.JWT_SECRET_KEY}')
}
const register=async(req,res)=>{   
try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).send({messege:'please try another email'});
        }
        user=await User.create(req.body);
        const token=newToken(user);
        req.send({user,token});
    } catch (error) {
        return res.status(401).send({messege:error.messege});
    }

}
const login =async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send({messege:'please try another email'});
        }
            const match=user.checkPassword(req.body.password);
            if(!match){
                return res.send({messege:'email or  password doesnot match'});
            }
            const token=newToken(user);
            req.send({user,token});

        
    } catch (error) {
        return req.status(401).send({messege:error.messege});
    }
}
module.exports={register,login};