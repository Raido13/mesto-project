import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    #popup;
    #submitter;
    #form;
    #inputList;
    #inputValues;
    #submitButton;
    #submitButtonText;

    #getInputValues() {
        this.#inputValues = {};
        this.#inputList.forEach(input => this.#inputValues[input.name] = input.value);

        return this.#inputValues;
    }

    constructor({popup, submitter}) {
        super(popup);
        
        this.#popup = popup;
        this.#submitter = submitter;
        this.#form = this.#popup.querySelector('.popup__form');
        this.#inputList = this.#form.querySelectorAll('.popup__field');
        this.#submitButton = this.#form.querySelector('.popup__button-save');
        this.#submitButtonText = this.#form.textContent;
    }

    close() {   
        super.close();
        this.#form.reset();
    }

    setInputValues(data) {
        this.#inputList.forEach(input => input.value = data[input.name])
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        isLoading
            ? this.#submitButton.textContent = loadingText
            : this.#submitButton.textContent = this.#submitButtonText;
    }

    setEventListeners() {
        this.#form.addEventListener('submit', e => {
            e.preventDefault();
            const data = this.#getInputValues();
            this.#submitter(data);
        })
        super.setEventListeners();
    }
}