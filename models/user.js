const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    firstName: { type: String, required: true, max: 100, index: true },
    lastName: { type: String, required: true, max: 100 },
    login: { type: String, required: true, max: 100, index: true },
    password: { type: String, required: true, max: 100 },
    isOnline: { type: Boolean},
    email: { type: String, required: true, max: 100, index: true }
});

UserSchema.index({ firstName: 1, lastName: 1 });

UserSchema.statics.encryptPassword = function (text) {
    return encrypt(text);
};

UserSchema
    .virtual('fullName')
    .get(function () {
        return this.lastName + ', ' + this.firstName;
    });

const algorithm = 'aes-256-ctr';
const password = 'P@ss123@123';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

UserSchema.pre('save', function (next) {
    var pwd = this.password;
    console.log("hashing password: " + pwd);
    this.password = encrypt(pwd);
    next();
});

module.exports = mongoose.model('User', UserSchema);