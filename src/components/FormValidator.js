export default class FormValidator {
    #formElement;
    #inputList;
    #buttonElement;
    #inactiveButtonClass;
    #errorClass;

    #showInputError(input, errorMessage) {
        const errorElement = this.#formElement.querySelector(`.${input.id}-error`);
        errorElement.textContent = errorMessage;
        input.classList.add(this.#errorClass);
    }

    #hideInputError(input) {
        const errorElement = this.#formElement.querySelector(`.${input.id}-error`);
        errorElement.textContent = '';
        input.classList.remove(this.#errorClass);
    }

    #checkInputValidity(input) {
        input.validity.patternMismatch
            ? input.setCustomValidity(input.dataset.errorMessage)
            : input.setCustomValidity('');
        !input.validity.valid
            ? this.#showInputError(input, input.validationMessage)
            : this.#hideInputError(input);
    }

    #hasInvalidInput() {
        return this.#inputList.some(input => {
            return !input.validity.valid;
        })
    }

    #toggleButtonState() {
        (this.#hasInvalidInput())
            ? (this.#buttonElement.disabled = true, this.#buttonElement.classList.add(this.#inactiveButtonClass))
            : (this.#buttonElement.disabled = false, this.#buttonElement.classList.remove(this.#inactiveButtonClass));
    }

    #setEventListeners() {
        this.#toggleButtonState();
        this.#inputList.forEach(input => {
            input.addEventListener('input', () => {
                this.#checkInputValidity(input);
                this.#toggleButtonState();
            });
        });
    }

    constructor(formSelectors, formElement) {
        this.#formElement = formElement;
        this.#inputList = Array.from(this.#formElement.querySelectorAll(formSelectors.inputSelector));
        this.#buttonElement = this.#formElement.querySelector(formSelectors.submitButtonSelector);
        this.#inactiveButtonClass = formSelectors.inactiveButtonClass;
        this.#errorClass = formSelectors.errorClass;
    }

    enableValidation() {
        this.#formElement.addEventListener('submit', e => {
            e.preventDefault();
        })
        this.#setEventListeners();
    }

    reloadValidation() {
        this.#inputList.forEach(input => {
            input.setCustomValidity('');
            this.#hideInputError(input);
        });
        this.#toggleButtonState();
    }
}