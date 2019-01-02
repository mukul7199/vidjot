const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('./../helpers/auth');

// Load idea model
require('./../models/Idea');
const Idea = mongoose.model('ideas');

// Idea index page
router.get('/', ensureAuthenticated, (req, res)=> {
    Idea.find({user: req.user.id})
        .sort({date: 'desc'})
        .then((ideas) => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

// Add idea route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

// Edit idea form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id,
        user: req.user.id
    })
    .then((idea) => {
        res.render('ideas/edit', {
            idea: idea
        });
    })
    
});

// Process form
router.post('/', ensureAuthenticated, (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details,
        user: req.user.id
    }
    new Idea(newUser)
        .save()
        .then((idea) => {
            req.flash('success_msg', 'Video idea added');
            res.redirect('/ideas');
        })
});

// Edit form process
router.put('/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        // new values
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save()
            .then(idea => {
                req.flash('success_msg', 'Video idea updated');
                res.redirect('/ideas');
            })
    })
});

// Delete idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.deleteOne({
        _id: req.params.id
    })
    .then(() => {
        req.flash('success_msg', 'Video idea removed');
        res.redirect('/ideas');
    })
});


module.exports = router;