const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const ClientSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Please Provide your Firstname'],
        minlength:3,
        maxlength:20
    }
    ,
    DateofBirth:{
       

        type:String,
   pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"

    }
    , 
    email:{
        type:String,
        required:[true,'Please Provide your Email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'
        ],
        unique:true
    }
    ,
    password:{
        type:String,
        required:[true,'Please Provide your Password'],
        minlength:5,
    },
    address:{
         type:String,
        required:[true,'Please Provide your Address'],
        minlength:5,
    },
    contact:{
        type:Number,
        required:[true,'Please Provide your Number'],
        minlength:10,
    }
},
{timestamps:true}
);

ClientSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

ClientSchema.methods.createJWT = function(){
   
    return jwt.sign({clientId:this._id,name:this.Name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME
    })
}

ClientSchema.methods.comparePassword = async function(candiatepassword){
    const correctpass = await bcrypt.compare(candiatepassword,this.password);
    return correctpass ;
}

module.exports = mongoose.model('Client',ClientSchema);