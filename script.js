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
    console.log('Arrow Up')
}

function moveDown() {
    console.log('Arrow Down')
}

function moveLeft() {
    console.log('Arrow Left')
}

function moveRight() {
    console.log('Arrow Right')
}

function moveTiles() {
    
}

console.log(grid.cellsByRow())