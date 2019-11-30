let memory_game = {};
memory_game.cards = document.querySelectorAll(".memory-card");
memory_game.modal = document.getElementById("modal");
memory_game.newGameBtnHead = document.getElementById("new-game-head");
memory_game.newGameBtnModal = document.getElementById("new-game-modal");
memory_game.hasFlippedCard = false;
memory_game.lockCards = false;
memory_game.matchesCounter = 0;

memory_game.newGameBtnHead.addEventListener("click", startGame);

//Fisher-Yates shuffle
window.onload = (memory_game.shuffleCards = function () {
    memory_game.cards.forEach(card => {
        memory_game.randomizingCardPosition = Math.floor(Math.random() * 12);
        card.style.order = memory_game.randomizingCardPosition;
    });
});

memory_game.flipCard = function () {
    if (memory_game.lockCards) {
        return;
    };
    if (this === memory_game.firstCard) {
        return;
    };

    this.classList.add("flip");

    if (!memory_game.hasFlippedCard) {
        memory_game.hasFlippedCard = true;
        memory_game.firstCard = this;
        memory_game.firstCard.disabled = false;
    }
    else {
        memory_game.hasFlippedCard = false;
        memory_game.secondCard = this;
        memory_game.matching();
    }

};

memory_game.cards.forEach(card => card.addEventListener("click", memory_game.flipCard));

memory_game.matching = function () {
    // if cards match, disable 'flip'
    if (memory_game.firstCard.getElementsByClassName('front-card')[0].src === memory_game.secondCard.getElementsByClassName('front-card')[0].src) {
        memory_game.firstCard.removeEventListener("click", memory_game.flipCard);
        memory_game.secondCard.removeEventListener("click", memory_game.flipCard);

        memory_game.matchesCounter += 1;
        setTimeout(() => {
            memory_game.congratulations()
        }, 1200);
    }
    // if cards don't match, unflip cards
    else {
        memory_game.lockCards = true;
        setTimeout(function () {
            memory_game.firstCard.classList.remove("flip");
            memory_game.secondCard.classList.remove("flip");
            memory_game.lockCards = false;

            memory_game.resetUnmatchedCards();
        }, 1000);
    }

};

// reset unmatched cards at the end of each round 
memory_game.resetUnmatchedCards = function () {
    memory_game.hasFlippedCard = false;
    memory_game.lockCards = false;
    memory_game.firstCard = null;
    memory_game.secondCard = null;
};

memory_game.congratulations = function () {
    if (memory_game.matchesCounter === 6) {
        setTimeout(() => { memory_game.modal.classList.remove("display-none"); }, 1000);
    };
    memory_game.newGameBtnModal.addEventListener("click", startGame);
};

function startGame() {
    memory_game.cards.forEach(card => {
        if (card.classList.contains("flip")) {
            card.classList.remove("flip");
            memory_game.hasFlippedCard = false;
            memory_game.lockCards = false;
            memory_game.cards.forEach(card => card.addEventListener("click", memory_game.flipCard));
            memory_game.resetUnmatchedCards();
            memory_game.matchesCounter = 0;
        }
    })
    setTimeout(() => {
        memory_game.shuffleCards()
    }, 1000);
    memory_game.modal.classList.add("display-none");

};



