const express = require("express");

const routes = express.Router();

const Dashboard = require("../models/Adminmodel");

const Adminctl = require("../controllers/Adminctl");

const passport = require('../config/passportstratege');

routes.get("/",Adminctl.Login);

routes.post("/loginAdmin",passport.authenticate('local',{failureRedirect:'/'}),Adminctl.loginAdmin);

routes.get("/logOut",Adminctl.logOut);

routes.get("/Dashboard",passport.checkAuthUser,Adminctl.Dashboard);

routes.get("/form",passport.checkAuthUser,Adminctl.Form);

routes.get("/viewData",passport.checkAuthUser,Adminctl.ViewData);

routes.post("/insertForm",Dashboard.uploadaImageFile,Adminctl.insertForm);

routes.get("/deleteAdmin/:id",Adminctl.deleteAdmin);

routes.get("/updateAdmin",Adminctl.updateAdmin);

routes.post("/Editdata",Dashboard.uploadaImageFile,Adminctl.Editdata);

//Change Password

routes.get("/ChangePassword",Adminctl.ChangePassword);

routes.post("/ChangePass",Adminctl.ChangePass);


//ForgetPassword

routes.get("/ConfirmPassword",Adminctl.ForgetPassword);

routes.post("/verifyEmail",Adminctl.verifyEmail);

// OTP
routes.get("/CheckOTP",Adminctl.CheckOTP);

routes.post("/VerifyOTP",Adminctl.VerifyOTP);

routes.get("/NewPassword",Adminctl.NewPassword);

routes.post("/ConfirmPassword",Adminctl.ConfirmPassword);


module.exports = routes;