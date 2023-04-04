const mongoose = require('mongoose');


const InsurancePolicySchema = new mongoose.Schema({
    purchasedBy:{
     type:String,
     required:[true,'Please Provide purchasedBy']
    },

    policyNumber:{
         type:Number,
        required:[true,'Please Provide Policy Number']
    }
    ,

    policyType:{
        type:String,
        required:[true,'Please Provide PolicyType']
    },
    coverageAmount:{
        type:Number,
        required:[true,'Please Provide Coverage Amount']
    },
    premiumAmount:{
      type:Number,
      required:[true,'Please Provide Premium Amount']
    },
    startDate:{
        
        type:String,
   pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"

    }
    ,
    endDate:{
        
        type:String,
   pattern: "(((19|20)([2468][048]|[13579][26]|0[48])|2000)[/-]02[/-]29|((19|20)[0-9]{2}[/-](0[469]|11)[/-](0[1-9]|[12][0-9]|30)|(19|20)[0-9]{2}[/-](0[13578]|1[02])[/-](0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}[/-]02[/-](0[1-9]|1[0-9]|2[0-8])))"

    }
    
  
},{timestamps:true});

 
module.exports = mongoose.model("Insurance-policy",InsurancePolicySchema);