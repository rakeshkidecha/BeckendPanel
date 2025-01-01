const Admin = require('../models/AdminModel');
const path = require('path');
const fs = require('fs');

module.exports.DashBoard = async (req,res) =>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData){
            return res.render('admin/dashBoard',{adminData});
        }else{
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

// add new admin ---------

module.exports.addAdmin = async (req,res)=>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData){
            return res.render('admin/addAdmin',{adminData});
        }else{
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

module.exports.insertAdminRecord = async(req,res)=>{
    try {
        let imagePath = '';

        if(req.file){
            imagePath = Admin.imgPath+'/'+req.file.filename
        }

        req.body.admin_image = imagePath;
        req.body.name = req.body.fname+' '+req.body.lname;

        const addedAdminRecord = await Admin.create(req.body);

        if(addedAdminRecord){
            console.log("Admin record add successfully...");
            return res.redirect('/viewAdmin');
        }else{
            console.log("Faild to add admin record..");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}


// View admin details -----------

module.exports.viewAdmin = async (req,res)=>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData){
            const getAdminRecords = await Admin.find();
            return res.render('admin/viewAdmin',{getAdminRecords,adminData});
        }else{
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

// delete admin -----------

module.exports.adminDelete = async (req,res)=>{
    try {
        const singleAdmin = await Admin.findById(req.params.id);
        
        if(singleAdmin){
            try {
                const deletePath = path.join(__dirname,'..',singleAdmin.admin_image);
                await fs.unlinkSync(deletePath);
            } catch (err) {
                console.log("Image not found",err);
            }

            const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

            if(deletedAdmin){
                console.log("Admin record deleted successfully...");
                return res.redirect('back');
            }else{
                console.log("Faild to delete admin record...");
                return res.redirect('back');
            }

        }else{
            console.log("Admin not found");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

// update edmin details ----------

module.exports.adminUpdate = async(req,res)=>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData){
            const singleAdmin = await Admin.findById(req.params.id);
            return res.render('admin/editAdmin',{singleAdmin,adminData});
        }else{
            return res.redirect('/');
        }
        
        
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

module.exports.editAdminRecord = async(req,res)=>{
    try {

        const singleAdmin = await Admin.findById(req.body.id);
        
        if(req.file){
            try {
                const deletePath = path.join(__dirname,'..',singleAdmin.admin_image)
                await fs.unlinkSync(deletePath);
            } catch (err) {
                console.log("Image not found");
            }

            const newImagePath = Admin.imgPath+'/'+req.file.filename;
            req.body.admin_image = newImagePath;
            
        }else{
            req.body.admin_image = singleAdmin.admin_image;
        }
        
        req.body.name = req.body.fname+' '+req.body.lname;
        const editedAdminRecord = await Admin.findByIdAndUpdate(req.body.id,req.body);

        if(editedAdminRecord){
            console.log("Admin Record Update success fully..");
            const newAdminData = await Admin.findById(editedAdminRecord.id);
            const oldAdminData = req.cookies.adminData;
            if(oldAdminData._id===newAdminData.id){
                res.cookie('adminData',newAdminData);
                return res.redirect('/myProfile');
            }
            return res.redirect('/viewAdmin')
        }else{
            console.log("Faild to update Admin record..");
            return res.redirect('back');
        }
        
        
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

// Login System -----------------

module.exports.signIn = async(req,res)=>{
    try {
        if(req.cookies.adminData){
            return res.redirect('/deshBoard')
        }else{
            return res.render('admin/signIn')
        }
        
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

module.exports.checkSignIn = async(req,res)=>{
    try {
        const isAsminExistCount = await Admin.find({email:req.body.email}).countDocuments();

        if(isAsminExistCount === 1){

            const isAsminExist = await Admin.findOne({email:req.body.email})

            if(isAsminExist.password===req.body.password){
                res.cookie('adminData',isAsminExist);
                return res.redirect('/deshBoard')
            }else{
                console.log("Invalid password");
                return res.redirect('back')
            }
        }else{
            console.log("Invalid Email");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

// logout ---------------

module.exports.logOut = async(req,res)=>{
    try {
        res.clearCookie('adminData');
        return res.redirect('/');
        
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}


// show profile --------
module.exports.myProfile = async (req,res)=>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData){
            return res.render('admin/myProfile',{adminData});
        }else{
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}


// change password 
module.exports.changePassword = async(req,res)=>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData){
            return res.render('admin/changePassword',{adminData});
        }else{
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}

module.exports.changeNewPassword = async (req,res)=>{
    try {
        const adminData = req.cookies.adminData;
        if(adminData.password === req.body.currentPassword){
            if(req.body.currentPassword != req.body.newPassword){
                if(req.body.newPassword===req.body.confirmPassword){
                    await Admin.findByIdAndUpdate(adminData._id,{password:req.body.newPassword});
                    return res.redirect('/logOut');
                }else{
                    console.log("New Password and Confirm password are different..");
                    return res.redirect("back");
                }
            }else{
                console.log("Current Password and New password are same please try another password");
                return res.redirect("back");
            }
        }else{
            console.log("password not match With Old password");
            return res.redirect("back");
        }

    } catch (err) {
        console.log("Something wrong",err);
        return res.redirect('back');
    }
}