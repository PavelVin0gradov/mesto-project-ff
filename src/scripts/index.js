import { initialCards } from "./cards.js";

import {
  createCard,
  delCard,
  likeCard,
} from "../components/card.js";

import {
  openPopup,
  closePopap,
  closePopupOverlay,
} from "../components/modal.js";

const popupEditButtonOpen = document.querySelector(".profile__edit-button");
const popupNewCardButtonOpen = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupZoom = document.querySelector(".popup_type_image");

const popupZoomImg = document.querySelector(".popup__image");
const popupZoomTitle = document.querySelector(".popup__caption");

const popupInputNewCardTitle = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputNewCardImg = document.querySelector(".popup__input_type_url");

const profileInfoTitle = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(
  ".profile__description"
);

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formCreateNC = document.forms.newplace;

// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

function addCard(cardsDataArray) {
  cardsDataArray.forEach((cardData) => {
    const cardImg = cardData.link;
    const cardTitle = cardData.name;

    const card = createCard(cardImg, cardTitle, delCard, likeCard, handleOpenPopupZoom);
    cardsContainer.append(card);
  });
}

//функция открытия попапа просмотра фото
function openPopupZoom(imageSrc, titleText) {

  popupZoomImg.src = imageSrc;
  popupZoomImg.alt = titleText;
  popupZoomTitle.textContent = titleText;

  openPopup(popupZoom);
}

//Обработчик открытия попапа увеличения фото
function handleOpenPopupZoom(event) {

  const cardImg = event.target;

  const card = cardImg.closest(".card");
  const cardTitle = card.querySelector(".card__title").textContent;

  openPopupZoom(cardImg.src, cardTitle);
};

//функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  //значение поля название
  //значение поля ссылка на картинку
  //значение кнопки сохранить - отрисовать новую карточку
  const cardImg = popupInputNewCardImg.value;
  const cardTitle = popupInputNewCardTitle.value;

  //вешаем слушатель при нажатии на кнопку сохранить, берем эти значения и передаем функции
  //создания createCard(img, title, functionDelCard)

  const card = createCard(cardImg, cardTitle, delCard, likeCard, handleOpenPopupZoom);
  cardsContainer.prepend(card);

  //обнуляем импуты
  popupInputNewCardImg.value = "";
  popupInputNewCardTitle.value = "";

  closePopap(popupNewCard);
}

// добавления слушателей и функции закрытия нажатием на крестик
function addListenersclosePopup() {
  const popupList = document.querySelectorAll(".popup");
  const popupBtnCloseList = document.querySelectorAll(".popup__close");

  popupBtnCloseList.forEach((popupBtn, index) => {
    popupBtn.addEventListener("click", () => {
      closePopap(popupList[index]);
    });
  });
}

// добавления слушателей и функции закрытия попапа нажатием на оверлей
function addListenersclosePopupOverlay() {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popupItem) => {
    popupItem.addEventListener("mousedown", closePopupOverlay)
  })
};

//функция открытия попапа редактирования
function openPopupEdit() {
  nameInput.value = profileInfoTitle.textContent;
  jobInput.value = profileInfoDescription.textContent;

  nameInput.textContent = profileInfoTitle.value;
  jobInput.textContent = profileInfoDescription.value;
  openPopup(popupEdit);
}

// Обработчик изменения данных профиль и «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileInfoTitle.textContent = nameInputValue;
  profileInfoDescription.textContent = jobInputValue;
  closePopap(popupEdit);
}

//функция открытия попапа создания новой карточки
function openPopupNewCard() {
  openPopup(popupNewCard);
}

//слушатель открытия попапа редактирования
popupEditButtonOpen.addEventListener("click", openPopupEdit);

//слушатель открытия попапа создания новой карточки
popupNewCardButtonOpen.addEventListener("click", openPopupNewCard);

//слушатель создания новой карточки
formCreateNC.addEventListener("submit", createNewCard);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleEditFormSubmit);

//добавление слушателей закрытия попапа нажатием на крестик
addListenersclosePopup();

addCard(initialCards);

//вызов функции закрытия попапа нажатием на оверлей
addListenersclosePopupOverlay();