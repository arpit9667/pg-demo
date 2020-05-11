const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err));
});

// Add a Gig
router.get('/add', (req, res) => {
    res.render('add');
})

router.post('/add', async (req, res) => {

    let { title, technologies, budget, description, contact_email } = req.body;

    let errors = [];

    if (!title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!technologies) {
        errors.push({ text: 'Please add some technologies' });
    }
    if (!description) {
        errors.push({ text: 'Please add a Description' });
    }
    if (!contact_email) {
        errors.push({ text: 'Please add a Contact' });
    }

    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    } else {
        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }
        technologies = technologies.toLowerCase().replace(/, /g, ',');
        try {
            const gig = await Gig.create({
                title,
                technologies,
                budget,
                description,
                contact_email
            })
            res.redirect('/gigs');
        }
        catch (err) {
            console.log(err);
        }
    }
});

router.get('/search', (req, res) => {
    const { term } = req.query;

    Gig.findAll({
        where: {
            technologies: {
                [Op.like]: '%' + term + '%'
            }
        }
    })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));
});

module.exports = router;