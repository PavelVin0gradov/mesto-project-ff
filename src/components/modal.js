// функция открытия попапа
export function openPopup(popup) {
  document.addEventListener("keydown", closePopupEsc);
  popup.classList.add("popup_is-opened");
}

// функция закрытия попапа
export function closePopap(popup) {
  document.removeEventListener("keydown", closePopupEsc);
  popup.classList.remove("popup_is-opened");
}

// функция закрытия попапа нажатием на оверлей
export function closePopupOverlay(event) {
      if (event.target === event.currentTarget) {
        closePopap(event.currentTarget);
      }
    };

// функция закрытия попапа нажатием на Esc
export function closePopupEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopap(popupOpened);
  }
}