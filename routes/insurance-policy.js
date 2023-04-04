const express = require('express');

const router = express.Router();

const {createpolicy,getpolicy,getallpolicy,updatepolicy,deletepolicy} = require("../controllers/insurance-policy");
const {auth} = require("../middlewares/authentication");

router.post("/create-policy",auth,createpolicy);
router.get("/:id",auth,getpolicy);
router.get("/",auth,getallpolicy);
router.patch("/:id",auth,updatepolicy);
router.delete("/:id",auth,deletepolicy);

module.exports = router;