const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    username: { type: String, required: true, max: 100, index: true },
    time: { type: Date, required: true },
    content: { type: String, required: true, max: 500 },
    image: { type: String, max: 100 },
    users: [String],
    comments: [{
        username: { type: String, required: true, max: 100, index: true },
        time: { type: Date, required: true },
        content: { type: String, required: true, max: 500 },
    }]
});

PostSchema
    .virtual('postTime')
    .get(function () {
        return moment(this.time).utc().format('YYYY-MM-DD HH:mm');
    });

module.exports = mongoose.model('Post', PostSchema);