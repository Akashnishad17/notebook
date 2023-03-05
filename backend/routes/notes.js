const express = require('express');
const router = express.Router();
const getUser = require('../middleware/getuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.get('/getnotes', getUser, 
    async(req, res) => {
        try{
            const notes = await Notes.find({user: req.user.id});
            res.json(notes);
        }catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

router.post('/addnote', getUser, 
    [
        body('title', 'Enter a valid title').isLength({min: 3}),
        body('description', 'Description must be at least 5 characters').isLength({min: 5})
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try{
            const note = await Notes.create({
                user: req.user.id,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag
            });
    
            res.json(note);
        }catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
        
    }
);

router.put('/updatenote/:id', getUser,
    [
        body('title', 'Enter a valid title').isLength({min: 3}),
        body('description', 'Description must be at least 5 characters').isLength({min: 5})
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try{
            const {title, description, tag} = req.body;
            let updatedNote = {};

            if(title) {updatedNote.title = title;}
            if(description) {updatedNote.description = description;}
            if(tag) {updatedNote.tag = tag;}

            const existingNote = await Notes.findById(req.params.id);

            if(!existingNote) {
                return res.status(400).json({errors: 'Not Found'});
            }

            if(existingNote.user.toString() !== req.user.id){
                return res.status(401).json({errors: 'Not Allowed'});
            }

            const note = await Notes.findByIdAndUpdate(req.params.id, {$set: updatedNote}, {new: true});
            res.json(note);
        }catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

router.delete('/deletenote/:id', getUser,
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try{
            const existingNote = await Notes.findById(req.params.id);

            if(!existingNote) {
                return res.status(400).json({errors: 'Not Found'});
            }

            if(existingNote.user.toString() !== req.user.id){
                return res.status(401).json({errors: 'Not Allowed'});
            }

            const note = await Notes.findByIdAndDelete(req.params.id);
            res.json({success: `Note with id: ${req.params.id} has been deleted`, note: note});
        }catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = router;