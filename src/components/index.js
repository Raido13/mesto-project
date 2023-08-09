import '../pages/index.css';
import {enableValidation, resetInputValidity, toggleButtonState} from './validate';
import {openPopup, closePopup, popupEditName, popupEditDescription, popupPlaceName, popupPlaceImage, profileName, profileDescription, popupEdit, popupImage, popupPlace, popupAvatar, popupDelete} from './modals';
import {getUserInfo, getCarts} from './api';


const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
export const profileAvatar = document.querySelector('.profile__avatar');
const popupEditClose = document.querySelector('.popup__button-close_type_edit');
const popupPlaceClose = document.querySelector('.popup__button-close_type_place');
const popupImageClose = document.querySelector('.popup__button-close_type_image');
const popupAvatarClose = document.querySelector('.popup__button-close_type_avatar');
const popupDeleteClose = document.querySelector('.popup__button-close_type_delete');

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

profileAvatar.addEventListener('click', () => {
    resetInputValidity(popupAvatar);
    toggleButtonState(Array.from(popupAvatar.querySelectorAll('.popup__field')), popupAvatar.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});

    openPopup(popupAvatar);
})

popupEditClose.addEventListener('click', () => closePopup(popupEdit));

popupPlaceClose.addEventListener('click', () => closePopup(popupPlace));

popupImageClose.addEventListener('click', () => closePopup(popupImage));

popupAvatarClose.addEventListener('click', () => closePopup(popupAvatar));

popupDeleteClose.addEventListener('click', () => closePopup(popupDelete));

export const renderCart = cart => carts.prepend(cart);

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    errorClass: 'popup__field_invalid'
});

export const storage = {
    deleteElem: []
};

getUserInfo();
getCarts();