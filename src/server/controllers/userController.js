import passport from 'passport';
import User from '../models/User.js';

export const postJoin = async (req, res, next) => {
    const {
        body: { email, password }
    } = req;
    const newUser = new User({
        email,
        taskList: []
    })
    try {
        await User.register(newUser, password);
        console.log("User register completed");
        next();
    }
    catch (error) {
        console.log(error);
        res.send({ error: { ...error, type: "join" } });
    }
};
export const postLogin = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (!user) return res.send({ error: { name: "InvalidUserInfo", message: "Either id or password is wrong.", type: "login" } });
        req.login(user, function (err) {
            if (err) return res.send({ error: { name: "LoginError", message: "There is some issue with log in." }, type: "login" });
            req.session.save();
            next();
        });
    })(req, res);
};
export const getLogout = async (req, res) => {
    try {
        await req.logout();
        res.send({});
    }
    catch (error) {
        console.log(error);
        res.send({ error });
    }
};