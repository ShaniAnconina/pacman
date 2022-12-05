'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍟'
const CHERRY = '🍒'
const size = 10

const gGame = {
    score: 0,
    isOn: false,
    foodCount: 0
}

var gBoard
var gCherryInterval

function onInit() {
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(randomCherries, 5000)
}

function buildBoard() {
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    board[1][1] = board[1][8] = board[8][1] = board[8][8] = POWER_FOOD
    gGame.foodCount -= 1 // PACMAN's position
    return board
}

function updateScore(diff) {
    // DONE: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h1 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, '&#128128')
    document.querySelector('.again').style.display = 'inline-block'
}

function victory() {
    gameOver()
    document.querySelector('h2').style.display = 'inline-block'
}

function randomCherries() {
    var emptyCells = getEmptyCells()
    if (!emptyCells || !emptyCells.length) return
    var randomCherryIdx = getRandomInt(0, emptyCells.length)
    var randomCherryCell = emptyCells[randomCherryIdx]
    // MODEL
    gBoard[randomCherryCell.i][randomCherryCell.j] = CHERRY
    // DOM
    renderCell(randomCherryCell, CHERRY)
}

function getEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells
}