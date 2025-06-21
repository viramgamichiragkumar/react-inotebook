const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "iNotebook-auth";
let success = false;
// POST "/api/auth/create" without Auth
router.post('/create', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('password', 'Enter Valid Password').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail().custom(async value => {
        const user = await User.findUserByEmail(value);
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false,errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create new user
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, JWT_SECRET);
        // res.json(user);
        res.json({success:true, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

// POST "/api/auth/login" without Auth
router.post('/login', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Enter Valid Password').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false, error: "Please enter valid credentials" });
        }

        let passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({success:false, error: "Please enter valid credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, JWT_SECRET);
        res.json({ success:true, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

// POST "/api/auth/getuser" without Auth
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        return res.status(200).json({success:true,user:user});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,msg:"Server Error"});
    }
});

module.exports = router;
