const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// GET "/api/notes/getall" require Auth
router.get('/getall',fetchuser, async (req,res)=>{
    try{
        const userId = req.user.id;
        const notes = await Note.find({user:userId});
        return res.status(200).json({success:true,notes:notes});

    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

// POST "/api/notes/add" require Auth
router.post('/add',fetchuser,[
    body('title','Enter title minimum 5 charactor').isLength({min:3}),
    body('description','Enter description minimum 5 charactor').isLength({min:5}),
], async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors: errors.array()});
    }
    
    const {title,description,tag} = req.body;
    try{
        let note = new Note({
            title,description,tag,user:req.user.id
        });
        note = await note.save();

        res.json({success:true,note:note});

    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

// PUT "/api/notes/update/:id" require Auth
router.put('/update/:id',fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;
    const newData = {};
    try{
        if(title){newData.title = title};
        if(description){newData.description = description};
        if(tag){newData.tag = tag};

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({success:false,msg:"Not Found"});
        }else if(note.user.toString() !== req.user.id){
            return res.status(401).json({success:false,msg:"Unauthorized"});
        }
        
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newData},{new:true});
        
        res.json({success:true,note:note});

    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

// DELETE "/api/notes/update/:id" require Auth
router.delete('/delete/:id',fetchuser, async (req,res)=>{
    try{
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({success:false,msg:"Not Found"});
        }else if(note.user.toString() !== req.user.id){
            return res.status(401).json({success:false,msg:"Unauthorized"});
        }
        
        note = await Note.findByIdAndDelete(req.params.id);
        
        res.json({"Success":"Note has been deleted.", note:note});

    }catch(error){
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

module.exports = router;
