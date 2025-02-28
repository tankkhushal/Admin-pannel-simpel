const mongoose = require("mongoose");

const imagepath="/uploads";

const path = require("path");

const multer = require("multer");

const DashboardSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby:{
        type : Array,
        required : true
    }, 
    feedback:{
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
},
{timeStamp : true}
)

const storageImage=multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , path.join(__dirname , ".." , imagepath))
    },
    filename : (req , file , cb) => {
        cb(null , file.filename+'-'+Date.now())
    }
})

DashboardSchema.statics.uploadaImageFile=multer({storage:storageImage}).single('image');

    DashboardSchema.statics.imgDashbord = imagepath;
  
const Dashboard = mongoose.model("Dashboard",DashboardSchema);
module.exports = Dashboard;