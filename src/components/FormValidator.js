export default class FormValidator {
    constructor(config, element) {
        this._config = config;
        this._element = element;
        this._inputList = Array.from(this._element.querySelectorAll(this._config.modalInputField));
        this._submitButton = this._element.querySelector(this._config.modalButtonSubmit);
    }

    _ebnableValidation() {
        this.setEventListeners();
    }

    setEventListeners() {
        this.toggleButtonState();
        this._element.addEventListener('reset', () => {
            setTimeout(() => {
                this.toggleButtonState();
            }, 0);
        });
        this._inputList.forEach((inputField) => {
            inputField.addEventListener('input', () => {
                this.isValid(inputField);
                this.toggleButtonState();
            });
        });
    };

    toggleButtonState () {
        if (this.hasInvalidInput()) {
            this._submitButton.classList.remove(this._config.modalButtonSubmitActive);
            this._submitButton.classList.add(this._config.modalButtonSubmitDisabled);
            this._submitButton.setAttribute('disabled', true);
        } else {
            this._submitButton.classList.add(this._config.modalButtonSubmitActive);
            this._submitButton.classList.remove(this._config.modalButtonSubmitDisabled);
            this._submitButton.removeAttribute('disabled');
        }
    };

    hasInvalidInput() {
        return this._inputList.some((inputField) => {
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