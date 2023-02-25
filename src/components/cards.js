export default class Cards {
    constructor({link, name, countLikes = 0, _id}, cardTemplate, isOwner, likeOwner, defaultApi, openedCardPopup) {
        this._link = link;
        this._name = name;
        this._countLikes = countLikes;
        this._cardId = _id;
        this._cardTemplate = cardTemplate;
        this._isOwner = isOwner;
        this._likeOwner = likeOwner;
        this._defaultApi = defaultApi;
        this._openedCardPopup = openedCardPopup;
    }

    _getTemplate() {
        return this._cardTemplate.querySelector('.card').cloneNode(true);
    }

    _setEvent() {
        this.cardDeleteButton.addEventListener('click', (evt) => {
            this._defaultApi.deleteCard(this._cardId).then(res => {
                if (res) this.deleteCardFromPage(evt.target.closest('.card'));
            }).catch(err => console.log(err));
        });
        this.cardLikeButton.addEventListener('click', () => {this.cardLikeAction()});
        this.cardImageSelector.addEventListener('click', this._openedCardPopup);
    }

    // создание карточек
    createCard() {
        this.cardElement = this._getTemplate();
        this.cardImageSelector = this.cardElement.querySelector('.card__image');
        this.cardDeleteButton = this.cardElement.querySelector('.card__delete-button');
        this.cardLikeButton = this.cardElement.querySelector('.card__like');
        this.cardLikeContent = this.cardElement.querySelector('.card__like-count');
        if (!this._isOwner) this.cardDeleteButton.remove();
        if (this._likeOwner) this.cardLikeButton.classList.add('card__like_active');
        this.cardImageSelector.id = this._cardId;
        this.cardImageSelector.src = this._link;
        this.cardImageSelector.alt = this._name;
        this.cardLikeContent.textContent = this._countLikes;
        this.cardElement.querySelector('.card__info').textContent = this._name;
        this._setEvent();
        return this.cardElement;
    }

    // удаление карточки со страницы
    deleteCardFromPage(cardElement) {
        cardElement.remove();
    }

    // action на лайки карточки
    cardLikeAction() {
        if (this.cardLikeButton.classList.contains('card__like_active')) {
            this._defaultApi.deleteLike(this.cardImageSelector.id).then(res => {
                if (res) {
                    this.cardLikeButton.classList.remove('card__like_active');
                    this.cardLikeContent.textContent = res.likes.length;
                }
            }).catch(err => console.log(err));
            return;
        }
        this._defaultApi.addLike(this.cardImageSelector.id).then(res => {
            if (res) {
                this.cardLikeButton.classList.add('card__like_active');
                this.cardLikeContent.textContent = res.likes.length;
            }
        }).catch(err => console.log(err));

    }
}