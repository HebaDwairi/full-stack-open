const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        required: true,
        type: String,
        minLength: 3,
        unique: true,
    },
    passwordHash: String
});

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
        delete returnedObj.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);