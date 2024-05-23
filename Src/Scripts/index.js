const $historyMoveList = document.querySelector('.history-card-list')

const game = {
    start: true,
    currentMove: 'X',
    bot: {
        active:false,
    },
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

function configSwitcher(query, callback) {
    const $switcher = document.querySelector(query)

    $switcher.addEventListener('click', function(){
    $switcher.classList.toggle('switcher-active')
 callback()    
    })
}

function botMove() {
    const move = randomNumber(8)

    const $field = getField(move)

    const canNotPlay = draw()

    console.log(canNotPlay)

    if(canNotPlay) return

    if ($field.textContent !== '') {
       return botMove()
    }

    play($field, move)
}

function draw() {
    const $fieldList = document.querySelectorAll('.scenary-field-big')
    let filledFields = 0

    for ( const $field of $fieldList) {
       if ($field.textContent) filledFields++ 
    }

    const winner = getWinner()

    if ( filledFields === 9 && !winner) {
        return true
    }
    return false

    
}




function randomNumber(max) {
    const number = Math.floor(Math.random() * max + 1)
    
     return number
}

function play($field, position) {
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

    const hasDraw = draw() 
        if (hasDraw) {

            setTimeout(resetBoard, 1000)

        
    }

    const currentPlayerName = getPlayerName(game.currentMove)

    createHistoryMoveCard(game.currentMove, currentPlayerName, position)
    toggleCorrentMove()
}

function createHistoryMoveCard(move, player, position) {
const positionsLabels = [
'Primeiro quadrado', 
'Segundo quadrado',
'Teceiro quadrado',
'Quarto quadrado',
'Quinto quadrado',
'Sexto quadrado',
'Sétimo quadrado',
'Oitavo quadrado',
'Nono quadrado'
]

console.log(positionsLabels)


    $historyMoveList.innerHTML += `
    <li class="history-move-card">
    <span class="move-name">${move}</span>
    <div class="move-player-wrapper">
        <span class="move-player-name">${player}</span>
        <span class="move-label">${positionsLabels[position]}</span>
    </div>
</li>
`  
    

}

for (let i = 0; i < 9; i++) {
    const $field = getField(i)

    $field.addEventListener('click', function () {
      play($field, i)
      if(game.bot.active)
      botMove()
      

    })
}
configSwitcher('.switcher-bot', function() {
    game.bot.active = !game.bot.active

    
})


configSwitcher('.switcher-white', function() {  

    
})



