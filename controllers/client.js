const ClientSchema = require("../models/client");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError,NotFoundError} = require("../errors");
const bcrypt = require('bcryptjs');

const getallclient = async(req,res)=>{
     
    const client = await ClientSchema.find().sort('createAt');
    
    res.status(StatusCodes.OK).json({client,count:client.length});
}

const getclient = async(req,res)=>{
    const {params:{id:clientId}} = req;

    const client = await ClientSchema.findOne({
        _id:clientId
    })

    if(!client){
        throw new NotFoundError(`No client ID found ${clientId}`)
    }

    res.status(StatusCodes.OK).json({client});
}

const updateclient = async(req,res)=>{
    const {body:{password,name,email},params:{id:clientId}} = req;

    if(!password , !name , !email){
        throw new BadRequestError("This can not be blank");
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);


    const client = await ClientSchema.findByIdAndUpdate({
        _id:clientId,
    },req.body,{new:true,runValidators:true})

    if(!client){
        throw new NotFoundError(`No client Found with id ${clientId}`)
    }

    res.status(200).json({client});
}

const deleteclient = async(req,res)=>{
    const {params:{id:clientId}} = req;
     
    const client = await ClientSchema.findByIdAndDelete({
        _id:clientId,
    });

    if(!client){
        throw new NotFoundError(`No client Found with Id ${userId}`)
    }

    res.status(200).send();
}

module.exports = {getallclient,getclient,updateclient,deleteclient};