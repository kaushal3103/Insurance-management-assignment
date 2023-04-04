const express = require('express');

const router = express.Router();

const {getallclient,getclient,updateclient,deleteclient} =require("../controllers/client");
const {auth} = require("../middlewares/authentication");

router.get("/",auth,getallclient);
router.get("/:id",auth,getclient);
router.patch("/:id",auth,updateclient);
router.delete("/:id",auth,deleteclient);

module.exports = router;