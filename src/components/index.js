import { enableValidation } from './validate.js';
import { config } from './constants.js';
import { profileContainer,popups,savePopupElement,cardPopupElement,initialCards } from './constants.js';
import { openedPopupProfile,openedCardActionPopup,openedAvatarPopupProfle,closePopup,saveProfile } from './modal.js';
import { loadCards,saveCard } from './cards.js';
import '../index.css';

// delegation profile
profileContainer.addEventListener('click', function (evt) {
    const element = evt.target;
    // edit action
    if (element.classList.contains('profile__edit-button')) {
        openedPopupProfile();
    }
    // add card action
    else if (element.classList.contains('profile__add-button')) {
        openedCardActionPopup();
    }
    // edit avatar action
    else if (element.classList.contains('profile__image')) {
        openedAvatarPopupProfle();
    }
});

//эвент на попап
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    if (evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
  });
});

// эвент форм, сохранение профиля и добавление карточек
savePopupElement.addEventListener('submit', saveProfile);
cardPopupElement.addEventListener('submit', saveCard);

// загружаем карточки, после построения дом дерева
document.addEventListener("DOMContentLoaded", loadCards(initialCards));

enableValidation(config);

