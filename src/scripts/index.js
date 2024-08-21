import { createCard, delCard, likeCard } from "../components/card.js";

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

const popupEditButtonOpen = document.querySelector(".profile__edit-button");
const popupNewCardButtonOpen = document.querySelector(".profile__add-button");
const popupDelCardButtonOpen = document.querySelector(".card__delete-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAvatarUpdate = document.querySelector(".popup_type_update-avatar");
const popupDelCardQuestion = document.querySelector(".popup_type_question");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupZoom = document.querySelector(".popup_type_image");

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
      delCard,
      likeCard,
      handleOpenPopupZoom,
      cardData.owner._id,
      currentUserId,
      (cardElement, delCardFunction) => {
        // Открываю попап с вопросом об удалении карточки
        openPopup(popupDelCardQuestion);
      }
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

//запрос на сервер для получения обьекта с первоначальными данными пользователя
function getInitialUser() {
  return fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/users/me", {
    headers: {
      authorization: "adfb87df-3032-40f6-8edf-de055a5b3295",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}

// Функция для обновления информации профиля
function updateProfileInfo(name, about, avatar) {
  profileInfoTitle.textContent = name;
  profileInfoDescription.textContent = about;
  profileAvatarImg.style.backgroundImage = `url('${avatar}')`;
}

//запрос на сервер для получения массива обьектов с данными карточек других пользователей
function getCardsDescription() {
  return fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/cards", {
    headers: {
      authorization: "adfb87df-3032-40f6-8edf-de055a5b3295",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
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

// Функция для обновления профиля на сервере
function renameUserData(name, about) {
  return fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/users/me", {
    method: "PATCH",
    headers: {
      authorization: "adfb87df-3032-40f6-8edf-de055a5b3295",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Профиль обновлен:", data);
      return data;
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
}

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

function createNewCard(evt) {
  evt.preventDefault();

  // Получаем значения полей
  const cardImg = popupInputNewCardImg.value;
  const cardTitle = popupInputNewCardTitle.value;

  // Отправляем POST-запрос на сервер для создания новой карточки
  fetch("https://mesto.nomoreparties.co./v1/wff-cohort-21/cards", {
    method: "POST",
    headers: {
      authorization: "adfb87df-3032-40f6-8edf-de055a5b3295",
      "Content-Type": "application/json",
    },
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
        delCard,
        likeCard,
        handleOpenPopupZoom
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
    });
}

// Токен: adfb87df-3032-40f6-8edf-de055a5b3295
// Идентификатор группы: wff-cohort-21

// Задать вопрос наставнику на Q&A

//1 getCardsDescription().then(cardsData => {
//   addCard(cardsData);
// }
// );

// вот так работает, а так нет

// function getCardsData() {
//   const cardsDataArray = getCardsDescription;

// addCard(cardsDataArray);

// }

// // Вызов функции для загрузки и отображения карточек
// getCardsData();

// почему!??!

//2 Как изменить запятую на точку в ответе сервера? развемы можем менять данные ответа?
