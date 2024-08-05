// @todo: Функция создания карточки

export function createCard(img, title, functionDelCard, functionLikeCard, handlerOpenPopupZoom) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsContainer = document.querySelector(".places__list");
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelCard = cardElement.querySelector(".card__delete-button");
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = img;
  cardImg.alt = title;
  cardTitle.textContent = title;

  buttonDelCard.addEventListener("click", functionDelCard);
  cardsContainer.addEventListener("click", functionLikeCard);
  cardImg.addEventListener("click", handlerOpenPopupZoom);

  return cardElement;
}

// @todo: Функция удаления карточки

export function delCard(evt) {
  evt.target.closest(".card").remove();
}

//лайк карточки
export function cardLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
