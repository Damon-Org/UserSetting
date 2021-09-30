import UserModule from './structures/UserModule.js'
import UserModel from './structures/models/UserModel.js'

export default class UserSetting extends UserModule {
    _data = null;

    /**
     * @param {Main} main
     * @param {User} user
     */
    constructor(main, user) {
        super(main, user);

        this.register(UserSetting, {
            name: 'userSetting',
            scope: {
                group: 'user',
                name: 'settings'
            }
        });
    }

    get data() {
        if (!this._data) return {};
        return this._data;
    }

/**
 * User Scope Methods
 */
    /**
     * @returns {Promise<void>} Returns when Mongo fetched data from the server
     */
    awaitData() {
        return new Promise((resolve, reject) => {
            if (this._data) return resolve();

            this._call = (...args) => resolve(...args);
        });
    }

    /**
     * @private
     */
    async getAll() {
        const data = await UserModel.getAll(this.user.id);

        this._data = data;

        if (typeof this._call === 'function') this._call(data);
        this._call = null;
    }

    initScope() {
        if (this.modules.mongodb.ready) this.getAll();
        else this.modules.mongodb.on('ready', () => this.getAll());
    }

    /**
     * @param {Object} update
     * @returns {Promise<void>}
     */
    async update(update) {
        this._data = await UserModel.updateUser(this.user.id, update);
    }
}
