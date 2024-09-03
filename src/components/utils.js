import { closePopup } from "./modal.js";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// универсальная функция управления текстом кнопки
export function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();
  //находим ближайший к форме попап
  const popup = evt.target.closest(".popup_is-opened");
  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  return (
    request()
      .then(() => {
        // любую форму нужно очищать после успешного ответа от сервера
        // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
        evt.target.reset();
        closePopup(popup) //закрываем попап после успешного ответа (я думал нельзя в utils что либо импортировать,
        // чтобы не было жесткой связки)
      })
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      })
  );
}
