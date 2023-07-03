const profileEditButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__button-close');

function popupToggle (){
    popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);

const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const userEditName = document.querySelector('.popup__field_user_name');
const userEditDescription = document.querySelector('.popup__field_user_description');

userName.textContent = 'Жак-Ив Кусто';
userDescription.textContent = 'Исследователь океана';
userEditName.value = 'Жак-Ив Кусто';
userEditDescription.value = 'Исследователь океана';

const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = userEditName.value;
    userDescription.textContent = userEditDescription.value;
    popupToggle();
}

formElement.addEventListener('submit', handleFormSubmit);

const carts = document.querySelector('.carts');
const initialCards = [
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

function addCart (){
    const cartTemplate = document.querySelector('#cart-template').content;
    const cartElement = cartTemplate.querySelector('.carts__item').cloneNode(true);
    const cartLikeButton = cartElement.querySelector('.carts__button-like');
    const cartTitle = cartElement.querySelector('.carts__title');
    const cartImage = cartElement.querySelector('.carts__image');
    
    if (!addCart.counter){
        addCart.counter = 0;
    }
    cartTitle.textContent = initialCards[addCart.counter].name;
    cartImage.setAttribute('src', initialCards[addCart.counter].imgLink);

    cartLikeButton.addEventListener('click', evt=>{
        cartLikeButton.classList.toggle('carts__button-like_active');
    });

    carts.append(cartElement);
    addCart.counter += 1;
}

addCart();
addCart();
addCart();
addCart();
addCart();
addCart();