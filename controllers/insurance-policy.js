const {StatusCodes} = require('http-status-codes');
const Policy = require('../models/insurance-policy');
const {BadRequestError,NotFoundError} = require('../errors');

const createpolicy = async(req,res)=>{
    const policy = await Policy.create(req.body);
    return res.status(StatusCodes.CREATED).json({policy});
}

const getpolicy = async(req,res)=>{
    const {params:{id:policyId}} = req;

    const policy = await Policy.findOne({
        _id:policyId
    });

    if(!policy){
        throw new NotFoundError(`Not PolicyID  with ${policyId}`);

    }

    res.status(StatusCodes.OK).json({policy});
}

const getallpolicy = async(req,res)=>{
    const policy = await Policy.find().sort('purchasedBy');

    res.status(StatusCodes.OK).json({policy,count:policy.length});
}

const updatepolicy = async(req,res)=>{
const {body:{policyNumber,purchasedBy,policyType,coverageAmount,premiumAmount,startDate,endDate},params:{id:policyId}} = req ;
if(!policyNumber || !purchasedBy || !policyType || !coverageAmount || !premiumAmount || !startDate || !endDate){
    throw new BadRequestError("This can not be blank");
}

 const policy = await Policy.findByIdAndUpdate({
        _id:policyId,
    },req.body,{new:true,runValidators:true})

    if(!policy){
        throw new NotFoundError(`No Policy Found with id ${policyId}`)
    }

    res.status(200).json({policy});

}

const deletepolicy = async(req,res)=>{
     const {params:{id:policyId}} = req;
     
    const user = await Policy.findByIdAndDelete({
        _id:policyId,
    });

    if(!user){
        throw new NotFoundError(`No Policy Found with Id ${policyId}`)
    }

    res.status(200).send();
}
module.exports = {createpolicy,getpolicy,getallpolicy,updatepolicy,deletepolicy};