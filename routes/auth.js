const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


//get requests

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

//post requests

router.post("/register", (req, res) => {
    const { firstname, lastname, email, location, password, password2 } = req.body;
    let errors = [];

    if (!firstname || !lastname || !email || !location || !password || !password2) {
        errors.push({ msg: "please enter all fileds" });
    }

    if (password !== password2) {
        errors.push({ msg: "password do not match" });
    }

    if (password.length < 6) {
        errors.push({ msg: "passwrod must be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstname,
            lastname,
            email,
            password,
            password2
        });


    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: "user already exists" });
                res.render('register', {
                    errors, firstname, lastname, email, password, password2
                });

            }
        });
    }

});

module.exports = router;