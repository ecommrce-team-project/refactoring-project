const jwt=require('jsonwebtoken');
const createError=require('http-errors');
require('dotenv').config();

module.exports={
    signToken:(userId,role)=>{
        return new Promise((resolve,reject)=>{
            const payload={
                id:userId,
                role:role,
                iss:process.env.JWT_ISSUER,
            };
            jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRATION },(err,token)=>{
                if(err){
                    console.error(err);
                    reject(createError.InternalServerError('Token generation failed'));
                }else{
                    resolve(token);
                }
            });
        });

        


}}