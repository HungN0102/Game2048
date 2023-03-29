import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard = document.querySelector('#game-board')
const grid = new Grid(gameBoard)

grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

setupInput()

function setupInput() {
    window.addEventListener('keydown', handleInput, {once: true})
}

function handleInput(e) {
    const keyUsed = e.key 

    switch (keyUsed) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        default:
            setupInput()
    }
    setupInput()
}

function moveUp() {
    moveTiles(grid.cellsByColumn())
}

function moveDown() {
    moveTiles(grid.cellsByColumn().map(cells => [...cells].reverse()))
}

function moveLeft() {
    moveTiles(grid.cellsByRow())
}

function moveRight() {
    moveTiles(grid.cellsByRow().map(cells => [...cells].reverse()))
}

function moveTiles(cells) {
    cells.forEach(group => {
        for (let i=1; i< group.length; i++) {
            const cell = group[i]
            let lastValidCell = null

            if (cell.tile == null) continue
            for (let j=i-1; j>= 0; j--) {
                const moveToCell = group[j]
                if (!moveToCell.canAccept(cell.tile)) continue
                lastValidCell = moveToCell
            }

            if (lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile 
                } else {
                    lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        }
    })
}