const express = require('express');
var router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home Page' });
});

router.get('/auth/google', passport.authenticate(
    'google',
    {
        // Requesting the user's profile and email
        scope: ['profile', 'email'],
    }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
));

router.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/');
    });
});