const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(new LocalStrategy({ username: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: "That email was not registered" });
                }

                bcryptjs.compare(password, User.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "password incorrect" });
                    }
                });
            })
            .catch(err => console.log(err));
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id); // Using Promises (Mongoose v7+)
            // Alternatively: const user = await findUserById(id); (using an async function)
            if (!user) {
                return done(null, false); // User not found
            }
            done(null, user);
        } catch (err) {
            console.error('Error deserializing user:', err);
            done(err); // Pass error to Passport
        }
    });

};
