const {StatusCodes} = require('http-status-codes');
const Claim = require('../models/claim');
const {BadRequestError,NotFoundError} = require('../errors');

const createclaim = async(req,res)=>{
    const claim = await Claim.create(req.body);
    return res.status(StatusCodes.CREATED).json({claim});
}

const getclaim = async(req,res)=>{
    const {params:{id:claimId}} = req;

    const claim = await Claim.findOne({
    _id:claimId
    })

    if(!claim){
         throw NotFoundError(`No ClaimID with ${claimId}`)
    }

    res.status(StatusCodes.OK).json({claim});
}

const getallclaim = async(req,res)=>{
    const claim = await Claim.find().sort('policyNumber');

    res.status(StatusCodes.OK).json({claim,count:claim.length});
}

const updateclaim = async(req,res)=>{
    const {body:{policyNumber,claimNumber,description,claimDate,claimStatus},params:{id:claimId}} = req;

    if(!policyNumber || !claimNumber || !description || !claimDate || !claimStatus){
        throw new BadRequestError('This can not be Blank')
    }

    const claim = await Claim.findByIdAndUpdate({
        _id:claimId
    },req.body,{new:true,runValidators:true});

     if(!claim){
        throw new NotFoundError(`No Claim Found with id ${claimId}`)
    }

    res.status(200).json({claim});
}

const deleteclaim = async(req,res)=>{
     const {params:{id:claimId}} = req;
     
    const claim = await Claim.findByIdAndDelete({
        _id:claimId,
    });

    if(!claim){
        throw new NotFoundError(`No Claim Found with Id ${claimId}`)
    }

    res.status(200).send();
}
module.exports = {createclaim,getallclaim,getclaim,updateclaim,deleteclaim};