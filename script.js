const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__button-edit');
const profileAddButton = document.querySelector('.profile__button-add');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditClose = document.querySelector('.popup__button-close_type_edit');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupEditName = document.querySelector('.popup__field_user_name');
const popupEditDescription = document.querySelector('.popup__field_user_description');

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceClose = document.querySelector('.popup__button-close_type_place');
const popupPlaceForm = document.querySelector('.popup__form_place_form');
const popupPlaceName = document.querySelector('.popup__field_place_name');
const popupPlaceImage = document.querySelector('.popup__field_place_image');

const carts = document.querySelector('.carts');

const initialCarts = [
    {
        name: 'Карачаевск',
        imgLink: 'images/carts__church@2x.jpg'
    },
    {
        name: 'Гора Эльбрус',
        imgLink: 'images/carts__hill@2x.jpg'
    },
    {
        name: 'Домбай',
        imgLink: 'images/carts__mountain@2x.jpg'
    },
    {
        name: 'Гора Эльбрус',
        imgLink: 'images/carts__hill@2x.jpg'
    },
    {
        name: 'Домбай',
        imgLink: 'images/carts__mountain@2x.jpg'
    },
    {
        name: 'Карачаево-Черкессия',
        imgLink: 'images/carts__church@2x.jpg'
    },
]

const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = document.querySelector('.popup__button-close_type_image');
const popupImagePhoto = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title_image');

popupEditName.value = profileName.textContent;
popupEditDescription.value = profileDescription.textContent;

function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
    if (popup == popupPlace){
        popupPlaceName.value = '';
        popupPlaceImage.value = '';
    }
}

profileEditButton.addEventListener('click', evt=> openPopup(popupEdit));
profileAddButton.addEventListener('click', evt=> openPopup(popupPlace));
popupEditClose.addEventListener('click', evt=> closePopup(popupEdit));
popupPlaceClose.addEventListener('click', evt=> closePopup(popupPlace));
popupImageClose.addEventListener('click', evt=> closePopup(popupImage));

function submitUserEditForm(evt){
    evt.preventDefault();

    profileName.textContent = popupEditName.value;
    profileDescription.textContent = popupEditDescription.value;

    closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', submitUserEditForm);

function deleteCart(cart){
    cart.remove();
}

function addLike(like){
    like.classList.toggle('carts__button-like_active');
}

function viewPhoto(image){
    popupImageTitle.textContent = image.name;
    popupImagePhoto.src = image.imgLink;
    popupImagePhoto.alt = image.name;

    openPopup(popupImage);
}

function renderCart(cart, placement){
    carts[placement](createCart(cart));
}

function createCart(item){
    const cartTemplate = document.querySelector('#cart-template').content;
    const cartElement = cartTemplate.querySelector('.carts__item').cloneNode(true);
    const cartTrashButton = cartElement.querySelector('.carts__button-trash');
    const cartLikeButton = cartElement.querySelector('.carts__button-like');
    const cartTitle = cartElement.querySelector('.carts__title');
    const cartImage = cartElement.querySelector('.carts__image');
    
    cartTitle.textContent = item.name;
    cartImage.src = item.imgLink;
    cartImage.alt = item.name;

    cartLikeButton.addEventListener('click', evt=> addLike(cartLikeButton));
    cartTrashButton.addEventListener('click', evt=> deleteCart(cartElement));
    cartImage.addEventListener('click', evt=> viewPhoto(item));
    
    return cartElement;
}

initialCarts.forEach(it => renderCart(it, 'append'));

function submitPopupPlaceForm(evt){
    evt.preventDefault();
    
    renderCart({name: popupPlaceName.value, imgLink: popupPlaceImage.value}, 'prepend');
    closePopup(popupPlace);
}

popupPlaceForm.addEventListener('submit', submitPopupPlaceForm);