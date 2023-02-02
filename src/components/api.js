import { settingsApi } from "./constants";

function getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
}

function request(url, options) {
    return fetch(url, options).then(getResponse);
}

export function deleteCard(cardId) {
    return request(`${settingsApi.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: settingsApi.headers,
    })
    
}

export function addLike(cardId) {
    return request(`${settingsApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: settingsApi.headers,
    })
    
}

export function deleteLike(cardId) {
    return request(`${settingsApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: settingsApi.headers,
    })
    
}

export function getCards() {
    return request(`${settingsApi.baseUrl}/cards`, {
        headers: settingsApi.headers,
    })
    
}


export function submitProfileForm(nameInput, jobInput) {
    return request(`${settingsApi.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: settingsApi.headers,
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value
        })
    })
    
}


export function submitCardForm(nameCardInput, imageInput) {
    return request(`${settingsApi.baseUrl}/cards`, {
        method: 'POST',
        headers: settingsApi.headers,
        body: JSON.stringify({
            name: nameCardInput.value,
            link: imageInput.value
        })
    })
    
}

export function changeAvatar(avatarLink) {
    return request(`${settingsApi.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: settingsApi.headers,
        body: JSON.stringify({
            avatar: avatarLink.value,
        })
    })
    
}

export function renderProfile() {
    return request(`${settingsApi.baseUrl}/users/me`, {
        headers: settingsApi.headers,
    })
    
}