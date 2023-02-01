import { enableValidation } from './validate.js';
import { profileName,profileAbout,nameSaveInput,aboutSaveInput,popupProfile } from "./constants.js";
import { picturePopup,figurePopup,popupImage,popupCard,popupAvatarProfile } from "./constants.js";
import { config,elements,textCardInput,urlCardInput } from './constants.js';
import { profileContainer,popups,savePopupElement,cardPopupElement,initialCards } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { handleSubmit } from './util.js';
import { createCard } from './cards.js';
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

// добавляем контент на страницу
export function loadCards(initialCards) {
    initialCards.forEach((card) => {
        elements.append(createCard(card.link, card.name));
    });
}

// добавление карточки на страницу
export function saveCard(evt) { 
    const nameMesto = textCardInput.value;
    const linkMesto = urlCardInput.value;
    elements.prepend(createCard(linkMesto, nameMesto));
    closePopup(popupCard);      
    handleSubmit(evt);
}


// сохранение информации в профиле
export function saveProfile(evt) {
    profileName.textContent = nameSaveInput.value;
    profileAbout.textContent = aboutSaveInput.value;
    closePopup(popupProfile);
    handleSubmit(evt);
}

// открываем просмотр фото
export function openedCardPopup(cardElement) {
    picturePopup.src = cardElement.src;
    picturePopup.alt = cardElement.alt;
    figurePopup.textContent = cardElement.alt;
    openPopup(popupImage);
}

// открываем попап для редактирования профиля
export function openedPopupProfile() {
    nameSaveInput.value = profileName.textContent;
    aboutSaveInput.value = profileAbout.textContent;
    openPopup(popupProfile);
}

// открыаем попап для добавления карточек на страницу
export function openedCardActionPopup() {
    openPopup(popupCard);
}

// открыаем попап для добавления карточек на страницу
export function openedAvatarPopupProfle() {
    openPopup(popupAvatarProfile);
}

// эвент форм, сохранение профиля и добавление карточек
savePopupElement.addEventListener('submit', saveProfile);
cardPopupElement.addEventListener('submit', saveCard);

// загружаем карточки, после построения дом дерева
document.addEventListener("DOMContentLoaded", loadCards(initialCards));

enableValidation(config);

