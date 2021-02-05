const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin.hbs');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


router.get('/users/signup', (req, res) => {
    res.render('users/signup.hbs');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: "Por favor ingrese su nombre" });
    }
    if (email.length <= 0) {
        errors.push({ text: "Por favor ingrese su email" });
    }
    if (password.length <= 0) {
        errors.push({ text: "Por favor ingrese su contraseña" });
    }
    if (confirm_password.length <= 0) {
        errors.push({ text: "Por favor confirme su contraseña" });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coindiden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe superar los 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email ingresado ya esta registrado en otra cuenta');
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Has sido registrado con exito');
        res.redirect('/users/signin');
    }
})

router.get('/users/logout', async (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;