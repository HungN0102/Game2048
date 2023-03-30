const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 1;

export default class Grid {
    #cells

    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size",GRID_SIZE)
        gridElement.style.setProperty('--cell-size',`${CELL_SIZE}vmin`)
        gridElement.style.setProperty('--cell-gap',`${CELL_GAP}vmin`)
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % GRID_SIZE,
                Math.floor(index / GRID_SIZE)
            )
        })
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell 
            return cellGrid
        }, [])
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell 
            return cellGrid
        }, [])
    }


    get cells() {
        return this.#cells
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null)
    }

    randomEmptyCell() {
        return this.#emptyCells[Math.floor(Math.random()*this.#emptyCells.length)]
    }
}

class Cell {
    #cellElement
    #x
    #y
    #tile
    #mergeTile 

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x 
        this.#y = y 
    }

    get tile() {
        return this.#tile
    }

    get x() {
        return this.#x
    }
    
    get y() {
        return this.#y
    }

    get mergeTile() {
        return this.#mergeTile
    }

    set mergeTile(node) {
        this.#mergeTile = node
        if (node === null) return
        this.#mergeTile.x = this.#x
        this.#mergeTile.y = this.#y
    }

    set tile(node) {
        this.#tile = node
        if (node == null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value 
        this.mergeTile.remove()
        this.mergeTile = null
    }

    canAccept(tile) {
        return (this.tile == null) || (this.mergeTile == null && tile.value == this.tile.value)
    }
}

function createCellElements(gridElement) {
    const cells = []
    for (let i=0; i< GRID_SIZE*GRID_SIZE; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cells.push(cell)
        gridElement.appendChild(cell)
    }
    return cells
}