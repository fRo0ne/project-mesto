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
  
  //modal
export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector(".popup_edit-profile");
export const popupCard = document.querySelector(".popup_add-card");
export const popupImage = document.querySelector(".popup_image");
export const picturePopup = popupImage.querySelector(".popup__picture");
export const figurePopup = popupImage.querySelector(".figure__quote");
export const popupAvatarProfile = document.querySelector(".popup_avatar-edit");
  
  //form popup profile
export const savePopupElement = document.querySelector('[name="profile-action"]');
export const nameSaveInput = savePopupElement.querySelector('[name="name"]');
export const aboutSaveInput = savePopupElement.querySelector('[name="description"]');
  //form popup card
export const cardPopupElement = document.querySelector('[name="card-action"]');
export const textCardInput = cardPopupElement.querySelector('[name="text"]');
export const urlCardInput = cardPopupElement.querySelector('[name="url"]');
  
  
  //main content
export const mainContent = document.querySelector(".content");
export const profileContainer = mainContent.querySelector(".profile");
export const profileName = mainContent.querySelector(".profile__title");
export const profileAbout = mainContent.querySelector(".profile__quote");
export const elements = mainContent.querySelector(".elements__container");
  
  //template
export const cardTemplate = document.querySelector('#cards-element').content;