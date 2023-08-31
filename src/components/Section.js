export default class Section {
    #renderer;
    #section;

    constructor({renderer}, sectionSelector) {
        this.#renderer = renderer;
        this.#section = document.querySelector(sectionSelector);
    }

    renderCarts(carts) {
        carts.forEach(cart => {
            this.#renderer(cart)
        })
    }

    addCartToDom(cart, placement) {
        switch(placement) {
            case 'append':
                this.#section.append(cart);
                break;
            case 'prepend':
                this.#section.prepend(cart);
                break;
            default: console.log(`Ошибка, не валидная позиция при добавлении в разметку карточки`);
        }
    }
}