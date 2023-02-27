export function showLoading(
    loading,
    button,
    buttonText = 'Сохранить',
    loadingButtonText = 'Сохранение...') {
    switch (loading) {
        case true:
            button.textContent = loadingButtonText;
            break;
        case false:
            button.textContent = buttonText;
            break;
    }
}

// напишу общий обработчик сабмита, так как он мне нужен будет дальше при работе с API
export function handleSubmit(request, evt, buttonTextRequest = "Сохранение...") {
    evt.preventDefault();
    const button = evt.submitter;
    const firstButtonText = button.textContent;
    // показывам прогрузку
    showLoading(true, button, firstButtonText, buttonTextRequest);
    request()
      .then(() => { evt.target.reset(); }) // сбрасываем форму и возвращаем к начальному состоянию кнопки
      .catch((err) => { console.error(`Ошибка: ${err}`); })
      .finally(() => { showLoading(false, button, firstButtonText) });
}
