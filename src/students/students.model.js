const mongoose = require('mongoose');
const { Schema } = mongoose;
//Student(id, fullName, roll, age, class, hall, status)
const studentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    roll: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    hall: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

module.exports = mongoose.model('Student', studentSchema)