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

const popupUserForm = document.querySelector('.popup__form');

function popupUserFormSubmit(evt){
    evt.preventDefault();
    userName.textContent = userEditName.value;
    userDescription.textContent = userEditDescription.value;
    popupToggle();
}

popupUserForm.addEventListener('submit', popupUserFormSubmit);

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

function addCart (item){
    const cartTemplate = document.querySelector('#cart-template').content;
    const cartElement = cartTemplate.querySelector('.carts__item').cloneNode(true);
    const cartTrashButton = cartElement.querySelector('.carts__button-trash');
    const cartLikeButton = cartElement.querySelector('.carts__button-like');
    const cartTitle = cartElement.querySelector('.carts__title');
    const cartImage = cartElement.querySelector('.carts__image');
    
    cartTitle.textContent = item.name;
    cartImage.setAttribute('src', item.imgLink);
    cartImage.setAttribute('alt', item.name);

    cartLikeButton.addEventListener('click', evt=>{
        cartLikeButton.classList.toggle('carts__button-like_active');
    });

    cartTrashButton.addEventListener('click', evt=>{
        cartTrashButton.parentElement.remove();
    });

    cartImage.addEventListener('click', evt=>{
        const photoView = document.querySelector('.photo-view');        
        const photoViewClose = document.querySelector('.photo-view__button-close');
        const photoViewImage = document.querySelector('.photo-view__image');
        const photoViewTitle = document.querySelector('.photo-view__title');
        
        photoView.classList.add('photo-view_opened');
        photoViewTitle.textContent = item.name;
        photoViewImage.setAttribute('src', item.imgLink);
        photoViewImage.setAttribute('alt', item.name);

        photoViewClose.addEventListener('click', evt=>{
            photoView.classList.remove('photo-view_opened');
        });
    });
    
    carts.append(cartElement);
}

initialCarts.forEach(item=>{
    addCart (item);
});

const profileAddButton = document.querySelector('.profile__button-add');
const popupCreater = document.querySelector('.popup-creater');
const popupCreaterClose = document.querySelector('.popup-creater__button-close');

function popupCreaterToggle (){
    popupCreater.classList.toggle('popup-creater_opened');
}

profileAddButton.addEventListener('click', popupCreaterToggle);
popupCreaterClose.addEventListener('click', popupCreaterToggle);

const popupPlaceForm = document.querySelector('.popup-creater__form');
const popupPlaceName = document.querySelector('.popup-creater__field_place_name');
const popupPlaceImage = document.querySelector('.popup-creater__field_place_image');

function popupPlaceFormSubmit(evt){
    evt.preventDefault();
    const newObj = {};

    newObj.name = popupPlaceName.value;
    newObj.imgLink = popupPlaceImage.value;
    initialCarts.unshift(newObj)

    addCart (initialCarts[0]);
    popupCreaterToggle();

    popupPlaceName.value = '';
    popupPlaceImage.value = '';
}

popupPlaceForm.addEventListener('submit', popupPlaceFormSubmit);