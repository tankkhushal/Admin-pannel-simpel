const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Adminrecords");

const DashboardDb =mongoose.connection;

DashboardDb.once("open",(err)=>{
        if(err){
            console.log("Data base not connected");
            return false;
        }
        console.log("Data base is Connected");
    })

module.exports = DashboardDb;