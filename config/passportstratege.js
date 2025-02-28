// const { model } = require('mongoose')
const passport = require('passport')

const Localstratege = require('passport-local').Strategy

const adminmodel = require('../models/Adminmodel')


passport.use('local',new Localstratege({
    usernameField: 'email'
}, async function (email, password, done) {
    console.log('midd');
    console.log(email,password);
    let admindata = await adminmodel.findOne({ email: email });
    if (admindata) {
        if (admindata.password == password) {
            return done(null, admindata);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false);
    }
}))


passport.serializeUser(function(user,done){
    return done(null,user.id)
})
passport.deserializeUser(async function(id,done){
    let adminrecode = await adminmodel.findById(id)
    if(adminrecode){
        return done(null,adminrecode)
    }
    else{
        return done(null,false)
    }
})
passport.SetAuthUser = function(req,res,next){
    console.log(req.isAuthenticated());
    
    if (req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

passport.checkAuthUser = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/');
    }
}

module.exports = passport ;

