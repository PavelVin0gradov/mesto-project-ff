import { initialCards } from "./cards.js";

import {
  createCard,
  delCard,
  cardLike,
  createNewCard,
} from "../components/card.js";

import {
  closePopup,
  closePopupOverlay,
  closePopupEsc,
  popupEditOpen,
  popupZoomOpen,
  handleFormSubmit,
  popupNewCardOpen,
} from "../components/modal.js";

const popupEditButtonOpen = document.querySelector(".profile__edit-button");
const popupNewCardButtonOpen = document.querySelector(".profile__add-button");

export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupZoom = document.querySelector(".popup_type_image");

export const profileInfoTitle = document.querySelector(".profile__title");
export const profileInfoDescription = document.querySelector(
  ".profile__description"
);

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formCreateNC = document.forms.newplace;

// Находим поля формы в DOM
export const nameInput = formElement.querySelector(".popup__input_type_name");
export const jobInput = formElement.querySelector(
  ".popup__input_type_description"
);

// @todo: Темплейт карточки

export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

export const cardsContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

function addCard(cardsDataArray) {
  cardsDataArray.forEach((cardData) => {
    const cardImg = cardData.link;
    const cardTitle = cardData.name;

    const card = createCard(cardImg, cardTitle, delCard, cardLike);
    cardsContainer.append(card);
  });
}

addCard(initialCards);

//слушатель закрытия попапа нажатием на Esc
document.addEventListener("keydown", closePopupEsc);

//вызов функции закрытия попапа нажатием на оверлей
closePopupOverlay();

//слушатель закрытия попапа нажатием на крестик
closePopup();

//слушатель открытия попапа редактирования
popupEditButtonOpen.addEventListener("click", popupEditOpen);

//слушатель открытия попапа создания новой карточки
popupNewCardButtonOpen.addEventListener("click", popupNewCardOpen);

//слушатель создания новой карточки
formCreateNC.addEventListener("submit", createNewCard);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const cardsImgZone = document.querySelectorAll(".card__image");

//слушатель открытия попапа просмотра фото
cardsImgZone.forEach((cardImg) => {
  cardImg.addEventListener("click", () => {
    const card = cardImg.closest(".card");
    const cardTitle = card.querySelector(".card__title").textContent;
    popupZoomOpen(cardImg.src, cardTitle);
  });
});
