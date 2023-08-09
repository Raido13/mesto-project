import {storage} from './index';
import {openPopup, popupImage, popupImageTitle, popupImagePhoto, popupDelete} from './modals';
import {changeLike, deleteUserCart} from './api';
import {checkResponse} from './utils';

export const deleteCart = (cart, cartElement, submited) => {
    if(!submited) {
        storage.deleteElem = [cart, cartElement];
        openPopup(popupDelete);
    }
    if(submited) {
        return deleteUserCart(storage.deleteElem[0]);
    }
};

export const toggleLikeState = (cart, cartLikeButton, cartLikeCounter) => {
    const condition = cart.likes.find(like => like._id == storage.userID);
    (condition ? cartLikeButton.classList.add('carts__button-like_active') : cartLikeButton.classList.remove('carts__button-like_active'));
    cartLikeCounter.textContent = cart.likes.length;
}

const toggleLike = (cart, cartLikeButton, cartLikeCounter) => {
    const condition = cartLikeButton.classList.contains('carts__button-like_active');
    changeLike(cart, condition)
    .then(checkResponse)
    .then(cart => {toggleLikeState(cart, cartLikeButton, cartLikeCounter)})
    .catch(error => console.log(error))
}

const viewPhoto = image => {
    popupImageTitle.textContent = image.name;
    popupImagePhoto.src = image.link;
    popupImagePhoto.alt = image.name;

    openPopup(popupImage);
}

export function createCart(cart) {
    const cartTemplate = document.querySelector('#cart-template').content;
    const cartElement = cartTemplate.querySelector('.carts__item').cloneNode(true);
    const cartTrashButton = cartElement.querySelector('.carts__button-trash');
    const cartLikeCounter = cartElement.querySelector('.carts__like-counter');
    const cartLikeButton = cartElement.querySelector('.carts__button-like');
    const cartTitle = cartElement.querySelector('.carts__title');
    const cartImage = cartElement.querySelector('.carts__image');
    
    if(cart.owner._id != storage.userID) cartTrashButton.classList.add('carts__button-trash_hide');

    cartTitle.textContent = cart.name;
    cartImage.src = cart.link;
    cartImage.alt = cart.name;

    toggleLikeState(cart, cartLikeButton, cartLikeCounter);
    
    cartLikeButton.addEventListener('click', () => toggleLike(cart, cartLikeButton, cartLikeCounter));
    cartTrashButton.addEventListener('click', () => deleteCart(cart, cartElement, false));
    cartImage.addEventListener('click', () => viewPhoto(cart));
    
    return cartElement;
}