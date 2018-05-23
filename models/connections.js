const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    friends: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});
ConnectionSchema.index({user: 1, friends: 1});

module.exports = mongoose.model('Connection', ConnectionSchema);