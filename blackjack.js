import Deck from './deck.js'

const cardValues = {
    '2' : [2],
    '3' : [3],
    '4' : [4],
    '5' : [5],
    '6' : [6],
    '7' : [7],
    '8' : [8],
    '9' : [9],
    '10' : [10],
    'J' : [10],
    'Q' : [10],
    'K' : [10],
    'A' : [1,11]
}


const playerContainer = document.querySelector('.cardContainer')
const hitButton = document.querySelector('.hitButton')
const textBox = document.querySelector('.textBox')
const stayButton = document.querySelector('.stayButton')
let playerDeck, stop

var playerTotal
startGame()
function startGame(){
    stop = false
    textBox.innerText = ""
    const deck = new Deck()
    deck.shuffle()
    playerDeck = deck
    playerTotal = [0,0]
    flipCard()
    flipCard()
}

stayButton.addEventListener("click", () => {
    if (isValid() === false || stop){
        stop = true
        cleanUp()
        startGame()
        return
    }
    if (isValid() === true){
        let bestHand
        if (playerTotal[1] >  21){
            bestHand = playerTotal[0]
        }
        else{
            bestHand = playerTotal[1]
        }
        var dealerResult = dealerHand(2,22)

        while (dealerResult <= bestHand && dealerResult !== 21){
            dealerResult += dealerHand(0,11)
        }
        if (dealerResult > 21){
            textBox.innerText = `You Win!! The Dealer Busted with result: ${dealerResult}`
        }
        else if (bestHand === 21 && dealerResult === 21){
            textBox.innerText = "Draw Dealer Pulled 21 Also =("
        }
        else if (dealerResult > bestHand ){
            textBox.innerText = `Dealer Won with result of: ${dealerResult}`
        }
        else{
            textBox.innerText = `You Win!! The Dealer Busted with result: ${dealerResult}`
        }
    }
    stop = true
})
hitButton.addEventListener("click", ()=>{
    if (isValid() === false || stop){
        cleanUp()
        startGame()
        return
    }
    flipCard()
    if (isValid() === false){
        textBox.innerText = "You Busted"
    }
})

function updatePlayertotal(card){
    if (card.value === 'A'){
        playerTotal[0] += cardValues[card.value][0]
        playerTotal[1] += cardValues[card.value][1]
    }
    else{
        playerTotal[0] += cardValues[card.value][0]
        playerTotal[1] += cardValues[card.value][0]
    }
}
function flipCard(){
    const card = playerDeck.pop()
    updatePlayertotal(card)
    playerContainer.append(card.createCard())
}
function cleanUp(){
    while(playerContainer.firstChild){
        playerContainer.removeChild(playerContainer.firstChild)
    }
}

function isValid(){
    let total = playerTotal
    let withAce1 = total[0]
    let withAce11 = total[1]
    return withAce1 <= 21 || withAce11 <= 21 
}

function dealerHand(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}