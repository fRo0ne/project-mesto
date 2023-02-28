export default class UserInfo {
    constructor({profileAvatar, profileName, profileAbout}) {
        this._about = profileAbout;
        this._name = profileName;
        this._avatar = profileAvatar;
    }

    setUserInfo({avatar, name, about}) {
        this._avatar.style.backgroundImage = `url(${avatar}`;
        this._name.textContent = name;
        this._about.textContent = about;
    }

    getUserInfo() {
        return {name: this._name.textContent, about: this._about.textContent};
    }
}