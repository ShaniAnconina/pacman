'use strict'

const GHOST = '☠'
var gGhosts = []
var gRemovedGhosts = []
var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost, i)
    }
}

function moveGhost(ghost, ghostIdx) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            // Delete:
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent // MODEL
            renderCell(ghost.location, ghost.currCellContent) // DOM

            // Update:
            gRemovedGhosts.push(ghost)
            gGhosts.splice(ghostIdx, 1)
            return
        } else {
            gameOver()
            return
        }
    }


    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var ghostColor = (gPacman.isSuper) ? '#fff' : ghost.color
    return `<span class="power" style="color:${ghostColor}">${GHOST}</span>`

}

function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
console.log('currGhost:', currGhost)
        if (currGhost.location.i === location.i && currGhost.location.j === location.j) {
            if (currGhost.currCellContent === FOOD) {
                currGhost.currCellContent === EMPTY
                gGame.foodCount--
                if (!gGame.foodCount) victory()

            }
            gRemovedGhosts.push(currGhost)
            gGhosts.splice(i, 1)
        }
    }
}

function reviveGhosts() {
    for (var i = 0; i < gRemovedGhosts.length; i++) {
        const ghost = gRemovedGhosts[i]
        gGhosts.push(ghost)
        gGame.foodCount++
    }
    gRemovedGhosts = []
}