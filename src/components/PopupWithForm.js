import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, {form, handler, button, modal}) {
        super(popup);
        this._submitForm = handler;
        this._form = form;
        this._button = button;
        this._modal = modal;
    }

    _getInputValues() {
        this._formValues = {};
        Array.from(this._form.elements).forEach((el) => {
            this._formValues[el.name] = el;
        });
        return this._formValues;
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', this._submitFormAction);
        this._button.addEventListener('click', this._modal);
    }

    _submitFormAction = (evt) => {
        this._submitForm(evt, this._getInputValues());
    }


}