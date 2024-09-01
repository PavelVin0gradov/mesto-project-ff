import { createCard, delCard, likeCard } from "../components/card.js";

import {
  config,
  getInitialUser,
  getCardsDescription,
  renameUserData,
  deleteCard,
  addLikeCard,
  delLikeCard,
  changeAvatar,
  checkImageUrl,
} from "../components/api.js";

import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "../components/validation.js";

import {
  openPopup,
  closePopup,
  closePopupOverlay,
} from "../components/modal.js";

let currentCardElement = null; // Переменная для хранения текущей карточки

const popupEditButtonOpen = document.querySelector(".profile__edit-button");
const popupNewCardButtonOpen = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAvatarUpdate = document.querySelector(".popup_type_update-avatar");
const popupDelCardQuestion = document.querySelector(".popup_type_question");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupZoom = document.querySelector(".popup_type_image");

const updateAvatarForm = document.querySelector(
  ".popup__form_type_update-avatar"
);

const popupZoomImg = document.querySelector(".popup__image");
const popupZoomTitle = document.querySelector(".popup__caption");

const popupInputNewCardTitle = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputNewCardImg = document.querySelector(".popup__input_type_url");

const profileAvatarImg = document.querySelector(".profile__image");
const profileInfoTitle = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formCreateNC = document.forms.newplace;

// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const avatarInput = document.querySelector(".popup__input_type_update-avatar");

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

// Функция добавления карточки на страницу
function addCard(cardsDataArray, currentUserId) {
  cardsDataArray.forEach((cardData) => {
    const cardImg = cardData.link;
    const cardTitle = cardData.name;

    const card = createCard(
      cardImg,
      cardTitle,
      handleOpenDeletePopup,
      handleLikeCard,
      handleOpenPopupZoom,
      cardData,
      currentUserId
    );
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
}

// добавления слушателей и функции закрытия нажатием на крестик
function addListenersclosePopup() {
  const popupList = document.querySelectorAll(".popup");
  const popupBtnCloseList = document.querySelectorAll(".popup__close");

  popupBtnCloseList.forEach((popupBtn, index) => {
    popupBtn.addEventListener("click", () => {
      closePopup(popupList[index]);
    });
  });
}

// добавления слушателей и функции закрытия попапа нажатием на оверлей
function addListenersclosePopupOverlay() {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popupItem) => {
    popupItem.addEventListener("mousedown", closePopupOverlay);
  });
}

//функция открытия попапа редактирования
function openPopupEdit() {
  nameInput.value = profileInfoTitle.textContent;
  jobInput.value = profileInfoDescription.textContent;

  nameInput.textContent = profileInfoTitle.value;
  jobInput.textContent = profileInfoDescription.value;
  clearValidation(formElement, validationConfig);
  openPopup(popupEdit);
}

//функция открытия попапа создания новой карточки
function openPopupNewCard() {
  popupInputNewCardImg.value = "";
  popupInputNewCardTitle.value = "";
  clearValidation(formCreateNC, validationConfig);
  openPopup(popupNewCard);
}

//слушатель открытия попапа редактирования
popupEditButtonOpen.addEventListener("click", openPopupEdit);

//слушатель открытия попапа смены аватара
profileAvatarImg.addEventListener("click", () => openPopup(popupAvatarUpdate));

//слушатель открытия попапа создания новой карточки
popupNewCardButtonOpen.addEventListener("click", openPopupNewCard);

//слушатель создания новой карточки
formCreateNC.addEventListener("submit", createNewCard);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleEditFormSubmit);

//добавление слушателей закрытия попапа нажатием на крестик
addListenersclosePopup();

//вызов функции закрытия попапа нажатием на оверлей
addListenersclosePopupOverlay();

// Вызовем функцию
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);

//спиннер
function renderLoading(isLoading) {
  const textBtnSave = document.querySelector(".popup__button_text");
  const textBtnSaveLoading = document.querySelector(
    ".popup__button_text-loading"
  );

  if (isLoading) {
    textBtnSaveLoading.classList.add("popup__button_text_loading-visible");
    textBtnSave.classList.add("popup__button_text-hidden");
  } else {
    textBtnSaveLoading.classList.remove("popup__button_text_loading-visible");
    textBtnSave.classList.remove("popup__button_text-hidden");
  }
}

// Функция для обновления информации профиля
function updateProfileInfo(name, about, avatar) {
  profileInfoTitle.textContent = name;
  profileInfoDescription.textContent = about;
  profileAvatarImg.style.backgroundImage = `url('${avatar}')`;
}

Promise.all([getInitialUser(), getCardsDescription()])
  .then(([dataUser, dataCards]) => {
    const currentUserId = dataUser._id; //мой id

    // Обновляем информацию о пользователе
    updateProfileInfo(dataUser.name, dataUser.about, dataUser.avatar);
    addCard(dataCards, currentUserId);
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчик изменения данных профиль и «отправки» формы
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  renameUserData(nameInputValue, jobInputValue).then((updatedData) => {
    // Обновление DOM с новыми данными профиля
    profileInfoTitle.textContent = updatedData.name;
    profileInfoDescription.textContent = updatedData.about;
  });
  closePopup(popupEdit);
}

//функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();

  // Получаем значения полей
  const cardImg = popupInputNewCardImg.value;
  const cardTitle = popupInputNewCardTitle.value;

  renderLoading(true);

  // Отправляем POST-запрос на сервер для создания новой карточки
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardTitle,
      link: cardImg,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .then((newCardData) => {
      // Создаем карточку с использованием данных из ответа сервера
      const card = createCard(
        newCardData.link,
        newCardData.name,
        handleOpenDeletePopup,
        handleLikeCard,
        handleOpenPopupZoom,
        newCardData,
        newCardData.owner._id
      );

      // Добавляем карточку в контейнер
      cardsContainer.prepend(card);

      // Обнуляем поля ввода
      popupInputNewCardImg.value = "";
      popupInputNewCardTitle.value = "";
      clearValidation(formCreateNC, validationConfig);

      // Закрываем попап после добавления карточки
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки на сервер:", err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

//функция обработчик открытия попапа подтверждения удаления
function handleOpenDeletePopup(cardElement, cardId) {
  currentCardElement = { element: cardElement, id: cardId };
  openPopup(popupDelCardQuestion); // Открываем попап подтверждения
}

//функция обработчик удаления карточки
function handleDeleteCardSubmit(evt) {
  evt.preventDefault(); // Предотвращаем стандартную отправку формы

  if (currentCardElement) {
    deleteCard(currentCardElement.id)
      .then(() => {
        currentCardElement.element.remove(); // Удаляем карточку из DOM
        closePopup(popupDelCardQuestion); // Закрываем попап после успешного удаления
      })
      .catch((err) => {
        console.error(`Ошибка при удалении карточки: ${err}`);
      });
  }
}

// Слушатель на подтверждение удаления карточки
popupDelCardQuestion.addEventListener("submit", handleDeleteCardSubmit);

//функция обработчик установки/удаления лайка
function handleLikeCard(cardElement, cardId, isLiked) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-number");

  if (isLiked) {
    delLikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при удалении лайка: ${err}`);
      });
  } else {
    addLikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error(`Ошибка при добавлении лайка: ${err}`);
      });
  }
}

//функция обработчик смены аватара
function handleAvatarChange(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const avatarInputValue = avatarInput.value;

  // Проверяем URL перед обновлением аватара
  checkImageUrl(avatarInputValue).then((isValid) => {
    if (isValid) {
      changeAvatar(avatarInputValue).then((updatedData) => {
        profileAvatarImg.style.backgroundImage = `url('${updatedData.avatar}`;

        avatarInput.value = "";
        closePopup(popupAvatarUpdate);
      });
    } else {
      console.error("Указанный URL-адрес не является допустимым.");
    }
  });
}

updateAvatarForm.addEventListener("submit", handleAvatarChange);
