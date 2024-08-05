// функция открытия попапа
export function popupOpen(popup) {
  popup.classList.add("popup_is-opened");
}

// функция закрытия попапа
export function popupClose(popup) {
  popup.classList.remove("popup_is-opened");
}

// функция закрытия попапа нажатием на оверлей
export function closePopupOverlay(event) {
      if (event.target === event.currentTarget) {
        popupClose(event.currentTarget);
      }
    };

// функция закрытия попапа нажатием на Esc
export function closePopupEsc(event) {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    document.removeEventListener("keydown", closePopupEsc);
    popupClose(popupOpened);
  }
}