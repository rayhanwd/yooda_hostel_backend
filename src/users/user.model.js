const mongoose = require('mongoose');
const { Schema } = mongoose;
//name email photo password isAdmin
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true
    },
    admin: {
        type: String,
        required:true
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

module.exports = mongoose.model('User', userSchema)