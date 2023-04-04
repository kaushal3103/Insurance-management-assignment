const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = async(req,res,next)=>{
    const authheader = req.headers.token;
  

    if(!authheader || !authheader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid Credientials')
    }

    const token = authheader.split(' ')[1];

    try{
     const payload = jwt.verify(token,process.env.JWT_SECRET);
     req.client = {clientId:payload.clientId,name:payload.name};
     
     next();
    }catch(error){
     console.log(error);
     res.status(403).json('You are not allowed to do that')
    }
}

module.exports = {auth};