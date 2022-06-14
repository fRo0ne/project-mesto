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
const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".view-image");

//main content
const mainContent = document.querySelector(".content");
const profileName = mainContent.querySelector(".profile__title");
const profileAbout = mainContent.querySelector(".profile__quote");
const elements = mainContent.querySelector(".elements__container");

// сохранение информации в профиле
function saveProfile() {
  let popupValue = popup.querySelectorAll(".popup__item");
  profileName.textContent = popupValue[0].value;
  profileAbout.textContent = popupValue[1].value;
  popup.classList.toggle("popup_opened");
  popupValue[0].value = '';
  popupValue[1].value = '';
}

// добавление карточки на страницу
function saveCard() {
  const popupValue = popup.querySelectorAll(".popup__item");
  const nameMesto = popupValue[0].value;
  const linkMesto = popupValue[1].value;
  elements.insertAdjacentHTML('afterbegin',`<article class="card">
  <button class="card__delete-button" type="button"></button>
  <img class="card__image" src="${linkMesto}" alt="${nameMesto}">
  <div class="card__about">
    <h2 class="card__info">${nameMesto}</h2>
    <button class="card__like" type="button"></button>
  </div>
  </article>`);
  popup.classList.toggle("popup_opened");
  popupValue[0].value = '';
  popupValue[1].value = '';

}

// удаление карточки со страницы
function deleteCard(cardElement) {
  cardElement.remove();
}

// открываем просмотр фото
function openedCardPopup(cardElement) {
  popupImage.innerHTML = `<figure class="figure">
  <button class="popup__close" type="button"></button>
  <img class="view-image__picture" src="${cardElement.src}" alt="${cardElement.alt}">
  <figcaption class="figure__quote figure__quote_view-image">${cardElement.alt}</figcaption>
</figure>`;
  popupImage.classList.toggle("popup_opened");
}

// добавляем контент на страницу
function loadCards (initialCards) {
  initialCards.forEach((card) => {
    elements.insertAdjacentHTML('beforeend',`<article class="card">
    <button class="card__delete-button" type="button"></button>
    <img class="card__image" src="${card.link}" alt="${card.name}">
    <div class="card__about">
      <h2 class="card__info">${card.name}</h2>
      <button class="card__like" type="button"></button>
    </div>
    </article>`);
  });
}

// открываем попап для редактирования профиля
function openedPopupProfile() {
  let popupValue = popup.querySelectorAll(".popup__item");
  popupValue[0].value = profileName.textContent;
  popupValue[1].value = profileAbout.textContent;
  popup.classList.toggle("popup_opened");
}

// закрываем попап, без привязки где был вызван
function closePopup() {
  let popupValue = popup.querySelectorAll(".popup__item");
  if (!popup.querySelector(".popup__button")) {
    popup.querySelector(".popup__button-cards").classList.replace("popup__button-cards", "popup__button");
  }
  popup.classList.toggle("popup_opened");
  popupValue[0].placeholder = 'Имя';
  popupValue[1].placeholder = 'Описание';
  popupValue[0].value = '';
  popupValue[1].value = '';
}

// открыаем попап для добавления карточек на страницу
function openedCardActionPopup() {
  let popupValue = popup.querySelectorAll(".popup__item");
  let popupTitle = popup.querySelector(".popup__title");
  let popupButton = popup.querySelector(".popup__button");
  popupTitle.textContent = 'Новое место';
  popupValue[0].placeholder = 'Название';
  popupValue[1].placeholder = 'Ссылка на картинку';
  popupButton.classList.replace("popup__button", "popup__button-cards");
  popup.classList.toggle("popup_opened");
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
    if(element.parentNode.classList.contains('figure')) {
      return popupImage.classList.toggle("popup_opened");
    }
    closePopup();
  }
  // save profile info action
  else if (element.classList.contains('popup__button')) {
    event.preventDefault();
    saveProfile();
  }
  // add card action
  else if (element.classList.contains('profile__add-button')) {
    openedCardActionPopup();
  }
  // save card action
  else if (element.classList.contains('popup__button-cards')) {
    event.preventDefault();
    saveCard();
    element.classList.replace("popup__button-cards", "popup__button");
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


