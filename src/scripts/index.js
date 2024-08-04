import { initialCards } from "./cards.js";

const popupEditButtonOpen = document.querySelector(".profile__edit-button");
const popupNewCardButtonOpen = document.querySelector(".profile__add-button");

const popupButtonCreateNC = document.querySelector(".popup__button_create-NC");



const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupZoom = document.querySelector(".popup_type_image");



const profileInfoTitle = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formCreateNC = document.forms.newplace;

// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Функция удаления карточки

function delCard(evt) {
  evt.target.closest(".card").remove();
}

//лайк карточки
// cardsContainer.addEventListener('click',
function cardLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

// @todo: Функция создания карточки

function createCard(img, title, functionDelCard, functionLikeCard) {
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

// функция открытия/закрытия попапа
function popupToggle(popup) {
  popup.classList.toggle("popup_is-opened");
}

// функция закрытия попапа нажатием на Esc
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_is-opened');
      popupToggle(popupOpened)
    }
  })

// функция закрытия попапа нажатием на оверлей
function closePopupOverlay() {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach((popupItem) => {
    popupItem.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        popupToggle(popupItem);
      }
    })
  })
}

closePopupOverlay();

// функция закрытия попапа нажатием на крестик
function closePopup() {
  const popupList = document.querySelectorAll('.popup');
  const popupBtnCloseList = document.querySelectorAll('.popup__close');

  popupBtnCloseList.forEach((popupBtn, index) => {
    popupBtn.addEventListener('click', () => {
      popupToggle(popupList[index]);
    });
  })
}

  closePopup();

//функция открытия попапа редактирования
function popupEditOpen() {
  nameInput.value = profileInfoTitle.textContent;
  jobInput.value = profileInfoDescription.textContent;

  nameInput.textContent = profileInfoTitle.value;
  jobInput.textContent = profileInfoDescription.value;
  popupToggle(popupEdit);
}

popupEditButtonOpen.addEventListener("click", popupEditOpen);
popupNewCardButtonOpen.addEventListener("click", popupNewCardOpen);

//функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  //значение поля название
  //значение поля ссылка на картинку
  //значение кнопки сохранить - отрисовать новую карточку
  const popupInputNewCardTitle = document.querySelector(".popup__input_type_card-name");
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

formCreateNC.addEventListener("submit", createNewCard);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileInfoTitle.textContent = nameInputValue;
  profileInfoDescription.textContent = jobInputValue;
  popupToggle(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//функция открытия попапа создания новой карточки
function popupNewCardOpen() {
  popupToggle(popupNewCard);
}

//функция открытия попапа просмотра фото
function popupZoomOpen(imageSrc, titleText) {
  const popupZoomImg = document.querySelector(".popup__image");
  const popupZoomTitle = document.querySelector(".popup__caption");

  popupZoomImg.src = imageSrc;
  popupZoomTitle.textContent = titleText;

  popupToggle(popupZoom);
}

const cardsImgZone = document.querySelectorAll(".card__image");
cardsImgZone.forEach((cardImg) => {
  cardImg.addEventListener("click", () => {
    const card = cardImg.closest('.card');
    const cardTitle = card.querySelector(".card__title").textContent;
    popupZoomOpen(cardImg.src, cardTitle);
  });
});
