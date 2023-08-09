import {popupEditName, popupEditDescription, popupPlaceName, popupPlaceImage, popupAvatarLink} from './modals';

export const api = {
    url: 'https://nomoreparties.co/v1/plus-cohort-27',
    headers: {
        authorization: '7b8fe31e-898f-4c7d-9582-d2cac788919d',
        'Content-Type': 'application/json'
    }
}

export const getCarts = () => {
    return fetch(api.url + '/cards', {headers: api.headers})
}

export const getUserInfo = () => {
    return fetch(api.url + '/users/me', {headers: api.headers})
}

export const editUser = () => {
    return fetch(api.url + '/users/me', {method: 'PATCH', headers: api.headers, body: JSON.stringify({name: popupEditName.value, about: popupEditDescription.value})})
}

export const addNewCart = () => {
    return fetch(api.url + '/cards', {method: 'POST', headers: api.headers, body: JSON.stringify({name: popupPlaceName.value, link: popupPlaceImage.value})})
}

export const deleteUserCart = cart => {
    return fetch(api.url + `/cards/${cart._id}`, {method: 'DELETE', headers: api.headers})
}

export const changeAvatar = () => {
    return fetch(api.url + '/users/me/avatar', {method: 'PATCH', headers: api.headers, body: JSON.stringify({avatar: popupAvatarLink.value})})
}

export const changeLike = (cart, condition) => {
    return fetch(api.url + `/cards/likes/${cart._id}`, {method: condition ? 'DELETE' : 'PUT', headers: api.headers})
}