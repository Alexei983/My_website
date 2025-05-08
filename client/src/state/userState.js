import { makeAutoObservable } from "mobx";

class User {
    _IsAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    isAuth(bool) {
        this._IsAuth = bool
    }
}

export default new User()