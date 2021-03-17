const values = [
    '2','3','4','5','6' ,'7','8','9','10','J','Q','K','A' 
]

const suits = [
    '♥', '♠', '♣', '♦'
]
export default class Deck{
    constructor(cards = newDeck()){
        this.cards = cards
    }
    get numberOfCards(){
        return this.cards.length
    }
    pop(){
        return this.cards.shift()
    }
    push(card){
        this.cards.push(card)
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
          const newIndex = Math.floor(Math.random() * (i + 1))
          const oldValue = this.cards[newIndex]
          this.cards[newIndex] = this.cards[i]
          this.cards[i] = oldValue
        }
      }


}

class Card {
    constructor(value,suit){
        this.suit = suit,
        this.value = value
    }

    get color(){
        return this.suit === "♥" || this.suit === "♦" ? "red" : "black"
    }

    createCard(){
        const newCard = document.createElement("div")
        newCard.innerText = this.suit
        newCard.classList.add("card",this.color)
        newCard.dataset.value = `${this.value} ${this.suit}`
        return newCard
    }

}

function newDeck(){
    return suits.flatMap(suit => {
        return values.map(value => {
            return new Card(value,suit)
        })
    })
}