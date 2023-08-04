import {closePopup, profileName, profileDescription, popupPlace, popupEdit, popupEditName, popupEditDescription, popupPlaceName, popupPlaceImage} from './utils';
import {createCart, renderCart} from './carts';

export const resetInputValidity = popup => {
    Array.from(popup.querySelectorAll('.popup__field')).forEach(input => {
        input.classList.remove('popup__field_invalid');
        input.setCustomValidity('');
    });
    Array.from(popup.querySelectorAll('.popup__field-error')).forEach(error => error.textContent = '');
}

const showInputError = (formElement, inputElement, errorMessage, {errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}
  
const hideInputError = (formElement, inputElement, {errorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    (inputElement.validity.patternMismatch ? inputElement.setCustomValidity(inputElement.dataset.errorMessage) : inputElement.setCustomValidity(''));
    (!inputElement.validity.valid ? showInputError(formElement, inputElement, inputElement.validationMessage, settings) : hideInputError(formElement, inputElement, settings));
}

const hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

export const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    (hasInvalidInput(inputList) ? (buttonElement.disabled = !0, buttonElement.classList.add(inactiveButtonClass)) : (buttonElement.disabled = !1, buttonElement.classList.remove(inactiveButtonClass)))
}

function setFormEventListeners(formElement, {inputSelector, submitButtonSelector, formTypeEditChecker, formTypePlaceChecker, ...settings}) {
    formElement.addEventListener('submit', e => submitForm(e));

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    
    inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
    }))
}

export const enableValidation = ({formSelector, ...settings}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        setFormEventListeners(formElement, settings);
    })
}

function submitForm(e) {
    e.preventDefault();
    if(e.target.classList.contains('popup__form_type_edit')){
        profileName.textContent = popupEditName.value;
        profileDescription.textContent = popupEditDescription.value;
        closePopup(popupEdit);
    }
    if(e.target.classList.contains('popup__form_type_place')){
        const cart = createCart({name: popupPlaceName.value, imgLink: popupPlaceImage.value});
        renderCart(cart);
        closePopup(popupPlace);
    }
}
