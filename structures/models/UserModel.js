import User from '../schemas/UserSchema.js'

/**
 * @param {string} guildId
 */
export const createIfNotExists = async (userId) => {
    const doc = await User.findOne({ userId }).exec();
    if (!doc) {
        const create = new User({
            userId
        }).save();

        return create;
    }
    return doc;
}

/**
 * Alias for createIfNotExists
 */
export const getAll = createIfNotExists;

export const updateUser = (userId, update) => {
    return User.findOneAndUpdate({ userId }, update, { new: true }).exec();
}

export default {
    createIfNotExists,
    getAll,
    updateUser
}
