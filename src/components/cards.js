import { cardTemplate,isOwner,likeOwner } from "./constants.js";
import { openedCardPopup } from "./index.js";
import { deleteCard,deleteLike,addLike } from "./api.js";

// создание карточек
export function createCard(link, name, countLikes = 0, cardId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageSelector = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like');
    const cardLikeContent = cardElement.querySelector('.card__like-count');
    if(!isOwner) cardDeleteButton.remove();
    if(likeOwner) cardLikeButton.classList.add('card__like_active');
    cardImageSelector.id = cardId;
    cardImageSelector.src = link;
    cardImageSelector.alt = name;
    cardLikeContent.textContent = countLikes;
    cardElement.querySelector('.card__info').textContent = name;
    cardDeleteButton.addEventListener('click', function (evt) {
        deleteCard(cardId).then(res => {
            if(res) deleteCardFromPage(evt.target.closest('.card'));
        }).catch(err => console.log(err));
    });
    cardLikeButton.addEventListener('click', function (evt) {
        cardLikeAction(cardLikeButton,cardLikeContent,cardImageSelector);
    });
    cardImageSelector.addEventListener('click', function (evt) {
        openedCardPopup(evt.target);
    });
    return cardElement;
}

// удаление карточки со страницы
export function deleteCardFromPage(cardElement) {
    cardElement.remove();
}

// action на лайки карточки
export function cardLikeAction(cardLikeButton, cardLikeContent, card) {
    if(cardLikeButton.classList.contains('card__like_active')) {
        deleteLike(card.id).then(res => {
            if(res) {
                cardLikeButton.classList.remove('card__like_active');
                cardLikeContent.textContent = res.likes.length;
            }
        }).catch(err => console.log(err));
        return;
    }
    addLike(card.id).then(res => {
        if(res) {
        cardLikeButton.classList.add('card__like_active');
        cardLikeContent.textContent = res.likes.length;
        }   
    }).catch(err => console.log(err));

}