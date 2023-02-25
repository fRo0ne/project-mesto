export default class Popup {

    constructor(popup) {
        this._popup = popup;
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');  
        document.removeEventListener('keydown', this.closeByEscape);  
    }
    
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this.closeByEscape);
    }
    
    closeByEscape(evt) {
        if (evt.key === 'Escape') {
          const openedPopup = document.querySelector('.popup_opened');
          if(openedPopup) {
            this._popup = openedPopup;
            this.closePopup();
          }
        }
    }

}


