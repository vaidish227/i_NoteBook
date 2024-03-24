const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

// Route 1: Get All notes  using:  GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
    res.json(notes)
    } catch (error) {
        console.log(error.message);
    res.status(500).send('internal server error')
    }
    
})

// Route 2: add a new notes  using:  post "/api/notes/addnote". login required
router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description', 'Description must be atleast 5 character').isLength({min:5})
], async (req,res)=>{
    try {
        
    
    const {title,description,tag} = req.body;
    let success = false;
    // If there is any error , return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const saveNote = await note.save()
    res.send(saveNote);
}catch (error) {
    console.log(error.message);
    res.status(500).send('internal server error')
}
})

// Route 3: Update an existing  notes  using:  Put "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;
    //create a new note object
 const newNote = {};
 if(title){newNote.title=title};
 if(description){newNote.description=description};
 if(tag){newNote.tag=tag};

//find the note to be update and update it
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")}

//allowed update if only user own this note
if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
}

note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
res.json({note})
})

// Route 4: delete  notes  using:  delete "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    try {
        //find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //allowed delete if only user own this note
if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed")
}
note = await Note.findByIdAndDelete(req.params.id)
res.json({"success":"note has been deleted",note:note})
    } catch (error) {
        console.log(error.message);
    res.status(500).send('internal server error')
    }
})
module.exports = router;