export const profileEditButton = document.querySelector('.profile__button-edit');
export const profileAddButton = document.querySelector('.profile__button-add');
export const profileEditAvatar = document.querySelector('.profile__avatar');

export const cartsContainerSelector = '.carts';

export const cartTemplateSelector = '#cart-template';

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupPlace = document.querySelector('.popup_type_place');
export const popupImage = document.querySelector('.popup_type_image');
export const popupDelete = document.querySelector('.popup_type_delete');

export const storage = {
    userID: '',
    cartToDelete: {},
    formValidators: {}
};

export const apiOptions = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '7b8fe31e-898f-4c7d-9582-d2cac788919d',
        'Content-Type': 'application/json'
    }
}

export const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    errorClass: 'popup__field_invalid'
}

export const userDataSelectors = {
    userNameSelector: '.profile__name',
    userDescriptionSelector: '.profile__description',
    userAvatarSelector: '.profile__avatar'
}