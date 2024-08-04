import {
  popupZoom,
  nameInput,
  jobInput,
  profileInfoTitle,
  profileInfoDescription,
  popupEdit,
  popupNewCard,
} from "../scripts/index.js";

// функция открытия/закрытия попапа
export function popupToggle(popup) {
  popup.classList.toggle("popup_is-opened");
}

// функция закрытия попапа нажатием на крестик
export function closePopup() {
  const popupList = document.querySelectorAll(".popup");
  const popupBtnCloseList = document.querySelectorAll(".popup__close");

  popupBtnCloseList.forEach((popupBtn, index) => {
    popupBtn.addEventListener("click", () => {
      popupToggle(popupList[index]);
    });
  });
}

// функция закрытия попапа нажатием на оверлей
export function closePopupOverlay() {
  const popupList = Array.from(document.querySelectorAll(".popup"));

  popupList.forEach((popupItem) => {
    popupItem.addEventListener("mousedown", (event) => {
      if (event.target === event.currentTarget) {
        popupToggle(popupItem);
      }
    });
  });
}

// функция закрытия попапа нажатием на Esc
export function closePopupEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    popupToggle(popupOpened);
  }
}

//функция открытия попапа редактирования
export function popupEditOpen() {
  nameInput.value = profileInfoTitle.textContent;
  jobInput.value = profileInfoDescription.textContent;

  nameInput.textContent = profileInfoTitle.value;
  jobInput.textContent = profileInfoDescription.value;
  popupToggle(popupEdit);
}

//функция открытия попапа просмотра фото
export function popupZoomOpen(imageSrc, titleText) {
  const popupZoomImg = document.querySelector(".popup__image");
  const popupZoomTitle = document.querySelector(".popup__caption");

  popupZoomImg.src = imageSrc;
  popupZoomTitle.textContent = titleText;

  popupToggle(popupZoom);
}

// Обработчик изменения данных профиль и «отправки» формы, хотя пока
// она никуда отправляться не будет
export function handleFormSubmit(evt) {
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

//функция открытия попапа создания новой карточки
export function popupNewCardOpen() {
  popupToggle(popupNewCard);
}
