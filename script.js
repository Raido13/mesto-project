const profileEditButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__button-close');

const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');
const userEditName = document.querySelector('.popup__field_user_name');
const userEditDescription = document.querySelector('.popup__field_user_description');

function openPopupUser (){
    popup.classList.add('popup_opened');
}
function closePopupUser (){
    userEditName.value = '';
    userEditDescription.value = '';
    popup.classList.remove('popup_opened');
}

userEditName.value = userName.textContent;
userEditDescription.value = userDescription.textContent;

profileEditButton.addEventListener('click', openPopupUser);
popupClose.addEventListener('click', closePopupUser);

const popupUserForm = document.querySelector('.popup__form');

function submitPopupUserForm(evt){
    evt.preventDefault();
    userName.textContent = userEditName.value;
    userDescription.textContent = userEditDescription.value;
    closePopupUser();
}

popupUserForm.addEventListener('submit', submitPopupUserForm);

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

function deleteCart (item){
    const indexToDelete = initialCarts.findIndex(it => it === item);
    initialCarts.splice(indexToDelete, 1);
    renderCartsByUserAction();
}

function renderCarts (item){
    const cartTemplate = document.querySelector('#cart-template').content;
    const cartElement = cartTemplate.querySelector('.carts__item').cloneNode(true);
    const cartTrashButton = cartElement.querySelector('.carts__button-trash');
    const cartLikeButton = cartElement.querySelector('.carts__button-like');
    const cartTitle = cartElement.querySelector('.carts__title');
    const cartImage = cartElement.querySelector('.carts__image');
    
    cartTitle.textContent = item.name;
    cartImage.setAttribute('src', item.imgLink);
    cartImage.setAttribute('alt', item.name);

    cartLikeButton.addEventListener('click', evt=> cartLikeButton.classList.toggle('carts__button-like_active'));

    cartTrashButton.addEventListener('click', evt=> {
        deleteCart(item);
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

initialCarts.forEach(renderCarts);

function renderCartsByUserAction (){
    document.querySelectorAll('.carts__item').forEach(it=> it.remove());
    initialCarts.forEach(renderCarts);
}

const profileAddButton = document.querySelector('.profile__button-add');
const popupCreater = document.querySelector('.popup-creater');
const popupCreaterClose = document.querySelector('.popup-creater__button-close');

function togglePopupCreater (){
    popupCreater.classList.toggle('popup-creater_opened');
}

profileAddButton.addEventListener('click', togglePopupCreater);
popupCreaterClose.addEventListener('click', togglePopupCreater);

const popupPlaceForm = document.querySelector('.popup-creater__form');
const popupPlaceName = document.querySelector('.popup-creater__field_place_name');
const popupPlaceImage = document.querySelector('.popup-creater__field_place_image');

function submitPopupPlaceForm(evt){
    evt.preventDefault();
    const newObj = {name: popupPlaceName.value, imgLink: popupPlaceImage.value};
    initialCarts.unshift(newObj);

    renderCartsByUserAction();
    togglePopupCreater();

    popupPlaceName.value = '';
    popupPlaceImage.value = '';
}

popupPlaceForm.addEventListener('submit', submitPopupPlaceForm);