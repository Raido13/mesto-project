import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    #popupImage;
    #popupTitle;
    #popup;

    constructor(popup) {
        super(popup);

        this.#popup = popup;
        this.#popupImage = this.#popup.querySelector('.popup__image');
        this.#popupTitle = this.#popup.querySelector('.popup__title_image');
    }

    open(name, link) {
        this.#popupImage.src = link;
        this.#popupImage.alt = name;
        this.#popupTitle.textContent = name;
        
        super.open();
    }
}