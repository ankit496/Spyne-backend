const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
         required: true
    },
    title: {
         type: String, 
         required: true 
    },
    description: String,
    tags: [String],
    images: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Car', carSchema);
