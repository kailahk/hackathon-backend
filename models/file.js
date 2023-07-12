const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    title: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    relationship: {type: String, required: true},
    circumstances: {type: Array},
    age: {type: Number},
    dates: {type: Array},
    notes: {type: String},
    aiContent: {type: Object}
}, {
    timestamps: true,
})

module.exports = mongoose.model('file', fileSchema);