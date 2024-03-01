const mongoose = require('mongoose');

// Define user schema
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    profilpictures: [{
        type: String,
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
});

// Create User model
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
