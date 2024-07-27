import { initialCards } from './cards.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Функция удаления карточки

function delCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Функция создания карточки

function createCard(img, title, functionDelCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelCard = cardElement.querySelector(".card__delete-button");
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = img;
  cardImg.alt = title;
  cardTitle.textContent = title;

  buttonDelCard.addEventListener("click", functionDelCard);

  return cardElement;
}

// @todo: Вывести карточки на страницу

function addCard(cardsDataArray) {
  cardsDataArray.forEach((cardData) => {
    const cardImg = cardData.link;
    const cardTitle = cardData.name;

    const card = createCard(cardImg, cardTitle, delCard);
    cardsContainer.append(card);
  });
}

addCard(initialCards);