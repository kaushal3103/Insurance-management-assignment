const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
   policyNumber:{
    type:Number,
    required:[true,'Please Provide policyNumber']
   },
   claimNumber:{
    type:Number,
    required:[true,'Please Provide claimNumber']
   },
   description:{
    type:String,
    required:[true,'Please Provide description'],
    minlength:10
   },
   claimDate:{       
   type:String,
   pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"

    }
    ,
    claimStatus:{
    type:String,
    required:[true,'Please Provide claim Status']
    }
},{timestamps:true})

module.exports = mongoose.model("Claim",claimSchema);