import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, {form, handler, button, modal}) {
        super(popup);
        this._submitForm = handler;
        this._form = form;
        this._button = button;
        this._modal = modal;
        this._inputList = Array.from(this._form.elements);
        this._button.addEventListener('click', this._modal);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((el) => {
            this._formValues[el.name] = el;
        });
        return this._formValues;
    }
    
    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', this._submitFormAction);
    }

    removeEventListener() {
        super.removeEventListener();
        this._form.removeEventListener('submit', this._submitFormAction);
    }

    _submitFormAction = (evt) => {
        this._submitForm(evt, this._getInputValues());
    }


}