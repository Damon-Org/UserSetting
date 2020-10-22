export default class ServerModule {
    /**
     * @param {Main} main The program entrypoint class
     */
    constructor(main, user = -1) {
        this._m = main;

        this.user = user;
    }

    /**
     * @param {User} user
     */
    clone(user) {
        return new this._instance(this._m, user);
    }

    get auth() {
        return this._m.auth;
    }

    get config() {
        return this._m.config;
    }

    get globalStorage() {
        return this._m.globalStorage;
    }

    get log() {
        return this._m.log;
    }

    get modules() {
        return this._m.modules;
    }

    get servers() {
        return this._m.servers;
    }

    get users() {
        return this._m.userManager;
    }

    /**
     * @param {*} isntance
     * @param {Object} object
     * @param {boolean} [internal=true] If this is the raw register object
     */
    register(instance, object, internal = true) {
        if (typeof object !== 'object') throw new Error('Invalid self assignment, expected object but got different type instead.');

        Object.assign(this, object);

        if (internal) {
            this._instance = instance;

            this.rawData = object;
        }
        else if (this.rawData) {
            Object.assign(this.rawData, object);
        }
    }
}
