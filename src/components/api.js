export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "adfb87df-3032-40f6-8edf-de055a5b3295",
    "Content-Type": "application/json",
  },
};

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

//запрос на сервер для получения обьекта с первоначальными данными пользователя
export const getInitialUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
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
};

//запрос на сервер для получения массива обьектов с данными карточек других пользователей
export const getCardsDescription = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
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
};

// Функция для обновления профиля на сервере
export const renameUserData = (name, about) => {
  renderLoading(true);

  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
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
    })
    .finally(() => {
      renderLoading(false);
    });
};

//запрос на сервер для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

//запрос на сервер для установки лайка
export const addLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

//запрос на сервер для удаления лайка
export const delLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

//запрос на сервер с данными нового аватара
export const changeAvatar = (avatar) => {
  renderLoading(true);

  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

//функция проверки действительности и URL изображения
export const checkImageUrl = (url) => {
  return fetch(url, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }

      // Проверка на url
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.startsWith("image/")) {
        return true;
      } else {
        return Promise.reject("Ошибка: Это не url");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
};
