export default class FormValidator {
    constructor(config) {
        this._config = config;
    }

    setEventListeners(el) {
        const inputFields = Array.from(el.querySelectorAll(this._config.modalInputField));
        const button = el.querySelector(this._config.modalButtonSubmit);
        this.toggleButtonState(inputFields,button);
        el.addEventListener('reset', () => {
            setTimeout(() => {
                this.toggleButtonState(inputFields,button);
            }, 0);
        });
        inputFields.forEach((inputField) => {
            inputField.addEventListener('input', () => {
                this.isValid(el,inputField);
                this.toggleButtonState(inputFields,button);
            });
        });
    };

    toggleButtonState (inputFields,button) {
        if (this.hasInvalidInput(inputFields)) {
            button.classList.remove(this._config.modalButtonSubmitActive);
            button.classList.add(this._config.modalButtonSubmitDisabled);
            button.setAttribute('disabled', true);
        } else {
            button.classList.add(this._config.modalButtonSubmitActive);
            button.classList.remove(this._config.modalButtonSubmitDisabled);
            button.removeAttribute('disabled');
        }
    };

    hasInvalidInput(inputFields) {
        return inputFields.some((inputField) => {
            if (inputField.value.length === 0) return true;
            return inputField.classList.contains(this._config.modalInputError);
        });
    };

    isValid(el,inputField) {
        if (inputField.validity.patternMismatch) {
            this.showInputError(el,inputField.dataset.invalidMessage,inputField);
        }
        else if (!inputField.validity.valid) {
            this.showInputError(el,inputField.validationMessage,inputField);
        } else {
            this.hideInputError(el,inputField);
        }
    };

    showInputError(el,invalidMessage,inputField) {
        const errorElement = el.querySelector(`.popup__item-${inputField.name}`);
        inputField.classList.add(this._config.modalInputError);
        errorElement.textContent = invalidMessage;
        errorElement.classList.add(this._config.modalInvalidMessageShow);
    };

    hideInputError(el,inputField) {
        const errorElement = el.querySelector(`.popup__item-${inputField.name}`);
        inputField.classList.remove(this._config.modalInputError);
        errorElement.classList.remove(this._config.modalInvalidMessageShow);
    };
}