let word = "";
let wordGuess = [];
let wordGuessed = [];
let wrongGuess = [];
let guess = "";
let turn = 0;
let isPlayerOne = true

// defining function for sound audio upon mouseover of the boxes
function PlaySound(soundobj) {
    let thissound = new Audio(soundobj);
    thissound.play();
}

//defining function for array of phrases
function wordw() {
    let randomWords = ["walk in a park", "you reap what you sow", "hit the nail on the head", "easy peasy lemon squeezy", "water under the bridge", "who wants to be a millionare", "deal or no deal", "highway to heaven", "always look on the bright side of life", "we all live in a yellow submarine", "raining cats and dogs"]
    let chosenWord = Math.floor(Math.random() * randomWords.length);
    return randomWords[chosenWord]
}

//defining the Player class and its innate functions 
class Player {
    constructor(player, wallet) {
        this.player = player
        this.wallet = wallet
    }
    appendWallet() {
        document.getElementById(`${this.player}wallet`).innerHTML = `Player ${this.player} has $` + this.wallet + " remaining";
    }

    bankrupt() {
        this.wallet = 0;
        alert('You have just gone bankrupt!')
        this.appendWallet()
    }
    extra1() {
        this.wallet += 200
        alert('You have just won $200')

        this.appendWallet()
    }

    extra2() {
        this.wallet += 100
        alert('You have just won $100')
        this.appendWallet()
    }


    minus() {
        if (this.wallet >= 100) {
            this.wallet -= 100
        }
        else {
            this.wallet = 0
        }
        alert('You have just lost $100')
        this.appendWallet()
    }

    hideAll() {
        let hiddenGuess = wordGuess.map(letter => letter.match('^[a-z]$') ? '*' : letter)
        wordGuess = hiddenGuess
        document.getElementById("rightGuess").innerHTML = "word progress: " + hiddenGuess.join('');
        alert('The letters are all hidden!')
        this.appendWallet()
    }

    bankruptOther() {
        const player = isPlayerOne ? player2 : player1
        player.wallet = 0
        alert(`You just made ${isPlayerOne ? 'Player 2' : 'Player 1'} bankrupt!`)
        document.getElementById(`2wallet`).innerHTML = `Player 2 has $` + player2.wallet + " remaining";
        document.getElementById(`1wallet`).innerHTML = `Player 1 has $` + player1.wallet + " remaining";
    }
}


// Initializing new player classes
const player1 = new Player(1, 100)
const player2 = new Player(2, 100)

function wordStart() {
    let splitWord = word.split('')

    for (let i = 0; i < splitWord.length; i++) {
        if (splitWord[i] == ' ') {
            wordGuess.push(' ');
        } else
            wordGuess.push('_');
    }
}

function changePlayer() {
    isPlayerOne = !isPlayerOne
    document.getElementById('playerTurn').innerHTML = `It is ${isPlayerOne ? 'Player 1' : 'Player 2'}'s turn`
    document.getElementById("question").innerHTML = `Player ${isPlayerOne ? '1' : '2'}, it's your turn! pick a box first, or take a guess! Or can you solve the puzzle?!`;
}

function start() {
    word = wordw();
    console.log(word)
    document.getElementById('mainGame').style.display = 'block';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('container1').style.display = 'grid';
    document.getElementById('playerTurn').innerHTML = `It is ${isPlayerOne ? 'Player 1' : 'Player 2'}'s turn`
    document.getElementById("question").innerHTML = `Player ${isPlayerOne ? '1' : '2'}, click a box to get a mystery prize or go ahead and guess a letter!`;
    document.getElementById("1wallet").innerHTML = "Player 1 has $" + player1.wallet + " remaining";
    document.getElementById("2wallet").innerHTML = "Player 2 has $" + player2.wallet + " remaining";
    wordStart();

    document.getElementById('RRguess').style.display = 'block';
    document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess.join('');
    document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;

    let x = document.getElementById("guess").maxLength;
    //document.getElementById("demo").innerHTML = x;
}

function appendBox() {
    document.getElementById("question").innerHTML = `Player ${isPlayerOne ? '1' : '2'}, it's your turn! pick a box first, or take a guess! Or can you solve the puzzle?!`;
    document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess.join('');
    document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;
    document.getElementById("1wallet").innerHTML = "Player 1 has $" + player1.wallet + " remaining";
    document.getElementById("2wallet").innerHTML = "Player 2 has $" + player2.wallet + " remaining";
    document.getElementById('container1').style.display = 'grid';
}

function pickBox() {
    const player = isPlayerOne ? player1 : player2
    document.getElementById("question").innerHTML = `Player ${isPlayerOne ? '1' : '2'}, you selected a box! Now you have to guess a letter or solve the puzzle!`;
    document.getElementById('container1').style.display = 'none';

    const randomBonus = ['bankrupt', 'extra1', 'extra2', 'minus', 'extra1', 'hideAll', 'bankruptOther']
    const chosenBonus = Math.floor(Math.random() * randomBonus.length)
    return player[randomBonus[chosenBonus]]();
}

function playerGuess(letter, player) {
    if (isValid(letter)) {
        let correct = isRightOrNot(letter);
        if (correct) {
            correctLetter(letter);
            wordGuessed.push(letter);
            alert(`You guessed a correct letter ${letter} ! Moving on to Player ${isPlayerOne ? '2' : '1'}`)
            player.wallet += 50
            changePlayer()
            appendBox();
        } else {
            wrongGuess.push(letter);
            wordGuessed.push(letter);
            alert(`You guessed a wrong letter ${letter} ! Moving on to Player ${isPlayerOne ? '2' : '1'}`)
            player.wallet -= 50
            changePlayer()
            appendBox();
        }
    }
}

function isValid(letter) {
    let isValidLetter = true
    if (!letter.match('^[a-zA-Z]$')) {
        //handling unexpected inputs--not letters
        alert('Not a letter');
        isValidLetter = false
    } else if (!letter.length === 1) {
        alert('only 1 letter allowed')
        isValidLetter = false
    } else if (wordGuessed.includes(letter) || wrongGuess.includes(letter)) {
        //handling unexpected inputs--already guessed
        alert('You already guessed that letter! Try again please')
        isValidLetter = false
    }
    return isValidLetter
}


function enterGuess() {
    document.getElementById("guess").value = "";
    const player = isPlayerOne ? player1 : player2
    if (player.wallet < 50) {
        alert(`You don't have enough money. Passing on to Player ${isPlayerOne ? '2' : '1'}`);
        changePlayer()
        appendBox();
    } else {
        const letter = prompt("What is your guess?");
        if (letter === null) {
            changePlayer();
            appendBox();
        } else {
            playerGuess(letter, player)
        }
    }
}

function isRightOrNot(a) {
    let right = word.includes(a);
    return right;
}

function correctLetter(letter) {
    let count = 0;

    while (count <= word.length - 1) {
        if (letter === word[count]) {
            wordGuess[count] = letter;
            count += 1;
        }

        else {
            count += 1;
        }

    }

}

function enterFull() {
    let letter = prompt("What is your guess? Wrong guesses will bankrupt you. You need at least $200 to try");
    document.getElementById("guess").value = "";
    const player = isPlayerOne ? player1 : player2
    if (player.wallet < 200) {
        alert(`You don't have enough money. Passing on to Player ${isPlayerOne ? '2' : '1'}`);
        changePlayer()
        appendBox();
    } else if (letter == word) {
        alert(`You guess the full phrase correctly! Congratulations ${isPlayerOne ? 'Player 1' : 'Player 2'}!! $500 awarded`);
        player.wallet += 500;
        gameWin()
        changePlayer()
    }
    else {
        alert('Incorrect! You lost your turn and money!')
        player.bankrupt();
        changePlayer();
        appendBox();
    }
}



function gameWin() {
    document.getElementById('mainGame').style.display = 'none';
    document.getElementById('RRguess').style.display = 'none';
    document.getElementById('youWin').style.display = 'block';
    document.getElementById('playerTurn').style.display = 'none';
    const player = isPlayerOne ? player1 : player2
    const oPlayer = isPlayerOne ? player2 : player1
    if (player.wallet > oPlayer.wallet) {
        document.getElementById('whoWon').innerHTML = `${isPlayerOne ? 'Player 1' : 'Player 2'} won the game with a difference of $${player.wallet - oPlayer.wallet}. ${isPlayerOne ? 'Player 2' : 'Player 1'}, don't give up!`
    }
    else if (player.wallet === oPlayer.wallet) {
        document.getElementById('whoWon').innerHTML = "It's a tie! Rematch please!"
    }

    document.getElementById('correctWordWas').innerHTML = "The correct phrase was.... " + "\"" + word + "\"";
}

function restart() {
    document.getElementById('mainGame').style.display = 'none';
    document.getElementById('RRguess').style.display = 'none';
    document.getElementById('youWin').style.display = 'none';
    document.getElementById('playerTurn').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';

    word = wordw()
    wordGuess = [];
    wordGuessed = [];
    wrongGuess = [];
    guess = "";
    isPlayerOne = true
}

function reset() {
    document.getElementById('mainGame').style.display = 'none';
    document.getElementById('RRguess').style.display = 'none';
    document.getElementById('youWin').style.display = 'none';
    document.getElementById('playerTurn').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';

    word = wordw()
    wordGuess = [];
    wordGuessed = [];
    wrongGuess = [];
    guess = "";
    player1.wallet = 100
    player2.wallet = 100
    isPlayerOne = true
}
