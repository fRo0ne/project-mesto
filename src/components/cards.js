import { cardTemplate,textCardInput,urlCardInput,popupCard } from "./constants.js";
import { openedCardPopup,closePopup } from "./modal.js";
import { elements } from "./constants.js";

// создание карточек
export function createCard(link, name) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__info').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
        deleteCard(evt.target.closest('.card'));
    });
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle("card__like_active");
    });
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        openedCardPopup(evt.target);
    });
    return cardElement;
}

// добавление карточки на страницу
export function saveCard(evt) {
    evt.preventDefault();
    const nameMesto = textCardInput.value;
    const linkMesto = urlCardInput.value;
    elements.prepend(createCard(linkMesto, nameMesto));
    closePopup(popupCard);
    textCardInput.value = '';
    urlCardInput.value = '';
}

// удаление карточки со страницы
export function deleteCard(cardElement) {
    cardElement.remove();
}


// добавляем контент на страницу
export function loadCards(initialCards) {
    initialCards.forEach((card) => {
        elements.append(createCard(card.link, card.name));
    });
}