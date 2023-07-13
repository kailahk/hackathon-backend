const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    title: {type: String, required: true},
    userid: {type: String},
    relationship: {type: String, required: true},
    circumstances: {type: Array},
    age: {type: Number},
    date: {type: Date},
    notes: {type: String},
    aiContent: {type: Object}
}, {
    timestamps: true,
})

module.exports = mongoose.model('file', fileSchema);