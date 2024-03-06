const game = {
currentMove: 'X'

}

function getField(fieldNumber) {
    const $field = document.querySelector('.scenary-field-' + fieldNumber)

    return $field
}

function toggleCorrentMove() {

    if (game.currentMove == 'X') {
        game.currentMove = 'O'

    } else if (game.currentMove == 'O') {
        game.currentMove = 'X'
    }

}

function verifyFields(firstField, secondField, thirdField) {
    const $fieldList = document.querySelectorAll('.scenary-field-big')
   const hasWinner =$fieldList[firstField].textContent != ''
   && $fieldList[firstField].textContent == $fieldList[secondField].textContent 
    && $fieldList[secondField].textContent == $fieldList[thirdField].textContent

return hasWinner
}

function getWinner() {
    console.log(verifyFields(0, 1, 2))

    //verifyFields()

    //if (false){
       // alert('blee')
//  }
}

for (let i = 0; i < 9; i++) {
    const $field = getField(i)


    $field.addEventListener('click', function () {        
        $field.textContent = game.currentMove
        toggleCorrentMove()
    })
}
 getWinner()
