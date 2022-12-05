'use strict'

var PACMAN = `<img class="pacman" src="img/pacmanRight.png" alt="">`
// const PACMAN = '🐤'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            // remove the specific ghost from gGhosts - removeGhost by location ( i,j)
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        gGame.foodCount--
        updateScore(1)
        if (!gGame.foodCount) victory()
    }

    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return

        gGame.foodCount--
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhosts()
        }, 5000)
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}


function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            PACMAN = `<img class="pacman" src="img/pacmanUp.png" alt="">`
            // document.querySelector('.pacman').style.transform = 'rotate(-90deg)';
            break;
        case 'ArrowRight':
            nextLocation.j++
            PACMAN = `<img class="pacman" src="img/pacmanRight.png" alt="">`
            // document.querySelector('.pacman').style.transform = 'rotate(0deg)';
            break;
        case 'ArrowDown':
            nextLocation.i++
            PACMAN = `<img class="pacman" src="img/pacmanDown.png" alt="">`
            // document.querySelector('.pacman').style.transform = 'rotate(90deg)';
            break;
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN = `<img class="pacman" src="img/pacmanLeft.png" alt="">`
            // document.querySelector('.pacman').style.transform = 'rotate(180deg)';
            break;
    }
    return nextLocation
}

