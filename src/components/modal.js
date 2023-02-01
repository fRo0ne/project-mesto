import { profileName,profileAbout,nameSaveInput,aboutSaveInput,popupProfile } from "./constants.js";
import { picturePopup,figurePopup,popupImage,popupCard,popupAvatarProfile } from "./constants.js";

// закрываем попап
export function closePopup(popup) {
    popup.classList.remove('popup_opened');  
    document.removeEventListener('keydown', closeByEscape);  
}

// открываем попап
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if(openedPopup) closePopup(openedPopup);
    }
}

// сохранение информации в профиле
export function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameSaveInput.value;
    profileAbout.textContent = aboutSaveInput.value;
    closePopup(popupProfile);
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

