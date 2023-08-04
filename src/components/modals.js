const popupsArr = Array.from(document.querySelectorAll('.popup'));

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

const eventHandler = e => {
    const popup = popupsArr.find(popup => {return popup.classList.contains('popup_opened')})
    if(e.key === 'Escape') closePopup(popup);
    if(e.type === 'mousedown' && (!e.target.closest('.popup__container') && !e.target.closest('.popup__container_image'))) closePopup(popup);
}

export const openPopup = popup => {
    document.addEventListener('keydown', eventHandler);
    popup.addEventListener('mousedown', eventHandler);
    popup.classList.add('popup_opened');
}

export const closePopup = popup => {
    document.removeEventListener('keydown', eventHandler);
    popup.removeEventListener('mousedown', eventHandler);
    popup.classList.remove('popup_opened');
}