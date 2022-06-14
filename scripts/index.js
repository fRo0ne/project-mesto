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
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector(".popup_edit-profile");
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
const profileContainer = mainContent.querySelector(".profile");
const profileName = mainContent.querySelector(".profile__title");
const profileAbout = mainContent.querySelector(".profile__quote");
const elements = mainContent.querySelector(".elements__container");

//template
const cardTemplate = document.querySelector('#cards-element').content;

// закрываем попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// открываем попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// создание карточек
function createCard(link,name) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__info').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    deleteCard(evt.target.parentNode);
  });
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle("card__like_active");
  });
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
    openedCardPopup(evt.target);
  });
  return cardElement;
}

// сохранение информации в профиле
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameSaveInput.value;
  profileAbout.textContent = aboutSaveInput.value;
  closePopup(popupProfile);
}


// добавление карточки на страницу
function saveCard(evt) {
  evt.preventDefault();
  const nameMesto = textCardInput.value;
  const linkMesto = urlCardInput.value;
  elements.prepend(createCard(linkMesto,nameMesto));
  closePopup(popupCard);
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
  openPopup(popupImage);
}

// добавляем контент на страницу
function loadCards (initialCards) {
  initialCards.forEach((card) => {
  elements.append(createCard(card.link,card.name));
  });
}

// открываем попап для редактирования профиля
function openedPopupProfile() {
  nameSaveInput.value = profileName.textContent;
  aboutSaveInput.value = profileAbout.textContent;
  openPopup(popupProfile);
}

// открыаем попап для добавления карточек на страницу
function openedCardActionPopup() {
  openPopup(popupCard);
}

//эвент на попап
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
  });
});

// эвент форм, сохранение профиля и добавление карточек
savePopupElement.addEventListener('submit', saveProfile);
cardPopupElement.addEventListener('submit', saveCard);

// загружаем карточки, после построения дом дерева
document.addEventListener("DOMContentLoaded", loadCards(initialCards));

// delegation profile
profileContainer.addEventListener('click', function(evt) {
  const element = evt.target;
  // edit action
  if (element.classList.contains('profile__edit-button')) {
    openedPopupProfile();
  }
  // add card action
  else if (element.classList.contains('profile__add-button')) {
    openedCardActionPopup();
  }
});

