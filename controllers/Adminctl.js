const Dashboard = require("../models/Adminmodel");

const path = require("path");

const nodemailer = require("nodemailer");

const fs = require("fs");

// Dashbord
module.exports.Dashboard = async (req,res)=>{
    try{
        return res.render("Dashboard")
    }
    catch(err){
        console.log("Dashboard Error");
        return res.redirect('back');
    }
}
//Form
module.exports.Form = async (req,res)=>{
    try{
       
            return res.render("Form")
       
      
    }
    catch(err){
        console.log("Form Error");
        return res.redirect('back');
    }
}
//View Data
module.exports.ViewData = async (req,res)=>{
    try{
       
            let data = await Dashboard.find();

            return await res.render("ViewData",{
            data,
           
            });
      
        // let data = await Dashboard.find();
        // return await res.render("ViewData",{
        //     data,
        //     AdminKey : req.cookies.loginData
        //     });
    }
    catch(err){
        console.log("View Data Error");
        return res.redirect('back');
    }
}

//Insert Form
module.exports.insertForm = async (req,res) => {
    // console.log(req.body);
    // console.log(req.file);

    try{
        let imgpath = '';
        if(req.body){
            imgpath = Dashboard.imgDashbord+"/"+req.file.filename;
            // console.log(imgpath);
    }
        req.body.image = imgpath;

        req.body.name = req.body.fname+" "+req.body.lname;
        // console.log(req.body.name);

        await Dashboard.create(req.body);
        return res.redirect("/viewData");

    }
    catch(err){
        console.log("Insert Form Error");
        return res.redirect('back');
    }
    
}


module.exports.deleteAdmin = async(req,res) =>{
try{


    var id = req.params.id;
    let getAdmin = await Dashboard.findById(id);

    if(getAdmin){
        try{
            const deleteImagePath =path.join(__dirname,'..',getAdmin.image);
            await fs.unlinkSync(deleteImagePath);
        }
        catch(err){
            console.log('image not found');
            return res.redirect('back');
        }
    }
    await Dashboard.findByIdAndDelete(id);
    return res.redirect("/viewdata");
}
catch(err){
    console.log("Delete Admin Error");
    return res.redirect('back');
}
}

module.exports.updateAdmin = async(req,res) =>{
    var id = (req.query.Aid);
    let singleAdmin = await Dashboard.findById(id);
    console.log(singleAdmin);
    return res.render('update',{
        singleAdmin,
      
    })
}

module.exports.Editdata = async(req,res) =>{
    // console.log(req.file);
    // console.log(req.body);
    let singleAdmin = await Dashboard.findById(req.body.Aid);
    // console.log(singleAdmin);

    if(req.file){
        try{
            let imageoldAdmin = path.join(__dirname,"..",singleAdmin.image);
            // console.log(imageoldAdmin);
            await fs.unlinkSync(imageoldAdmin);
        } 
        catch (err){
            console.log("Image NOt Found");
        }
        var newImageAdmin = Dashboard.imgDashbord+"/"+req.file.filename;
        req.body.image = newImageAdmin;

        await Dashboard.findByIdAndUpdate(req.body.Aid,req.body)
        return res.redirect("/viewdata");
    }
    else{
        req.body.image = singleAdmin.image;  

        await Dashboard.findByIdAndUpdate(req.body.Aid,req.body);
        return res.redirect("/viewdata");
    }
}

module.exports.Login = async (req,res) =>{
    try{
        if(req.cookies.loginData){
            return res.redirect("/Dashboard");
        }
        else{
            return res.render('login');
        }
        
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.loginAdmin = async (req,res) =>{
    try{
        return res.redirect("/Dashboard");
    }
    catch(err){
        console.log("Err in Admin");
        res.redirect("back");
    }
}

module.exports.logOut = async (req,res) =>{
    try{
       req.session.destroy((err)=>{
            if(err){
                return false;
            }
           return res.redirect("/") 
       })
    }
    catch(err){
        console.log("Log Out");
        return res.redirect("back");
    }
}
//Change Passowrd
module.exports.ChangePassword = async (req,res) =>{
    try{
        
            return await res.render("ChangePassword")
       
       
    }
    catch(err){
        console.log("Err in Change Password");
        return res.redirect("back");
    }
}
//changepassword
module.exports.ChangePass = async (req,res) =>{
    try{
        // let oldData = req.cookie.loginData
        let oldData = await Dashboard.findById(req.cookies.loginData._id);
        
        console.log(oldData);
        console.log(req.body);
        if(oldData.password == req.body.op){
            if(req.body.op != req.body.np){
                if(req.body.np == req.body.cp){
                    let editpassword = await Dashboard.findByIdAndUpdate(oldData._id,{password : req.body.np});
                    return res.redirect("/logOut");
                    
                }
                else{
                    console.log("New And ConfirmPassword is Not match");
                    return res.redirect("back");
                }

            }
            else{
                console.log("Old and New are Password Same !! Try another");
                return res.redirect("back");
            }
        }
        else{
            console.log("Old Password is incorrect");
            return res.redirect("back");
        }

    }
    catch(err){
        console.log("Error in chengPassword");
        return res.redirect("back");
    }
}


//Forget Password
module.exports.ForgetPassword = async (req,res) =>{
    try{
        return await res.render("ForgetPassword");
    }
    catch(err){
        console.log("Forget Password");
        return res.redirect("back");
    }
}
module.exports.verifyEmail = async (req,res) =>{
    try{
        // console.log(req.body);
        let SingleEmail = await Dashboard.find({email:req.body.email}).countDocuments();
        // console.log(SingleEmail);

        if(SingleEmail == 1){
            let EmailData = await Dashboard.findOne({email:req.body.email});
            let OTP = Math.floor(Math.random()*10000)

             const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for port 465, false for other ports
                    auth: {
                        user: "desaidarshan616@gmail.com",
                        pass: "ubmyhcsscpasdupm",
                    },
                    tls: {
                            rejectUnauthorized: false
                        }
                });

            const info = await transporter.sendMail({
                    from: 'desaidarshan616@gmail.com', // sender address
                    to: EmailData.email, // list of receivers
                    subject: "Verify OTP", // Subject line
                    text: "Your OPT?", // plain text body
                    html: `${OTP}`, // html body
                  });
                  
                res.cookie("email",EmailData.email);
                res.cookie("OTP",OTP);
                return res.redirect("/CheckOTP");    

        }
        else{
            console.log("Email Not Vaild");
            return res.redirect("/CheckOTP");
        }
        
    }
    catch(err){
        console.log("Verify Email Err");
        return res.redirect("back");
    }
}

//Check OTP
module.exports.CheckOTP = async (req,res) =>{
    try{
        return await res.render("CheckOTP");
    }
    catch(err){
        console.log("Check OTP error");
        return res.redirect("back");
    }
}
// VerifyOtp
module.exports.VerifyOTP = async (req,res) =>{
    try{
        console.log(req.cookies.OTP);
        console.log(req.body.email);
        if(req.body.OTP == req.cookies.OTP){
            res.clearCookie("OTP");
            return res.redirect("NewPassword");
        }
        else{
            console.log("Invaid OTP");
            return res.redirect("back");
        }
    }
    catch(err){
        console.log("VerifyOTP Err");
        return res.redirect("back");
    }
}

//New Password
module.exports.NewPassword = async(req,res) =>{
    try{
        return res.render("NewPassword");
    }   
    catch(err){
        console.log("New Password Err");
        return res.redirect("back");
    }
}
//ConfirmPassword 
module.exports.ConfirmPassword = async (req,res) =>{
    try{
        if(req.body.NewPassword = req.body.ConfirmPassword){
            let checkLastTime = await Dashboard.find({email:req.cookies.email}).countDocuments();
            if(checkLastTime == 1){
                let DashboardDataNew = await Dashboard.findOne({email:req.cookies.email});
                let updatePassword = await Dashboard.findByIdAndUpdate(DashboardDataNew.id,{password : req.body.NewPassword});
                if(updatePassword){
                    return res.redirect('/');
                }
                else{
                    console.log("Something Worng Last Password");
                }
            }
            else{
                console.log("Email Not Found");
                return res.redirect("back");
            }
        }
        else{
            console.log("New Password and Confirm Password Not Match");
            return res.redirect("back");
        }
    }
    catch(err){
        console.log("ConfirmPassword Err");
        return res.redirect("back");
    }
}