export default class FormValidator {
    constructor(config, element) {
        this._config = config;
        this._element = element;
    }

    _ebnableValidation() {
        this.setEventListeners();
    }

    setEventListeners() {
        const inputFields = Array.from(this._element.querySelectorAll(this._config.modalInputField));
        const button = this._element.querySelector(this._config.modalButtonSubmit);
        this.toggleButtonState(inputFields,button);
        this._element.addEventListener('reset', () => {
            setTimeout(() => {
                this.toggleButtonState(inputFields,button);
            }, 0);
        });
        inputFields.forEach((inputField) => {
            inputField.addEventListener('input', () => {
                this.isValid(inputField);
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

    isValid(inputField) {
        if (inputField.validity.patternMismatch) {
            this.showInputError(inputField.dataset.invalidMessage,inputField);
        }
        else if (!inputField.validity.valid) {
            this.showInputError(inputField.validationMessage,inputField);
        } else {
            this.hideInputError(inputField);
        }
    };

    showInputError(invalidMessage,inputField) {
        const errorElement = this._element.querySelector(`.popup__item-${inputField.name}`);
        inputField.classList.add(this._config.modalInputError);
        errorElement.textContent = invalidMessage;
        errorElement.classList.add(this._config.modalInvalidMessageShow);
    };

    hideInputError(inputField) {
        const errorElement = this._element.querySelector(`.popup__item-${inputField.name}`);
        inputField.classList.remove(this._config.modalInputError);
        errorElement.classList.remove(this._config.modalInvalidMessageShow);
    };
}