export default class UserInfo {
    #name;
    #about;
    #avatar;

    constructor(userDataSelectors) {
        this.#name = document.querySelector(userDataSelectors.userNameSelector);
        this.#about = document.querySelector(userDataSelectors.userDescriptionSelector);
        this.#avatar = document.querySelector(userDataSelectors.userAvatarSelector);
    }

    getUserInfo() {
        return {name: this.#name.textContent, about: this.#about.textContent};
    }

    setUserInfo({name, about, avatar}) {
        this.#name.textContent = name;
        this.#about.textContent = about;
        this.#avatar.style.background = `center / cover no-repeat url('${avatar}')`;
    }
}