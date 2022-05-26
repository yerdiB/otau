const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const errorHandler = require('../util/errorHandler');


module.exports.getLogin = function(req, res) {
    res.render('pages/login.ejs');
};

module.exports.getRegister = function (req, res) {
    res.render('pages/register.ejs');
}

module.exports.postLoginJwt = async function(req, res, next){
    const candidate = await UserModel.findOne({email:  req.body.email});
    if (candidate){
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult){
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, process.env.SECRET, {expiresIn: maxAge * 1000});
            res.cookie('jwt', token, {httpOnly: true});
            res.setHeader('Authorization', 'Bearer '+ token);
            req.session.isLoggedIn = true;
            res.redirect('/');
        }
        else{
            res.render('message.ejs',{
                status: 404,
                message: "Password/Email is wrong. Try again or register"
            })
        }
    }
    else {
        res.render('message.ejs',{
            status: 404,
            message: "UserModel not found. Try again"
        })
    }
}


module.exports.postRegisterJwt = async function(req, res){
    const candidate = await UserModel.findOne({email: req.body.email});
    if (candidate){
        res.send('message.ejs',{
            status: 409,
            message: `This email already registered, please login`
        })
    }
    else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        console.log(user);
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.SECRET, {expiresIn: maxAge * 1000});
        try {
            await user.save();
            res.redirect('/auth/login');
        } catch (err){
            errorHandler(res, err);
        }
    }
}

module.exports.postLogout = function(req, res, next) {
    //console.log(req.cookies);
    res.cookie('jwt', '', {maxAge: 1});
    res.cookie('connect.sid', '', {maxAge: 1});
    req.session.isLoggedIn = false;
    req.logout();
    res.redirect('/');
};