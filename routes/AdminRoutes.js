const express = require('express');

const router = express.Router();
const AdminCtl= require('../controller/AdminCtl');
const Admin = require('../models/AdminModel');

// login system ----
router.get('/',AdminCtl.signIn);
router.post('/checkSignIn',AdminCtl.checkSignIn);
router.get('/logOut',AdminCtl.logOut);
// --------------

//show profile
router.get('/myProfile',AdminCtl.myProfile);
//--------------

// change password -----
router.get('/changePassword',AdminCtl.changePassword);
router.post('/changeNewPassword',AdminCtl.changeNewPassword);
//--------------

// forget password -----------

router.get('/checkEmail',(req,res)=>{
    return res.render('admin/checkEmail');
})

router.post('/verifyEmail',AdminCtl.verifyEmail);

router.get('/checkOTP',AdminCtl.checkOtp)

router.post('/verifyOtp',AdminCtl.verifyOtp);

router.get('/forgetPassword',AdminCtl.forgetPassword)

router.post('/setNewPassword',AdminCtl.setNewPassword);

//-----------


router.get('/deshBoard',AdminCtl.DashBoard);

router.get('/addAdmin',AdminCtl.addAdmin);

router.get('/viewAdmin',AdminCtl.viewAdmin);

router.post('/insertAdminRecord',Admin.uploadAdminImage,AdminCtl.insertAdminRecord);

router.get('/adminDelete/:id',AdminCtl.adminDelete);

router.get('/adminUpdate/:id',AdminCtl.adminUpdate);

router.post('/editAdminRecord',Admin.uploadAdminImage,AdminCtl.editAdminRecord);

module.exports = router;
