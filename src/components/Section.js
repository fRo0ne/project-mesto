export default class Section {
    constructor({items, renderer}, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    addItem(element, action = 'prepend') {
        this._container[action](element);
    }
    renderItems() {
        if(Array.isArray(this._items)) {
            this._items.forEach(element => {
                this._renderer(element);
            });
            return;
        }
        this._renderer(this._items);
    }
}