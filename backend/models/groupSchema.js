
// Define group schema
const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
});

// Create Group model
module.exports = mongoose.models.Group || mongoose.model('Group', groupSchema);

