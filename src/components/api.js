import {createCart, toggleLikeState} from './carts';
import {profileAvatar, renderCart} from './index';
import {profileName, profileDescription, popupEditName, popupEditDescription, popupPlaceName, popupPlaceImage, popupAvatarLink} from './modals';
import {loadingOnBtn} from './validate';

export const userID = '1c53c88278356800dfa38a5e';

export const api = {
    url: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '7b8fe31e-898f-4c7d-9582-d2cac788919d',
        'Content-Type': 'application/json'
    }
}

export const getCarts = () => {
    return fetch(api.url + '/cards', {headers: api.headers})
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
    .then(carts => {carts.reverse().forEach(elem => {const cart = createCart(elem); renderCart(cart)})})
    .catch(error => {console.log(error)})
}

export const getUserInfo = () => {
    return fetch(api.url + '/users/me', {headers: api.headers})
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        else{
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
    .then(user => {
        profileAvatar.style.cssText += `background-image: url('${user.avatar}');`;
        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
    })
    .catch(error => console.log(error));
}

export const editUser = targetBtnText => {
    return fetch(api.url + '/users/me', {
        method: 'PATCH',
        headers: api.headers,
        body: JSON.stringify({name: popupEditName.value, about: popupEditDescription.value})
    })
    .then(res => {
        if(res.ok) {
            loadingOnBtn(targetBtnText, true);
            return res.json()
        }
        else {
            loadingOnBtn(targetBtnText, true);
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then(data => {
        loadingOnBtn(targetBtnText, false);
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
    })
    .catch(error => {
        loadingOnBtn(targetBtnText, false);
        console.log(error);
    });
}

export const addNewCart = targetBtnText => {
    return fetch(api.url + '/cards', {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({name: popupPlaceName.value, link: popupPlaceImage.value})
    })
    .then(res => {
        if(res.ok) {
            loadingOnBtn(targetBtnText, true);
            return res.json();
        }
        else {
            loadingOnBtn(targetBtnText, true);
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then(data => {
        loadingOnBtn(targetBtnText, false);
        const newCart = createCart(data);
        renderCart(newCart);
    })
    .catch(error => {
        loadingOnBtn(targetBtnText, false);
        console.log(error);
    });
}

export const deleteUserCart = cartDeleteElem => {
    return fetch(api.url + `/cards/${cartDeleteElem[0]._id}`, {method: 'DELETE', headers: api.headers})
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
    .then(() => {
        cartDeleteElem[1].remove();
    })
    .catch(error => {
        console.log(error);
    })
}

export const changeAvatar = targetBtnText => {
    return fetch(api.url + '/users/me/avatar', {
        method: 'PATCH',
        headers: api.headers,
        body: JSON.stringify({avatar: popupAvatarLink.value})
    })
    .then(res => {
        if(res.ok) {
            loadingOnBtn(targetBtnText, true);
            return res.json()
        }
        else {
            loadingOnBtn(targetBtnText, true);
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
    .then(data => {
        loadingOnBtn(targetBtnText, false);
        profileAvatar.style.cssText += `background-image: url('${data.avatar}');`;
        popupAvatarLink.value = ''
    })
    .catch(error => {
        loadingOnBtn(targetBtnText, false);
        console.log(error)
    })
}

export const changeLike = (cart, cartLikeButton, cartLikeCounter, condition) => {
    return fetch(api.url + `/cards/likes/${cart._id}`, {method: condition ? 'DELETE' : 'PUT', headers: api.headers})
    .then(res => {if(res.ok) {return res.json()} return Promise.reject(`Ошибка: ${res.status}`)})
    .then(cart => {toggleLikeState(cart, cartLikeButton, cartLikeCounter)})
    .catch(error => console.log(error));
}