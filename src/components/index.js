import '../pages/index.css';
import {enableValidation, resetInputValidity, toggleButtonState} from './validate';
import {openPopup, closePopup, popupCloseBtns, popupEditName, popupEditDescription, profileName, profileDescription, popupEdit, popupPlace, popupAvatar} from './modals';
import {getUserInfo, getCarts} from './api';
import {checkResponse} from './utils';
import {createCart} from './carts';

const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');
export const profileAvatar = document.querySelector('.profile__avatar');

const carts = document.querySelector('.carts');

popupCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => closePopup(btn.closest('.popup')));
})

profileEditButton.addEventListener('click', () => {
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDescription.textContent;

    resetInputValidity(popupEdit);
    toggleButtonState(Array.from(popupEdit.querySelectorAll('.popup__field')), popupEdit.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});

    openPopup(popupEdit);
});

profileAddButton.addEventListener('click', () => {
    popupPlace.querySelector('.popup__form').reset();

    resetInputValidity(popupPlace);
    toggleButtonState(Array.from(popupPlace.querySelectorAll('.popup__field')), popupPlace.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});

    openPopup(popupPlace);
});

profileAvatar.addEventListener('click', () => {
    resetInputValidity(popupAvatar);
    toggleButtonState(Array.from(popupAvatar.querySelectorAll('.popup__field')), popupAvatar.querySelector('.popup__button-save'), {inactiveButtonClass: 'popup__button-save_disabled'});

    openPopup(popupAvatar);
})

export const renderCart = cart => carts.prepend(cart);

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    errorClass: 'popup__field_invalid'
});

export const storage = {
    userID: '',
    deleteElem: []
};

Promise.all([getUserInfo(), getCarts()])
.then(res => {
    return Promise.all(res.map(checkResponse))
})
.then(([user, carts]) => {
    profileAvatar.style.cssText += `background-image: url('${user.avatar}');`;
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    storage.userID = user._id;
    carts.reverse().forEach(elem => {const cart = createCart(elem); renderCart(cart)})
})
.catch(error => console.log(error));