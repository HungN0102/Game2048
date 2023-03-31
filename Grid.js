const GRID_SIZE = 4;
const CELL_SIZE = 15;
const CELL_GAP = 2;

export default class Grid {
    #cells
    #points

    constructor(gridElement) {
        gridElement.style.setProperty("--grid_size",GRID_SIZE)
        gridElement.style.setProperty('--cell_size',`${CELL_SIZE}vmin`)
        gridElement.style.setProperty('--grid_gap',`${CELL_GAP}vmin`)
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

    get points() {
        return this.#cells.reduce((aggregate, cell) => {
            return aggregate + cell.points
        }, 0)
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

    resetBoard() {
        return this.cells.forEach(cell => {
            cell.removeTile()
            cell.points = 0
        })
    }
}

class Cell {
    #cellElement
    #x
    #y
    #tile
    #mergeTile
    #points 

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x 
        this.#y = y 
        this.#points = 0
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

    get points() {
        return this.#points
    }

    set points(p) {
        this.#points = p
    }

    set addPoints(p) {
        this.#points = this.#points + p
    }

    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value 
        this.mergeTile.remove()
        this.mergeTile = null
        this.addPoints = this.tile.value
    }

    canAccept(tile) {
        return (this.tile == null) || (this.mergeTile == null && tile.value == this.tile.value)
    }

    removeTile() {
        if (this.tile == null) return
        this.tile.remove()
        this.tile = null
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