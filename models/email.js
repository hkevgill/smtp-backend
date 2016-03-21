// packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmailSchema = new Schema({
    key: { type: "string", unique: true },
    sender: String,
    receiver: String,
    date: Date,
    subject: String,
    body: String
});

module.exports = mongoose.model('Email', EmailSchema);