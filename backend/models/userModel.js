const mongoose = require('mongoose');

// Define user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
    favoriteTeam: {
        type: String,
        maxlength: 100 
    },
    favoritePlayer: {
        type: String,
        maxlength: 100
    },
    favoriteStadium: {
        type: String,
        maxlength: 100
    },
    // additionnal fields for football player
    position: {
        type: [String],
        validate: {
            validator: function(positions) {
                return positions.length <= 3;
            },
            message: 'You can choose maximum 3 positions.'
        },
        enum: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Striker', 'Winger', 'Full-back', 'Center-back', 'Sweeper', 'Attacking midfielder', 'Central midfielder', 'Defensive midfielder']
    },
    skills: [{
        type: String,
        enum: ['Dribbling', 'Shooting', 'Passing', 'Ball control', 'Speed', 'Agility', 'Heading', 'Tackling', 'Vision', 'Positioning']
    }],
});

// Create User model
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
