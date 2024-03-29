import dumbai from '../images/elements/dumbai.jpg';
import alpy from '../images/elements/alpy.jpg';
import elbrus from '../images/elements/elbrus.jpg';
import kamchatka from '../images/elements/kamchatka.jpg';
import karachaevsk from '../images/elements/karachaevsk.jpg';
import sayan from '../images/elements/sayan.jpg';

export const config = {
  modalForms: '.popup__form',
  modalInputField: '.popup__item',
  modalInputError: 'popup__item_error',
  modalInvalidMessageShow: 'popup__item-notify_active',
  modalButtonSubmit: '.popup__button',
  modalButtonSubmitActive: 'popup__button_active',
  modalButtonSubmitDisabled: 'popup__button_disabled'
}

export const settingsApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '5fc6c1ef-24ac-466a-ac09-472249785b0e',
    'Content-Type': 'application/json',
  }
}

// cards
export const initialCards = [
  {
    name: 'Думбай',
    link: dumbai
  },
  {
    name: 'Альпы',
    link: alpy
  },
  {
    name: 'Эльбрус',
    link: elbrus
  },
  {
    name: 'Острая, Камчатка',
    link: kamchatka
  },
  {
    name: 'Карачаевск',
    link: karachaevsk
  },
  {
    name: 'Саяны',
    link: sayan
  }
];

//form 
export const forms = document.querySelectorAll(config.modalForms);
//modal
export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector(".popup_edit-profile");
export const popupCard = document.querySelector(".popup_add-card");
export const popupImage = document.querySelector(".popup_image");
export const picturePopup = popupImage.querySelector(".popup__picture");
export const figurePopup = popupImage.querySelector(".figure__quote");
export const popupAvatarProfile = document.querySelector(".popup_avatar-edit");

//form popup profile
export const savePopupElement = document.forms.profileAction;
export const nameSaveInput = savePopupElement.elements.name;
export const aboutSaveInput = savePopupElement.elements.description;
//form popup card
export const cardPopupElement = document.forms.cardAction;
export const textCardInput = cardPopupElement.elements.text;
export const urlCardInput = cardPopupElement.elements.url;
//form popup avatar
export const cardPopupAvatarElement = document.forms.profileAvatarAction;
export const urlAvatarInput = cardPopupAvatarElement.elements.url;


//main content
export const mainContent = document.querySelector(".content");
export const profileContainer = mainContent.querySelector(".profile");
export const profileName = mainContent.querySelector(".profile__title");
export const profileAbout = mainContent.querySelector(".profile__quote");
export const profileAvatar = mainContent.querySelector(".profile__image");
export const elements = mainContent.querySelector(".elements__container");

//template
export const cardTemplate = document.querySelector('#cards-element').content;