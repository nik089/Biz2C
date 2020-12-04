let mongoose = require('mongoose');
let regSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    pn: {
        type:Number,
        required:true
    },
    pass: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//model
module.exports = mongoose.model('register', regSchema);
//end