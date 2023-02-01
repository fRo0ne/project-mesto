// напишу общий обработчик сабмита, так как он мне нужен будет дальше при работе с API
export function handleSubmit(evt, buttonTextRequest = "Сохранение...") {
    evt.preventDefault();
    // деактивируем кнопку сабмита по событию 'reset'
    evt.target.reset();
}
