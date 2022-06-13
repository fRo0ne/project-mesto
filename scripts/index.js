//modal action
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");
let submitButton = popup.querySelector(".popup__button");

//main content
let mainContent = document.querySelector(".content");
let profileName = mainContent.querySelector(".profile__title");
let profileAbout = mainContent.querySelector(".profile__quote");

editButton.addEventListener('click', function(){
  let popupValue = popup.querySelectorAll(".popup__item");
  popupValue[0].value = profileName.textContent;
  popupValue[1].value = profileAbout.textContent;
  popup.classList.toggle("popup_opened");
});

closeButton.addEventListener('click', function(){
  popup.classList.toggle("popup_opened");
});

submitButton.addEventListener('click', profileSave);


function profileSave(evt) {
  evt.preventDefault();
  let popupValue = popup.querySelectorAll(".popup__item");
  profileName.textContent = popupValue[0].value;
  profileAbout.textContent = popupValue[1].value;
  popup.classList.toggle("popup_opened");
}
