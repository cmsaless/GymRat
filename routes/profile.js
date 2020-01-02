const express = require('express');
const Validators = require("../middleware/validators");
const User = require('../models/User');

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', (req, res) => {
    res.render('profile');
});

router.get('/settings', (req, res) => {
    res.render('profileSettings')
});

router.post('/changeEmail', (req, res) => {

    let isValid = Validators.validateEmail(req.body.email);

    if (isValid) {
        User.findOneAndUpdate({ _id: req.user._id },
            {
                email: req.body.email
            },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.flash("successMessage", "Your email was changed to: " + doc.email);
                res.redirect("/profile/settings");
            });
    } else {
        req.flash("errorMessage", "The new email you entered is not valid");
        res.redirect("/profile/settings");
    }

});

router.post('/changeUsername', (req, res) => {

    let isValid = 3 < req.body.username.length;

    if (isValid) {
        User.findOneAndUpdate({ _id: req.user._id },
            {
                username: req.body.username
            },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.flash("successMessage", "Your username was changed to: " + doc.username);
                res.redirect("/profile/settings");
            });
    } else {
        req.flash("errorMessage", "The new username you entered is not valid");
        res.redirect("/profile/settings");
    }
});

router.post('/changePassword', (req, res) => {

    // 1. check if password matches password-confirm
    // 2. check is new password is valid
    // 3. bcrypt it
    // 4. pass into DB

    let isValid = 3 < req.body.username.length;

    if (isValid) {
        User.findOneAndUpdate({ _id: req.user._id },
            {
                username: req.body.username
            },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.flash("successMessage", "Your username was changed to: " + doc.username);
                res.redirect("/profile/settings");
            });
    } else {
        req.flash("errorMessage", "The new username you entered is not valid");
        res.redirect("/profile/settings");
    }
});

router.post('/deleteUser', (req, res) => {

    // Delete everything to do with this user's workout data.


    res.redirect(302, '/');
});

router.post('/deleteData', (req, res) => {

    // Delete everything to do with this user.


    res.redirect(302, '/');
});

module.exports = router;