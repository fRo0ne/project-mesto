import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup, {src, alt}) {
        super(popup);
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._figurePopup = this._popup.querySelector('.figure__quote');
        this._urlImage = src;
        this._nameImage = alt;
    }

    _openImage() {
        this._popupPicture.src = this._urlImage;
        this._popupPicture.alt = this._nameImage;
        this._figurePopup.textContent = this._nameImage;
        super.openPopup();
    }
}