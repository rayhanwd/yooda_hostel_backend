const mongoose = require('mongoose');
const { Schema } = mongoose;
// FoodItem(id, name, price)

const foodSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
    })

module.exports = mongoose.model('Food', foodSchema);