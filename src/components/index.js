import '../pages/index.css';
import {enableValidation} from './validate';
import {openPopup, closePopup, popupEditName, popupEditDescription, popupPlaceName, popupPlaceImage, profileName, profileDescription, popupEdit, popupImage, popupPlace} from './utils';

const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
const popupEditClose = document.querySelector('.popup__button-close_type_edit');
const popupPlaceClose = document.querySelector('.popup__button-close_type_place');
const popupImageClose = document.querySelector('.popup__button-close_type_image');

profileEditButton.addEventListener('click', () => {
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDescription.textContent;

    openPopup(popupEdit);
});

profileAddButton.addEventListener('click', () => {
    popupPlaceName.value = '';
    popupPlaceImage.value = '';

    openPopup(popupPlace);
});

popupEditClose.addEventListener('click', () => closePopup(popupEdit));

popupPlaceClose.addEventListener('click', () => closePopup(popupPlace));

popupImageClose.addEventListener('click', () => closePopup(popupImage));

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    errorClass: 'popup__field_invalid'
});