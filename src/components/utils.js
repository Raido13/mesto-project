import {eventHandler} from './modals';
import {resetInputValidity, toggleButtonState} from './validate';

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupEditName = document.querySelector('.popup__field_user_name');
export const popupEditDescription = document.querySelector('.popup__field_user_description');

export const popupPlace = document.querySelector('.popup_type_place');
export const popupPlaceName = document.querySelector('.popup__field_place_name');
export const popupPlaceImage = document.querySelector('.popup__field_place_image');

export const popupImage = document.querySelector('.popup_type_image');
export const popupImagePhoto = document.querySelector('.popup__image');
export const popupImageTitle = document.querySelector('.popup__title_image');

export const openPopup = popup => {
    if(popup != popupImage) {
        resetInputValidity(popup);
        toggleButtonState(Array.from(popup.querySelectorAll('.popup__field')), popup.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});
    }
    document.addEventListener('keydown', e => eventHandler(e, popup));
    popup.addEventListener('mousedown', e => eventHandler(e, popup));
    popup.classList.add('popup_opened');
}

export const closePopup = popup => {
    document.removeEventListener('keydown', eventHandler);
    popup.removeEventListener('mousedown', eventHandler);
    popup.classList.remove('popup_opened');
}