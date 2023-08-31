import './index.css';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Cart from '../components/Cart.js'
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
    profileEditButton,
    profileAddButton,
    profileEditAvatar,
    cartsContainerSelector,
    cartTemplateSelector,
    popupEdit,
    popupAvatar,
    popupPlace,
    popupImage,
    popupDelete,
    storage,
    apiOptions,
    formSelectors,
    userDataSelectors
} from '../utils/constants';

const api = new Api(apiOptions);

const enableValidation = ({formSelector, ...options}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        const formValidator = new FormValidator(options, formElement);
        const formName = formElement.getAttribute('name');
        storage.formValidators[formName] = formValidator;
        formValidator.enableValidation();
    })
}

enableValidation(formSelectors);

function handleSubmit(request, popupElement) {
    popupElement.renderLoading(true);
    request()
        .then(() => {
            console.log(popupElement);
            popupElement.close();
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupElement.renderLoading(false);
        })
}

function createCart(item) {
    const cart = new Cart({
        item,
        onLikePress: (id, condition) => {
            api.updateLike(id, condition)
                .then(updatedCart => {
                    cart.updateLikes(updatedCart);
                })
        },
        handleCartClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        deletePopupOpen: () => {
            popupDeleteCart.open();
        },
        cartTemplateSelector
    });

    return cart.generate();
}

const popupEditUserdata = new PopupWithForm({
    popup: popupEdit,
    submitter: data => {
        function makeRequest() {
            return api.editUser(data)
                .then(data => {
                    userInfo.setUserInfo(data);
                });
        }

        handleSubmit(makeRequest, popupEditUserdata)
    }
});
popupEditUserdata.setEventListeners();

const popupUpdateAvatar = new PopupWithForm({
    popup: popupAvatar,
    submitter: data => {
        function makeRequest() {
            return api.updateAvatar(data)
                .then(data => {
                    userInfo.setUserInfo(data);
                })
        }

        handleSubmit(makeRequest, popupUpdateAvatar)
    }
})
popupUpdateAvatar.setEventListeners();

const popupAddCart = new PopupWithForm({
    popup: popupPlace,
    submitter: data => {
        function makeRequest() {
            return api.addNewCart(data)
                .then(item => {
                    const cartElement = createCart(item);
                    initialCartList.addCartToDom(cartElement, 'prepend');
                });
        }

        handleSubmit(makeRequest, popupAddCart);
    }
});
popupAddCart.setEventListeners();

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const popupDeleteCart = new PopupWithForm({
    popup: popupDelete,
    submitter: () => {
        api.deleteUserCart(storage.cartToDelete.id)
            .then(() => {
                storage.cartToDelete.element.remove();
                popupDeleteCart.close();
            })
    }
});
popupDeleteCart.setEventListeners();

const initialCartList = new Section({
    renderer: cart => {
        const cartElement = createCart(cart);
        initialCartList.addCartToDom(cartElement, 'append');
    }
}, cartsContainerSelector);

const userInfo = new UserInfo(userDataSelectors);

profileEditButton.addEventListener('click', () => {
    popupEditUserdata.setInputValues(userInfo.getUserInfo());
    storage.formValidators['userEdit'].reloadValidation();
    popupEditUserdata.open();
});

profileEditAvatar.addEventListener('click', () => {
    storage.formValidators['avatarUpdate'].reloadValidation();
    popupUpdateAvatar.open();
});

profileAddButton.addEventListener('click', () => {
    storage.formValidators['cartAdd'].reloadValidation();
    popupAddCart.open();
});

Promise.all([
    api.getUserInfo(),
    api.getCarts()
  ])
    .then(([userData, initialCarts]) => {
        userInfo.setUserInfo(userData);
        storage.userID = userData._id;
        initialCartList.renderCarts(initialCarts);
    })
    .catch(err => {
        console.log(err);
    })