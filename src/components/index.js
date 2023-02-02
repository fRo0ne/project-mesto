import { enableValidation } from './validate.js';
import { profileName,profileAbout,nameSaveInput,aboutSaveInput,popupProfile } from "./constants.js";
import { picturePopup,figurePopup,popupImage,popupCard,popupAvatarProfile,profileAvatar } from "./constants.js";
import { config,elements,textCardInput,urlCardInput,cardPopupAvatarElement,urlAvatarInput } from './constants.js';
import { profileContainer,popups,savePopupElement,cardPopupElement,userId,isOwner,likeOwner } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { handleSubmit } from './util.js';
import { createCard } from './cards.js';
import { renderProfile,getCards,submitProfileForm,changeAvatar,submitCardForm } from './api.js';
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
        likeOwner = false;
        isOwner = userId === card.owner._id;
        card.likes.forEach(el => {
            if(el._id === userId) likeOwner = true;
        })
        elements.append(createCard(card.link, card.name, card.likes.length, card._id));
    });
}

// добавление карточки на страницу
export function saveCard(evt) {
    function createRequest() {
        return submitCardForm(textCardInput, urlCardInput).then(data => {
            isOwner = true;
            const nameCard = textCardInput.value;
            const linkCardImage = urlCardInput.value;
            elements.prepend(createCard(linkCardImage, nameCard, 0, data._id));
            closePopup(popupCard);
        });
    }
    handleSubmit(createRequest, evt);
}


// сохранение информации в профиле
export function saveProfile(evt) {
    function createRequest() {
        return submitProfileForm(nameSaveInput,aboutSaveInput).then(data => {
            profileName.textContent = data.name;
            profileAbout.textContent = data.about;
            closePopup(popupProfile);
        });
    }
    handleSubmit(createRequest,evt);
}


// сохранение информации в профиле
export function saveProfileAvatar(evt) {
    function createRequest() {
        return changeAvatar(urlAvatarInput).then(data => {
            profileAvatar.style.backgroundImage = `url(${data.avatar}`;
            closePopup(popupAvatarProfile);
        });
    }
    handleSubmit(createRequest, evt);
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
cardPopupAvatarElement.addEventListener('submit', saveProfileAvatar);

Promise.all([renderProfile(), getCards()])
  .then(([userData, cards]) => {
    profileAvatar.style.backgroundImage = `url(${userData.avatar}`;
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    userId = userData._id;
    loadCards(cards);
  })
  .catch(err => {
    console.log(err);
  });

enableValidation(config);

