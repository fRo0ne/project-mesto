import { profileName,profileAbout,nameSaveInput,aboutSaveInput,popupProfile,forms } from "./constants.js";
import { picturePopup,figurePopup,popupImage,popupCard,popupAvatarProfile,profileAvatar } from "./constants.js";
import { settingsApi,config,elements,textCardInput,urlCardInput,cardPopupAvatarElement,urlAvatarInput } from './constants.js';
import { profileContainer,popups,savePopupElement,cardPopupElement,cardTemplate } from './constants.js';
import { handleSubmit } from './util.js';
import Api from './Api.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import Cards from './Cards.js';
import '../index.css';

export let userId;
export let isOwner = false;
export let likeOwner = false;

export const defaultApi = new Api( settingsApi );

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
        new Popup(popup).closePopup();
      }
    if (evt.target.classList.contains('popup')) {
        new Popup(popup).closePopup();
    }
  });
});

// добавляем контент на страницу
export function loadCards(initialCards) {
    initialCards.forEach((card) => {
        card.countLikes = card.likes.length;
        likeOwner = false;
        isOwner = userId === card.owner._id;
        card.likes.forEach(el => {
            if(el._id === userId) likeOwner = true;
        })
        const cards = new Cards(card,cardTemplate, isOwner, likeOwner, defaultApi, openedCardPopup);
        elements.append(cards.createCard());
    });
}

// добавление карточки на страницу
export function saveCard(evt) {
    async function createRequest() {
        const data = await defaultApi.submitCardForm(textCardInput, urlCardInput);
        isOwner = true;
        const nameCard = textCardInput.value;
        const linkCardImage = urlCardInput.value;
        const card = ({
            link: linkCardImage,
            name: nameCard,
            countLikes: 0,
            _id: data._id
        });
        const cards = new Cards(card, cardTemplate, isOwner, likeOwner, defaultApi, openedCardPopup);
        elements.prepend(cards.createCard());
        new Popup(popupCard).closePopup();
    }
    handleSubmit(createRequest, evt);
}


// сохранение информации в профиле
export function saveProfile(evt) {
    async function createRequest() {
        const data = await defaultApi.submitProfileForm(nameSaveInput, aboutSaveInput);
        profileName.textContent = data.name;
        profileAbout.textContent = data.about;
        new Popup(popupProfile).closePopup();
    }
    handleSubmit(createRequest,evt);
}


// сохранение информации в профиле
export function saveProfileAvatar(evt) {
    async function createRequest() {
        const data = await defaultApi.changeAvatar(urlAvatarInput);
        profileAvatar.style.backgroundImage = `url(${data.avatar}`;
        new Popup(popupAvatarProfile).closePopup();
    }
    handleSubmit(createRequest, evt);
}

// открываем просмотр фото
export function openedCardPopup(cardElement) {
    picturePopup.src = cardElement.target.src;
    picturePopup.alt = cardElement.target.alt;
    figurePopup.textContent = cardElement.target.alt;
    new Popup(popupImage).openPopup();
}

// открываем попап для редактирования профиля
export function openedPopupProfile() {
    nameSaveInput.value = new UserInfo( {profileAvatar, profileName, profileAbout} ).getUserInfo().name;
    aboutSaveInput.value = new UserInfo( {profileAvatar, profileName, profileAbout} ).getUserInfo().about;
    new Popup(popupProfile).openPopup();
}

// открыаем попап для добавления карточек на страницу
export function openedCardActionPopup() {
    new Popup(popupCard).openPopup();
}

// открыаем попап для добавления карточек на страницу
export function openedAvatarPopupProfle() {
    new Popup(popupAvatarProfile).openPopup();
}

// эвент форм, сохранение профиля и добавление карточек
savePopupElement.addEventListener('submit', saveProfile);
cardPopupElement.addEventListener('submit', saveCard);
cardPopupAvatarElement.addEventListener('submit', saveProfileAvatar);

Promise.all([defaultApi.renderProfile(), defaultApi.getCards()])
  .then(([userData, cards]) => {
    new UserInfo( {profileAvatar, profileName, profileAbout} ).setUserInfo(userData);
    userId = userData._id;
    loadCards(cards);
  })
  .catch(err => {
    console.log(err);
  });




function enableValidation() {
    const elementsForm = Array.from(forms);
    elementsForm.forEach((el) => {
        new FormValidator(config).setEventListeners(el);
    });
};


enableValidation();

