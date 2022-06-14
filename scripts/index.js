// cards
const initialCards = [
  {
    name: 'Думбай',
    link: 'images/elements/dumbai.jpg'
  },
  {
    name: 'Альпы',
    link: 'images/elements/alpy.jpg'
  },
  {
    name: 'Эльбрус',
    link: 'images/elements/elbrus.jpg'
  },
  {
    name: 'Острая, Камчатка',
    link: 'images/elements/kamchatka.jpg'
  },
  {
    name: 'Карачаевск',
    link: 'images/elements/karachaevsk.jpg'
  },
  {
    name: 'Саяны',
    link: 'images/elements/sayan.jpg'
  }
  ];

//modal
const popup = document.querySelector(".popup_edit-profile");
const popupCard = document.querySelector(".popup_add-card");
const popupImage = document.querySelector(".popup_image");
const picturePopup = popupImage.querySelector(".popup__picture");
const figurePopup = popupImage.querySelector(".figure__quote");

//form popup profile
const savePopupElement = document.querySelector('[name="profile-action"]');
const nameSaveInput = savePopupElement.querySelector('[name="name"]');
const aboutSaveInput = savePopupElement.querySelector('[name="description"]');
//form popup card
const cardPopupElement = document.querySelector('[name="card-action"]');
const textCardInput = cardPopupElement.querySelector('[name="text"]');
const urlCardInput = cardPopupElement.querySelector('[name="url"]');


//main content
const mainContent = document.querySelector(".content");
const profileName = mainContent.querySelector(".profile__title");
const profileAbout = mainContent.querySelector(".profile__quote");
const elements = mainContent.querySelector(".elements__container");

//template
const cardTemplate = document.querySelector('#cards-element').content;

// сохранение информации в профиле
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameSaveInput.value;
  profileAbout.textContent = aboutSaveInput.value;
  popup.classList.toggle("popup_opened");
}

// добавление карточки на страницу
function saveCard(evt) {
  evt.preventDefault();
  const nameMesto = textCardInput.value;
  const linkMesto = urlCardInput.value;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = linkMesto;
  cardElement.querySelector('.card__image').alt = nameMesto;
  cardElement.querySelector('.card__info').textContent = nameMesto;
  elements.prepend(cardElement);
  popupCard.classList.toggle("popup_opened");
  textCardInput.value = '';
  urlCardInput.value = '';

}

// удаление карточки со страницы
function deleteCard(cardElement) {
  cardElement.remove();
}

// открываем просмотр фото
function openedCardPopup(cardElement) {
  picturePopup.src = cardElement.src;
  picturePopup.alt = cardElement.alt;
  figurePopup.textContent = cardElement.alt;
  popupImage.classList.toggle("popup_opened");
}

// добавляем контент на страницу
function loadCards (initialCards) {
  initialCards.forEach((card) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__info').textContent = card.name;
  elements.append(cardElement);
  });
}

// открываем попап для редактирования профиля
function openedPopupProfile() {
  nameSaveInput.value = profileName.textContent;
  aboutSaveInput.value = profileAbout.textContent;
  popup.classList.toggle("popup_opened");
}

// закрываем попап, без привязки где был вызван
function closePopup(popupElement) {
  const popupParent = popupElement.parentNode;
  if (popupParent.classList.contains('figure')) {
    return popupImage.classList.toggle("popup_opened");
  }
  if (popupParent.classList.contains('popup__container') && popupParent.parentNode.classList.contains('popup_edit-profile')) {
    return popup.classList.toggle("popup_opened");
  }
  textCardInput.value = '';
  urlCardInput.value = '';
  return popupCard.classList.toggle("popup_opened");
}

// открыаем попап для добавления карточек на страницу
function openedCardActionPopup() {
  popupCard.classList.toggle("popup_opened");
}

// загружаем карточки, после построения дом дерева
document.addEventListener("DOMContentLoaded", loadCards(initialCards));

// delegation
document.addEventListener('click', function(event) {
  const element = event.target;
  // like action
  if(element.classList.contains('card__like')) {
    element.classList.toggle("card__like_active");
  }
  // edit action
  else if (element.classList.contains('profile__edit-button')) {
    openedPopupProfile();
  }
  // close popup action
  else if (element.classList.contains('popup__close')) {
    closePopup(element);
  }
  // add card action
  else if (element.classList.contains('profile__add-button')) {
    openedCardActionPopup();
  }
  // delete card action
  else if (element.classList.contains('card__delete-button')) {
    deleteCard(element.parentNode);
  }
  // cards view-image action
  else if (element.classList.contains('card__image')) {
    openedCardPopup(element);
  }

});

savePopupElement.addEventListener('submit', saveProfile);
cardPopupElement.addEventListener('submit', saveCard);



  // // save card action
  // else if (element.classList.contains('popup__button-cards')) {
  //   event.preventDefault();
  //   saveCard();
  // }



  // // save profile info action
  // else if (element.classList.contains('popup__button')) {
  //   event.preventDefault();
  //   saveProfile();
  // }
