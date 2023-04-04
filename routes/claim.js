const express = require('express');
const router  = express.Router();

const {createclaim,getallclaim,getclaim,updateclaim,deleteclaim}= require("../controllers/claim");
const {auth} = require("../middlewares/authentication");

router.post('/create-claim',auth,createclaim);
router.get('/:id',auth,getclaim);
router.get('/',auth,getallclaim);
router.patch('/:id',auth,updateclaim);
router.delete('/:id',auth,deleteclaim);

module.exports = router;