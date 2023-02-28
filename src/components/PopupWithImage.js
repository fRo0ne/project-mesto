import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._figurePopup = this._popup.querySelector('.figure__quote');
    }

    openPopup({src, alt}) {
        this._popupPicture.src = src;
        this._popupPicture.alt = alt;
        this._figurePopup.textContent = alt;
        super.openPopup();
    }
}