const Gameboard = {
    winningConditions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    markers: { 
        X: 'X',
        O: 'O',
    },

    xturn: true,
}

const GameHandler = {
    handleClick: function(e, xturn, cellElements) {
        const cell = e.target
        const currentMarker = xturn ? Gameboard.markers.X : Gameboard.markers.O

        this.placeMark(cell, currentMarker)
        if (this.checkWin(currentMarker, Gameboard.winningConditions, cellElements)) {
            this.endGame(false, xturn)
        } else if (this.isDraw(cellElements)) {
            this.endGame(true)
        } 

        Gameboard.xturn = !Gameboard.xturn
    },

    placeMark: function(cell, currentMarker) {
        cell.classList.add(currentMarker)
    },

    checkWin: function(currentMarker, winningConditions, cellElements) {
        return winningConditions.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentMarker)
            })
        })
    },

    endGame: function(draw, xturn) {
        const winMessageTxtElement = document.querySelector('[data-winning-message-text]')
        const winModal = document.querySelector('.win-message')
        if (draw) {
            winMessageTxtElement.innerText = "Draw!"
        } else {
            winMessageTxtElement.innerText = `${xturn ? "X's" : "O's"} Wins!`
        }
        winModal.showModal()
    },

    isDraw: function(cellElements) {
        return [...cellElements].every((cell) => {
            return cell.classList.contains(Gameboard.markers.X) || cell.classList.contains(Gameboard.markers.O)
        })
    }
}

const GameFlow = (() => {
    const cellElements = document.querySelectorAll('[data-cell]')
    const startGame = () => {
        cellElements.forEach(cell => {
            cell.classList.remove(Gameboard.markers.X, Gameboard.markers.O)
        })

        Gameboard.xturn = true

        const winModal = document.querySelector('.win-message')
        winModal.close()

        cellElements.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true })
        })
    }

    const handleClick = (e) => {
        GameHandler.handleClick(e, Gameboard.xturn, cellElements)
    }

    startGame()
    const resetButton = document.querySelector('#reset-button')
    resetButton.addEventListener('click', startGame)
})

GameFlow()
