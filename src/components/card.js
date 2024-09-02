// @todo: Функция создания карточки

export function createCard({
  img,
  title,
  functionDelCard,
  handleLikeCard,
  handlerOpenPopupZoom,
  cardData,
  currentUserId,
}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelCard = cardElement.querySelector(".card__delete-button");
  const buttonLikeCard = cardElement.querySelector(".card__like-button");
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCounter = cardElement.querySelector(".card__like-number");

  cardImg.src = img;
  cardImg.alt = title;
  cardTitle.textContent = title;

  //подгружаем кол-во лайков с сервера
  likeCounter.textContent = cardData.likes.length;

  //проверяем есть ли наши лайки, если есть то красим сердце в черный
  if (cardData.likes.some((like) => like._id === currentUserId)) {
    buttonLikeCard.classList.add("card__like-button_is-active");
  }

  // проверка на владельца карточки
  if (cardData.owner._id !== currentUserId) {
    buttonDelCard.remove(); // Удаляем кнопку, если карточка создана не нами
  } else {
    // Вешаем событие только на свои карточки
    buttonDelCard.addEventListener("click", () =>
      functionDelCard(cardElement, cardData._id)
    );
  }

  buttonLikeCard.addEventListener("click", () => {
    const isLiked = buttonLikeCard.classList.contains(
      "card__like-button_is-active"
    );
    handleLikeCard(cardElement, cardData._id, isLiked);
  });
  cardImg.addEventListener("click", handlerOpenPopupZoom);

  return cardElement;
}

// @todo: Функция удаления карточки

// export function delCard(evt) {
//   evt.target.closest(".card").remove();
// }

//лайк карточки
// export function likeCard(evt) {
//   if (evt.target.classList.contains("card__like-button")) {
//     evt.target.classList.toggle("card__like-button_is-active");
//   }
// }
