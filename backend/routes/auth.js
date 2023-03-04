const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'AKASHNISHAD_IS_A_GOOD_CODER';

router.post('/createuser', 
    [
        body('name', 'Enter a valid name').isLength({min: 3}),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({min: 5})
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const existingUser = await User.findOne({email : req.body.email});
            if(existingUser){
                return res.status(400).json({errors: 'User with this email already exists'});
            }

            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            });

            const data = {
                user: {
                    id: user.id
                }
            };

            const token = jwt.sign(data, JWT_SECRET_KEY);
            res.json(token);
        } catch(error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

router.post('/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password can not be blank').exists()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email: email});

            if(!user){
                return res.status(400).json({errors: 'Please enter correct email and password'});
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if(!isCorrectPassword){
                return res.status(400).json({errors: 'Please enter correct email and password'});
            }

            const data = {
                user: {
                    id: user.id
                }
            };

            const token = jwt.sign(data, JWT_SECRET_KEY);
            res.json(token);
        }catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = router;
