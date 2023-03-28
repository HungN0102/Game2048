export default class Tile {
    #tileElement
    #x
    #y
    #value

    constructor(tileContainer, value = Math.random() >= .5 ? 2:4) {
        this.#tileElement = document.createElement('div')
        this.#tileElement.classList.add('tile')
        tileContainer.appendChild('div')
        this.#value = value
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }

    get value() {
        return this.#value
    }

    set x(value) {
        this.#x = value
        this.#tileElement.style.setProperty('--x',value)
    }

    set y(value) {
        this.#y = value 
        this.#tileElement.style.setProperty('--y',value)
    }

    set value(v) {
        this.#value = v
        this.#tileElement.textContent = v
        const power = Math.log2(v)
        const backgroundLightness = 100 - power * 9
        this.#tileElement.style.setProperty(
            "--background-lightness",
            `${backgroundLightness}%`
        )
        this.#tileElement.style.setProperty(
            "--text-lightness",
            `${backgroundLightness <= 50 ? 90 : 10}%`
        )
        
    }
}