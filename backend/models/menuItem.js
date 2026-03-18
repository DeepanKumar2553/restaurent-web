const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Starters", "Mains", "Seafood", "Desserts", "Drinks"]
    },
    image: {
        type: String,
        required: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('menuItem', menuItemSchema);