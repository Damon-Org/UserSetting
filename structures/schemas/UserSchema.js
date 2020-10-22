import mongoose from 'mongoose'

const users = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    level: { type: Number, default: -1 },
    immunity: { type: Number, default: 0 },
    ban_case: {
        banned: Boolean,
        reason: String
    }
});

export default mongoose.model('users', users);
