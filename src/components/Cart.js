import {storage} from '../utils/constants.js';

export default class Cart {
    #name;
    #link;
    #id;
    #owner;
    #likes;
    #cartTemplateSelector;
    #cartElement;
    #cartTrashButton;
    #cartLikeCounter;
    #cartLikeButton;
    #cartTitle;
    #cartImage;
    #onLikePress;
    #handleCartClick;
    #deletePopupOpen;

    #toggleLikeState() {
        const condition = this.#likes.some(like => like._id == storage.userID);
        condition
            ? this.#cartLikeButton.classList.add('carts__button-like_active')
            : this.#cartLikeButton.classList.remove('carts__button-like_active');
        this.#checkCounter();
    }

    #getTemplate() {
        return document.querySelector(this.#cartTemplateSelector).content.querySelector('.carts__item').cloneNode(true);
    }

    #checkCounter() {
        this.#cartLikeCounter.textContent = this.#likes.length;
    }

    #setEventListeners() {
        this.#cartLikeButton.addEventListener('click', () => {
            const condition = this.#cartLikeButton.classList.contains('carts__button-like_active');
            this.#onLikePress(this.#id, condition);
        });

        this.#cartImage.addEventListener('click', () => {
            this.#handleCartClick(this.#name, this.#link);
        });

        this.#cartTrashButton.addEventListener('click', () => {
            storage.cartToDelete = {id: this.#id, element: this.#cartElement};
            this.#deletePopupOpen();
        })
    }

    constructor({item, onLikePress, handleCartClick, deletePopupOpen, cartTemplateSelector}) {
        this.#name = item.name;
        this.#link = item.link;
        this.#id = item._id;
        this.#owner = item.owner;
        this.#likes = item.likes;
        this.#onLikePress = onLikePress;
        this.#handleCartClick = handleCartClick;
        this.#deletePopupOpen = deletePopupOpen;
        this.#cartTemplateSelector = cartTemplateSelector;
    }

    generate() {
        this.#cartElement = this.#getTemplate();
        this.#cartTrashButton = this.#cartElement.querySelector('.carts__button-trash');
        this.#cartLikeCounter = this.#cartElement.querySelector('.carts__like-counter');
        this.#cartLikeButton = this.#cartElement.querySelector('.carts__button-like');
        this.#cartTitle = this.#cartElement.querySelector('.carts__title');
        this.#cartImage = this.#cartElement.querySelector('.carts__image');
        const condition = this.#owner._id != storage.userID;
        
        if(condition) this.#cartTrashButton.classList.add('carts__button-trash_hide');

        this.#cartTitle.textContent = this.#name;
        this.#cartImage.src = this.#link;
        this.#cartImage.alt = this.#name;

        this.#setEventListeners();
        this.#toggleLikeState();

        return this.#cartElement;
    }

    updateLikes(updatedCart) {
        this.#likes = updatedCart.likes;
        this.#toggleLikeState();
    }
}