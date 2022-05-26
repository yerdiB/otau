const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/User');

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opt, async (payload, done) =>{
            try {
                const user = await UserModel.findById(payload.userId).select('email id');
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
}
