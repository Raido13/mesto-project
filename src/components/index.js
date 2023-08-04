import '../pages/index.css';
import {initialCarts} from './dataCarts';
import {enableValidation, resetInputValidity, toggleButtonState} from './validate';
import {openPopup, closePopup, popupEditName, popupEditDescription, popupPlaceName, popupPlaceImage, profileName, profileDescription, popupEdit, popupImage, popupPlace} from './modals';
import {createCart} from './carts';

const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
const popupEditClose = document.querySelector('.popup__button-close_type_edit');
const popupPlaceClose = document.querySelector('.popup__button-close_type_place');
const popupImageClose = document.querySelector('.popup__button-close_type_image');

const carts = document.querySelector('.carts');

profileEditButton.addEventListener('click', () => {
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDescription.textContent;

    resetInputValidity(popupEdit);
    toggleButtonState(Array.from(popupEdit.querySelectorAll('.popup__field')), popupEdit.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});

    openPopup(popupEdit);
});

profileAddButton.addEventListener('click', () => {
    popupPlaceName.value = '';
    popupPlaceImage.value = '';

    resetInputValidity(popupPlace);
    toggleButtonState(Array.from(popupPlace.querySelectorAll('.popup__field')), popupPlace.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});

    openPopup(popupPlace);
});

popupEditClose.addEventListener('click', () => closePopup(popupEdit));

popupPlaceClose.addEventListener('click', () => closePopup(popupPlace));

popupImageClose.addEventListener('click', () => closePopup(popupImage));

export const renderCart = cart => carts.prepend(cart);

initialCarts.reverse().forEach(item => {
    const cart = createCart(item);
    renderCart(cart);
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    errorClass: 'popup__field_invalid'
});