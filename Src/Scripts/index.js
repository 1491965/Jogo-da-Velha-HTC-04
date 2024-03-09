const game = {
    start: true,
    currentMove: 'X',
    players: {
        score1: 0,
        score2: 0,
    },

}

function getField(fieldNumber) {
    const $field = document.querySelector('.scenary-field-' + fieldNumber)

    return $field
}

function toggleCorrentMove() {

    if (game.currentMove === 'X') {
        game.currentMove = 'O'

    } else if (game.currentMove === 'O') {
        game.currentMove = 'X'
    }

}

function verifyFields(firstField, secondField, thirdField) {
    const $fieldList = document.querySelectorAll('.scenary-field-big')

    const hasWinner = $fieldList[firstField].textContent != ''
        && $fieldList[firstField].textContent === $fieldList[secondField].textContent
        && $fieldList[secondField].textContent === $fieldList[thirdField].textContent

    return hasWinner
}

function getWinner() {
    if (verifyFields(0, 1, 2)) {

        return game.currentMove
    } else if (verifyFields(3, 4, 5)) {
        return game.currentMove
    } else if (verifyFields(6, 7, 8)) {
        return game.currentMove
    } else if (verifyFields(0, 3, 6)) {
        return game.currentMove
    } else if (verifyFields(1, 4, 7)) {
        return game.currentMove
    } else if (verifyFields(2, 5, 8)) {
        return game.currentMove
    } else if (verifyFields(0, 4, 8)) {
        return game.currentMove
    } else if (verifyFields(2, 4, 6)) {
        return game.currentMove
    }

    return ''

}

function addPlayerScore(winner) {
    if (winner === 'X') {
        game.players.score1++
    } else if (winner === 'O') {
        game.players.score2++
    }
}

function printPlayerScore() {
    const [$score1, $score2] = document.querySelectorAll('.score')

    $score1.textContent = game.players.score1
    $score2.textContent = game.players.score2
}

function resetBoard() {
    const $fieldList = document.querySelectorAll('.scenary-field-big')

    for (const $field of $fieldList) {
        $field.textContent = ''
    }
}

function getPlayerName(move) {
    if (move === 'X') {
        const $inputPlayer1 = document.querySelector('.player-field-1')
        return $inputPlayer1.value
    } else if (move === 'O') {
        const $inputPlayer2 = document.querySelector('.player-field-2')
        return $inputPlayer2.value
    }
}

function PrintWinnerName(WinnerName) {
    const $winnerField = document.querySelector('.winner-field')
    $winnerField.textContent = WinnerName

}



for (let i = 0; i < 9; i++) {
    const $field = getField(i)

    $field.addEventListener('click', function () {
        if ($field.textContent !== '' || game.start === false) return
        $field.textContent = game.currentMove

        const winner = getWinner()

        if (winner !== '') {
            addPlayerScore(winner)
            printPlayerScore()
           setTimeout(resetBoard, 1000) 
           game.start = false  
           const WinnerName = getPlayerName(winner)  
           PrintWinnerName(WinnerName)       
           setTimeout(function(){
            game.start = true
           }, 1000)

         
          
          
           
          
          
        }

        toggleCorrentMove()

    })
}


