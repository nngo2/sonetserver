const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    fromUserId: {  type: String, required: true},
    toUserId: {  type: String, required: true},
    message: {  type: String, required: true},
    time: { type: Date, required: true }
});
MessageSchema.index({fromUserId: 1, toUserId: 1});

module.exports = mongoose.model('Message', MessageSchema);