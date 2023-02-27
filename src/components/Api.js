export default class Api {

    constructor({ headers, baseUrl }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _getResponse(res) {
        return res.ok ? res.json() : Promise.reject(res);
    }

    async _request(url, options) {
        const res = await fetch(url, options);
        return this._getResponse(res);
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })

    }

    addLike(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })

    }

    deleteLike(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })

    }

    getCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })

    }


    submitProfileForm(nameInput, jobInput) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: nameInput.value,
                about: jobInput.value
            })
        })

    }


    submitCardForm(nameCardInput, imageInput) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: nameCardInput.value,
                link: imageInput.value
            })
        })

    }

    changeAvatar(avatarLink) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink.value,
            })
        })

    }

    renderProfile() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })

    }

}