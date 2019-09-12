const mongoose = require('mongoose');
const config = require('../config/database');

//Student Schema
const StudentSchema = mongoose.Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const Student = module.exports = mongoose.model('Student' , StudentSchema);

module.exports.getAllStudents = function(callback) {
    Student.find(callback);
}

module.exports.addStudent = function(newStudent , callback) {
    newStudent.save(callback);
}