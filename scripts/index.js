// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardContainer = document.querySelector(".places__list");

// @todo: Функция удаления карточки

function delCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Функция создания карточки

function addCard(img, title) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelCard = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = img;
  cardElement.querySelector(".card__title").textContent = title;

  buttonDelCard.addEventListener("click", delCard);

  cardContainer.append(cardElement);
}

// @todo: Вывести карточки на страницу

initialCards.forEach((cardData) => {
  const cardImg = cardData.link;
  const cardTitle = cardData.name;

  addCard(cardImg, cardTitle);
});
