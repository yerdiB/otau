const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        lowercase: true,
        //validate: [isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        //minLength: [6, 'Minimum password length is 6 character']
    },
    googleId: {
        type: String,
    }
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const userModel = new mongoose.model("User", userSchema);


passport.use(userModel.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id)
});
passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err,user)
    })
});


passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    }, async (payload, done) =>{
        try {
            const user = await userModel.findById(payload.userId).select('email id');
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
        catch (e){
            console.log(e);
        }
    })
)


module.exports =  userModel;