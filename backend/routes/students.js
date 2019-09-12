const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Student = require('../models/student');

//Register
router.post('/register' , (req , res , next) => {
    let newStudent = new Student({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    });

    Student.addStudent(newStudent , (err , student) => {
        if(err) {
            res.json({success: false , msg: "Failed to register student"});
        } else {
            res.json({success: true , msg: "New student is registered"});
        }
    });
});

//Get all students on the index page
router.get('/get-all-students' , (req , res , next) => {
    Student.getAllStudents((err , data) => {
        if(err) throw err;
        return res.json({students: data});
    });
});

module.exports = router;