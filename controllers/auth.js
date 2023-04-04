const ClientSchema = require('../models/client');
const {BadRequestError,UnauthenticatedError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const register = async function(req,res){
    const client = await ClientSchema.create({...req.body});
    const token = client.createJWT();

    return res.status(StatusCodes.CREATED).json({client:{name:client.Name},token})
}

const login = async function(req,res){
    const {email,password} = req.body;
    
     
    if(!email || !password){
       throw new BadRequestError('Please Provide email/password')
    }

    const client = await ClientSchema.findOne({email});

    if(!client){
        throw new UnauthenticatedError('Invalid Credientials');
    }

    const correctpass = await client.comparePassword(password);

    if(!correctpass){
       throw new UnauthenticatedError('invalid credientials');
     }

    const token = client.createJWT();

   return res.status(StatusCodes.CREATED).json({client:{name:client.Name},token})
}

module.exports = {register,login}