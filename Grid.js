const gridSize = 4
const gridGap = 2
const cellSize = 20

export default class Grid {
    #cells 
    constructor(gridElement) {
        gridElement.style.setProperty('--grid_size', gridSize)
        gridElement.style.setProperty('--grid_gap', `${gridGap}vmin`)
        gridElement.style.setProperty('--cell_size', `${cellSize}vmin`)
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % gridSize,
                Math.floor(index / gridSize)
            )
        })
    }

    #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null)
    }

    randomEmptyCell() {
        return this.#emptyCells()[Math.floor(Math.random()*gridSize*gridSize)]
    }

    cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell 
            return cellGrid
        }, [])
    }

    cellsByRow() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell 
            return cellGrid
        }, [])
    }
}

class Cell {
    #cellElement
    #x
    #y
    #tile

    get x() {
        return this.#x
    }
    
    get y() {
        return this.#y
    }

    constructor(cellElement, x, y) {
        this.#cellElement = cellElement
        this.#x = x 
        this.#y = y 
    }

    get tile() {
        return this.#tile
    }

    set tile(node) {
        this.#tile = node
        if (node == null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }
}

function createCellElements(gridElement) {
    const cells = []
    for (let i=0; i< gridSize*gridSize; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cells.push(cell)
        gridElement.appendChild(cell)
    }
    return cells
}