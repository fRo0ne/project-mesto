// закрываем попап
export function closePopup(popup) {
    popup.classList.remove('popup_opened');  
    document.removeEventListener('keydown', closeByEscape);  
}

// открываем попап
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if(openedPopup) closePopup(openedPopup);
    }
}

