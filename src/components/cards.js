import { cardTemplate } from "./constants.js";
import { openedCardPopup } from "./index.js";

// создание карточек
export function createCard(link, name) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageSelector = cardElement.querySelector('.card__image');

    cardImageSelector.src = link;
    cardImageSelector.alt = name;
    cardElement.querySelector('.card__info').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        deleteCard(evt.target.closest('.card'));
    });
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle("card__like_active");
    });
    cardImageSelector.addEventListener('click', function (evt) {
        openedCardPopup(evt.target);
    });
    return cardElement;
}

// удаление карточки со страницы
export function deleteCard(cardElement) {
    cardElement.remove();
}