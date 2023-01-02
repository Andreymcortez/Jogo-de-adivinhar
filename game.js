let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    
    cards_init : ['html',
    'css3',
    'unity',
    'python',
    'github',
    'bootstrap',
    'mysql',
    'javascript'],

    cardsStart : null,

    setCard: function(id){

        let card = this.card.filter(card => card.id === id)[0];

        if(card.flip || this.lockMode){
            return false;
        }

        if (!this.firstCard){
            this.firstCard = card;
            this.firstCard.flip = true
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flip = true
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flip = false;
        this.secondCard.flip = false;
        this.clearCards();
    },

    checkGameOver: function(){
        for(let card of this.cardsStart){
            console.log(card[0].flip)
        }
        return this.cardsStart.filter(card => !card[0].flip).length == 0
    },

    createCards: function() {
        
        this.cardsStart = []
    
        this.cards_init.forEach((card) => {
            this.cardsStart.push(this.createFrontAndBack(card));
        })
        this.card =  this.cardsStart.flatMap(pair => pair);
        this.shuffleCards(this.card);
        return this.card
    },
    
    createId: function (card) {
        
        return card + parseInt(Math.random() * 1000);
        
    },

    createFrontAndBack: function(card) {
    
        return [{
            id: this.createId(card),
            icon: card,
            flip: false, 
        }, {
            id: this.createId(card),
            icon: card,
            flip: false,
    
        }]
    
    },
    
    shuffleCards: function (cards){
        // Pegar o último indice do array de cartas
        let currentIndex = this.card.length;
        // Variável para pegar o primeiro indice do array
        let randomIndex = 0;
        // Ir trocando indice do array até que o último indice seja 0
        while(currentIndex != 0){
            // Colocando o último indice dentro da variável randomIndex
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // Ir trocando a última carta pela primeira para embaralhar os indices
            [this.card[randomIndex], this.card[currentIndex]] = [this.card[currentIndex], this.card[randomIndex]];
        }
    }
}