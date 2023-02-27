import { profileName,profileAbout,forms } from "../utils/constants.js";
import { popupImage,profileAvatar } from "../utils/constants.js";
import { settingsApi,config,elements,profileEditButton,profileAvatarButton,profileCardButton} from '../utils/constants.js';
import { cardTemplate } from '../utils/constants.js';
import { handleSubmit } from '../utils/util.js';
import Api from '../components/Api.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Cards from '../components/Cards.js';
import Section from '../components/Section.js';
import './index.css';

let userId;
let isOwner = false;
let likeOwner = false;

let profileAction;
let cardAction;
let avatarAction; 
let userInfo;
let section;

export const defaultApi = new Api( settingsApi );

// добавляем контент на страницу
export function renderer(card) {
        likeOwner = false;
        card.countLikes = card.likes.length;
        isOwner = userId === card.owner._id;
        card.likes.forEach(el => {
            if(el._id === userId) likeOwner = true;
        })
        const cards = new Cards(card,cardTemplate, isOwner, likeOwner, defaultApi, openedCardPopup);
        section.addItem(cards.createCard());
}

// добавление карточки на страницу
export function saveCard(evt, {text, url}) {
    async function createRequest() {
        const data = await defaultApi.submitCardForm(text, url);
        section = new Section( {items: data, renderer: renderer}, elements);
        section.renderItems();
        cardAction.closePopup();
    }
    handleSubmit(createRequest, evt);
}


// сохранение информации в профиле
export function saveProfile(evt, {firstName, description}) {
    async function createRequest() {
        const data = await defaultApi.submitProfileForm(firstName, description);
        userInfo.setUserInfo(data);
        profileAction.closePopup();
    }
    handleSubmit(createRequest,evt);
}


// сохранение информации в профиле
export function saveProfileAvatar(evt, {url}) {
    async function createRequest() {
        const data = await defaultApi.changeAvatar(url);
        profileAvatar.style.backgroundImage = `url(${data.avatar}`;
        avatarAction.closePopup();
    }
    handleSubmit(createRequest, evt);
}

// открываем просмотр фото
export function openedCardPopup(cardElement) {
    new PopupWithImage(popupImage)._openImage(cardElement.target);
}

// открываем попап для редактирования профиля
export function openedPopupProfile() {
    const infoObject = userInfo.getUserInfo();
    profileAction.setInputValues({firstName: infoObject.name, description: infoObject.about});
    profileAction.openPopup();
}

// открыаем попап для добавления карточек на страницу
export function openedCardActionPopup() {
    cardAction.openPopup();
}

// открываем попап для добавления карточек на страницу
export function openedAvatarPopupProfle() {
    avatarAction.openPopup();
}

Promise.all([defaultApi.renderProfile(), defaultApi.getCards()])
  .then(([userData, cards]) => {
    userInfo = new UserInfo( {profileAvatar, profileName, profileAbout} );
    userInfo.setUserInfo(userData);
    userId = userData._id;
    section = new Section( {items: cards.reverse(), renderer: renderer}, elements);
    section.renderItems();
  })
  .catch(err => {
    console.log(err);
  });

function enableModules() {
    const elementsForm = Array.from(forms);
    elementsForm.forEach((el) => {
        const popup = el.closest('.popup');
        switch (el.name) {
            case 'profileAction':
                profileAction = new PopupWithForm(popup, {form: el, handler: saveProfile, button: profileEditButton, modal: openedPopupProfile});
                break;
            case 'cardAction':
                cardAction = new PopupWithForm(popup, {form: el, handler: saveCard, button: profileCardButton, modal: openedCardActionPopup});
                break;
            case 'profileAvatarAction':
                avatarAction = new PopupWithForm(popup, {form: el, handler: saveProfileAvatar, button: profileAvatarButton, modal: openedAvatarPopupProfle});
                break;

        }
        new FormValidator(config,el)._ebnableValidation();
    });
};

enableModules();

