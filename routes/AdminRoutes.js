const express = require('express');

const router = express.Router();
const AdminCtl= require('../controller/AdminCtl');
const Admin = require('../models/AdminModel');

router.get('/',AdminCtl.signIn);
router.post('/checkSignIn',AdminCtl.checkSignIn);
router.get('/logOut',AdminCtl.logOut);

router.get('/deshBoard',AdminCtl.DashBoard);

router.get('/addAdmin',AdminCtl.addAdmin);

router.get('/viewAdmin',AdminCtl.viewAdmin);

router.post('/insertAdminRecord',Admin.uploadAdminImage,AdminCtl.insertAdminRecord);

router.get('/adminDelete/:id',AdminCtl.adminDelete);

router.get('/adminUpdate/:id',AdminCtl.adminUpdate);

router.post('/editAdminRecord',Admin.uploadAdminImage,AdminCtl.editAdminRecord);

module.exports = router;