export default class Popup {
    #popup;
    #closeButton;
    
    #handleEscEvent = e => {
        if(e.key === 'Escape') this.close();
    }

    constructor(popup) {
        this.#popup = popup;
        this.#closeButton = this.#popup.querySelector('.popup__button-close');
    }

    open() {
        document.addEventListener('keydown', this.#handleEscEvent);
        this.#popup.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this.#handleEscEvent);
        this.#popup.classList.remove('popup_opened');
    }

    setEventListeners() {
        document.addEventListener('mousedown', e => {if(e.target.classList.contains('popup')) this.close()});
        this.#closeButton.addEventListener('click', () => this.close())
    }
}