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

async function handleInput(e) {
    const keyUsed = e.key 

    switch (keyUsed) {
        case 'ArrowUp':
            await moveUp()
            break
        case 'ArrowDown':
            await moveDown()
            break
        case 'ArrowLeft':
            await  moveLeft()
            break
        case 'ArrowRight':
            await  moveRight()
            break
        default:
             setupInput()
            return
    }
    grid.cells.forEach(cell => {cell.mergeTiles()})
    grid.randomEmptyCell().tile = new Tile(gameBoard)

    setupInput()
}

function moveUp() {
    return moveTiles(grid.cellsByColumn)
}

function moveDown() {
    return moveTiles(grid.cellsByColumn.map(cells => [...cells].reverse()))
}

function moveLeft() {
    return moveTiles(grid.cellsByRow)
}

function moveRight() {
    return moveTiles(grid.cellsByRow.map(cells => [...cells].reverse()))
}

async function moveTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = []
            for (let i=1; i< group.length; i++) {
                const cell = group[i]
                let lastValidCell = null

                if (cell.tile == null) continue
                for (let j=i-1; j>= 0; j--) {
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break
                    lastValidCell = moveToCell
                }

                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile 
                    } else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }
            return promises
        })
    )
}