import { checkResponse } from "./utils.js";

export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "adfb87df-3032-40f6-8edf-de055a5b3295",
    "Content-Type": "application/json",
  },
};

// Универсальная функция запроса с проверкой ответа
export const request = (endpoint, options = {}) => {
  // базовый URL и конечный
  const url = `${config.baseUrl}${endpoint}`;

  const headers = {
    ...config.headers,
    ...options.headers,
  };

  // Выполняем запрос и проверяем ответ
  return fetch(url, {
    ...options,
    headers,
  }).then(checkResponse);
};

//запрос на сервер для получения обьекта с первоначальными данными пользователя
export const getInitialUser = () => {
  return request("/users/me").then((result) => {
    console.log(result);
    return result;
  });
};

//запрос на сервер для получения массива обьектов с данными карточек других пользователей
export const getCardsDescription = () => {
  return request("/cards").then((result) => {
    console.log(result);
    return result;
  });
};

// Функция для обновления профиля на сервере
export const renameUserData = (name, about) => {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((data) => {
    console.log("Профиль обновлен:", data);
    return data;
  });
};

//запрос на сервер для удаления карточки
export const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
};

//запрос на сервер для установки лайка
export const addLikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
  });
};

//запрос на сервер для удаления лайка
export const delLikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
  });
};

//запрос на сервер с данными нового аватара
export const changeAvatar = (avatar) => {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
};

// //запрос на сервер для создания новой карточки
export const createNewCard = (cardTitle, cardImg) => {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify({
      name: cardTitle,
      link: cardImg,
    }),
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
