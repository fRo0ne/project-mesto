export default class Popup {

    constructor(popup) {
        this._popup = popup;
    }

    setEventListener() {
        this._popup.addEventListener('click', this._closeByMouse);
        this._popup.addEventListener('click', this._closeByOverlay);
        document.addEventListener('keydown', this._closeByEscape);
    }

    removeEventListener() {
        this._popup.removeEventListener('click', this._closeByMouse);
        this._popup.removeEventListener('click', this._closeByOverlay);
        document.removeEventListener('keydown', this._closeByEscape);
    }

    _closeByMouse = (evt) => {
        if (evt.target.classList.contains('popup__close')) {
            this.closePopup();
        }
    }

    _closeByOverlay = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.closePopup();
        }
    }

    _closeByEscape = (evt) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            if (openedPopup) {
                this._popup = openedPopup;
                this.closePopup();
            }
        }
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        this.removeEventListener();
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        this.setEventListener();
    }

}


