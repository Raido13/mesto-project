import {closePopup} from './modals';
import {editUser, addNewCart, changeAvatar} from './api';
import {deleteCart} from './carts';

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

export const loadingOnBtn = (targetBtnText, state) => {
    const defaultBtnText = targetBtnText;
    const stateBtnText = 'Сохранение...';
    (state ? targetBtnText = stateBtnText : targetBtnText = defaultBtnText);
}

function submitForm(e) {
    e.preventDefault();
    const targetBtnText = e.target.querySelector('.popup__button-save').textContent;

    if(e.target.classList.contains('popup__form_type_edit')){
        editUser(targetBtnText);
    }
    if(e.target.classList.contains('popup__form_type_place')){
        addNewCart(targetBtnText);
    }
    if(e.target.classList.contains('popup__form_type_delete')){
        deleteCart(false, false, true);
    }
    if(e.target.classList.contains('popup__form_type_avatar')){
        changeAvatar(targetBtnText);
    }
    closePopup(document.querySelector('.popup_opened'));
}
