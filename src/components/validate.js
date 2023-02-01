export const enableValidation = (config) => {
    const elementsForm = Array.from(document.querySelectorAll(config.modalForms));
    elementsForm.forEach((el) => {
        setEventListeners(el, config);
    });
};

const setEventListeners = (el, config) => {
    const inputFields = Array.from(el.querySelectorAll(config.modalInputField));
    const button = el.querySelector(config.modalButtonSubmit);
    toggleButtonState(inputFields, button, config);
    el.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputFields, button, config);
        }, 0);
    });
    inputFields.forEach((inputField) => {
        inputField.addEventListener('input', () => {
            isValid(el, inputField, config);
            toggleButtonState(inputFields, button, config);
        });
    });
};

const toggleButtonState = (inputFields, button, config) => {
    if (hasInvalidInput(inputFields, config)) {
        button.classList.remove(config.modalButtonSubmitActive);
        button.classList.add(config.modalButtonSubmitDisabled);
        button.setAttribute('disabled', true);
    } else {
        button.classList.add(config.modalButtonSubmitActive);
        button.classList.remove(config.modalButtonSubmitDisabled);
        button.removeAttribute('disabled');
    }
};

export const hasInvalidInput = (inputFields, config) => {
    return inputFields.some((inputField) => {
        if (inputField.value.length === 0) return true;
        return inputField.classList.contains(config.modalInputError)
    });
};

const isValid = (el, inputField, config) => {
    if (inputField.validity.patternMismatch) {
        showInputError(el, inputField, inputField.dataset.invalidMessage, config);
    }
    else if (!inputField.validity.valid) {
        showInputError(el, inputField, inputField.validationMessage, config);
    } else {
        hideInputError(el, inputField, config);
    }
};

export const showInputError = (el, inputField, invalidMessage, config) => {
    const errorElement = el.querySelector(`.popup__item-${inputField.name}`);
    inputField.classList.add(config.modalInputError);
    errorElement.textContent = invalidMessage;
    errorElement.classList.add(config.modalInvalidMessageShow);
};

export const hideInputError = (el, inputField, config) => {
    const errorElement = el.querySelector(`.popup__item-${inputField.name}`);
    inputField.classList.remove(config.modalInputError);
    errorElement.classList.remove(config.modalInvalidMessageShow);
};