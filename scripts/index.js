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
let popup = document.querySelector(".popup");

//main content
let mainContent = document.querySelector(".content");
let profileName = mainContent.querySelector(".profile__title");
let profileAbout = mainContent.querySelector(".profile__quote");
let elements = mainContent.querySelector(".elements__container");

// сохранение информации в профиле
function profileSave() {
  let popupValue = popup.querySelectorAll(".popup__item");
  profileName.textContent = popupValue[0].value;
  profileAbout.textContent = popupValue[1].value;
  popup.classList.toggle("popup_opened");
  popupValue[0].value = '';
  popupValue[1].value = '';
}

// добавление карточки на страницу
function cardSave() {
  let popupValue = popup.querySelectorAll(".popup__item");
  let nameMesto = popupValue[0].value;
  let linkMesto = popupValue[1].value;
  elements.insertAdjacentHTML('afterbegin',`<article class="card">
    <button class="card__delete-button" type="button"></button>
    <img class="card__image" src="${linkMesto}" alt="${nameMesto}">
    <div class="card__about">
      <h2 class="card__info">${nameMesto}</h2>
      <button class="card__like" type="button"></button>
    </div>
    </article>`);
  popup.classList.toggle("popup_opened");
}

// удаление карточки со страницы
function cardDelete() {

}
// добавляем контент на страницу
function loadCards (initialCards) {
  for (i = 0; i < initialCards.length; i +=1) {
    elements.insertAdjacentHTML('beforeend',`<article class="card">
    <button class="card__delete-button" type="button"></button>
    <img class="card__image" src="${initialCards[i].link}" alt="${initialCards[i].name}">
    <div class="card__about">
      <h2 class="card__info">${initialCards[i].name}</h2>
      <button class="card__like" type="button"></button>
    </div>
    </article>`);
  }
}
// открываем попап для редактирования профиля
function popupProfileOpened() {
  let popupValue = popup.querySelectorAll(".popup__item");
  popupValue[0].value = profileName.textContent;
  popupValue[1].value = profileAbout.textContent;
  popup.classList.toggle("popup_opened");
}

// закрываем попап, без привязки где был вызван
function popupClose() {
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
function popupCardOpened() {
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
  let element = event.target;
  // like action
  if(element.classList.contains('card__like')) {
    element.classList.toggle("card__like_active");
  }
  // edit action
  else if (element.classList.contains('profile__edit-button')) {
    popupProfileOpened();
  }
  // close popup action
  else if (element.classList.contains('popup__close')) {
    popupClose();
  }
  // save profile info action
  else if (element.classList.contains('popup__button')) {
    event.preventDefault();
    profileSave();
  }
  // add card action
  else if (element.classList.contains('profile__add-button')) {
    popupCardOpened();
  }
  // save card action
  else if (element.classList.contains('popup__button-cards')) {
    event.preventDefault();
    cardSave();
    element.classList.replace("popup__button-cards", "popup__button");
  }
  // delete card action
  else if (element.classList.contains('card__delete-button')) {
    cardDelete(element.parentNode);
  }
});


