export default class Api {
    #baseUrl;
    #headers;

    #onResponse(res) {
        return res.ok
            ? res.json()
            : res.json()
                .then(data => {
                    Promise.reject(data.message)
                })
    }

    #request(endpointUrl, options) {
        return fetch(`${this.#baseUrl}${endpointUrl}`, options)
            .then(this.#onResponse)
    }

    constructor(config) {
        this.#baseUrl = config.baseUrl;
        this.#headers = config.headers;
    }

    getCarts() {
        return this.#request('/cards', {
            headers: this.#headers
        })
    }

    getUserInfo() {
        return this.#request('/users/me', {
            headers: this.#headers
        })
    }

    editUser(data) {
        return this.#request('/users/me', {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about    
            })
        })
    }

    addNewCart(data) {
        return this.#request('/cards', {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({
                name: data.name, 
                link: data.link
            })
        })
    }

    deleteUserCart(cartId) {
        return this.#request(`/cards/${cartId}`, {
            method: 'DELETE',
            headers: this.#headers
        })
    }

    updateAvatar(data) {
        console.log(data);
        return this.#request('/users/me/avatar', {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
    }

    updateLike(cartId, condition) {
        return this.#request(`/cards/likes/${cartId}`, {
            method: condition
                        ? 'DELETE'
                        : 'PUT',
            headers: this.#headers
        })
    }
}