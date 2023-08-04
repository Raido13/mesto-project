import {openPopup, popupImage, popupImageTitle, popupImagePhoto} from './modals';

const deleteCart = cart => cart.remove();

const addLike = like => like.classList.toggle('carts__button-like_active');

const viewPhoto = image => {
    popupImageTitle.textContent = image.name;
    popupImagePhoto.src = image.imgLink;
    popupImagePhoto.alt = image.name;

    openPopup(popupImage);
}

export function createCart(item) {
    const cartTemplate = document.querySelector('#cart-template').content;
    const cartElement = cartTemplate.querySelector('.carts__item').cloneNode(true);
    const cartTrashButton = cartElement.querySelector('.carts__button-trash');
    const cartLikeButton = cartElement.querySelector('.carts__button-like');
    const cartTitle = cartElement.querySelector('.carts__title');
    const cartImage = cartElement.querySelector('.carts__image');
    
    cartTitle.textContent = item.name;
    cartImage.src = item.imgLink;
    cartImage.alt = item.name;

    cartLikeButton.addEventListener('click', () => addLike(cartLikeButton));
    cartTrashButton.addEventListener('click', () => deleteCart(cartElement));
    cartImage.addEventListener('click', () => viewPhoto(item));
    
    return cartElement;
}