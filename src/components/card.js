import {
  cardTemplate,
  cardsContainer,
  popupNewCard,
} from "../scripts/index.js";
import { popupToggle } from "../components/modal.js";

// @todo: Функция создания карточки

export function createCard(img, title, functionDelCard, functionLikeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelCard = cardElement.querySelector(".card__delete-button");
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = img;
  cardImg.alt = title;
  cardTitle.textContent = title;

  buttonDelCard.addEventListener("click", functionDelCard);
  cardsContainer.addEventListener("click", functionLikeCard);

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

//функция создания новой карточки
export function createNewCard(evt) {
  evt.preventDefault();
  //значение поля название
  //значение поля ссылка на картинку
  //значение кнопки сохранить - отрисовать новую карточку
  const popupInputNewCardTitle = document.querySelector(
    ".popup__input_type_card-name"
  );
  const popupInputNewCardImg = document.querySelector(".popup__input_type_url");

  const cardImg = popupInputNewCardImg.value;
  const cardTitle = popupInputNewCardTitle.value;

  //вешаем слушатель при нажатии на кнопку сохранить, берем эти значения и передаем функции
  //создания createCard(img, title, functionDelCard)

  const card = createCard(cardImg, cardTitle, delCard, cardLike);
  cardsContainer.prepend(card);

  //обнуляем импуты
  popupInputNewCardImg.value = "";
  popupInputNewCardTitle.value = "";
  popupToggle(popupNewCard);
}
