const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    const googleToken = req.cookies['connect.sid'];
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                next();
            } else {
                req.user = await UserModel.findOne({email: decodedToken.email}).exec();
                next();
            }
        });
    } else if (googleToken){
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = {requireAuth};
