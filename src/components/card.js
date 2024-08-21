// @todo: Функция создания карточки

export function createCard(img, title, functionDelCard, functionLikeCard, handlerOpenPopupZoom, cardOwnerId, currentUserId, handleOpenDeletePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsContainer = document.querySelector(".places__list");
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelCard = cardElement.querySelector(".card__delete-button");
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = img;
  cardImg.alt = title;
  cardTitle.textContent = title;

  // проверка на владельца карточки
  if (cardOwnerId !== currentUserId) {
    buttonDelCard.remove(); // Удаляем кнопку, если карточка создана не текущим пользователем
  } else {
    buttonDelCard.addEventListener("click", () => handleOpenDeletePopup(cardElement, functionDelCard)); // Вешаем событие только на свои карточки
  }

  cardsContainer.addEventListener("click", functionLikeCard);
  cardImg.addEventListener("click", handlerOpenPopupZoom);

  return cardElement;
}

// @todo: Функция удаления карточки

export function delCard(evt) {
  evt.target.closest(".card").remove();
}

//лайк карточки
export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
