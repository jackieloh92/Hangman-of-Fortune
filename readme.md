# Boxes of Fortune

This game is a unique twist on the classic Hangman game (refer to Lab 6 petals.md), combined with an old television show called "Wheel of Fortune"



Game Rules

- 2 player Game
- Turn-based rotation
- Requires money as a resource to guess alphabets and phrases
- Clicking the box may benefit or sabotage you or your opponent
- Players can guess the full word to instant win
- Winner keeps accumulating more money





## Documentation

playSound()
- defining the function to play audio sound on box click

wordw()
- defining the function to choose from a random array of phrases and set it as the current game's golden answer

class Player
- defining the characteristics of the Player and includes their player number, wallet resource and inner "skills"

changePlayer()
- a function to switch player everytime they use up or lose their turn

start()
- mostly a DOM function to setup the game HTML elements and reset all values to default for a fair game

appendBox()
- a DOM function to make the boxes appear everytime a turn is passed, else it will be hidden

pickBox()
- a function that triggers a players' "skill" whenever the box is clicked. This is randomised

isValid(letter)
- a function to check that the letter input is an alphabet, already guessed before, or if the length is strictly 1

enterGuess()
- a function that allows the player to enter their guess, and change their money depending if it's right or wrong. Players require at least $50 to guess

correctLetter()
- the main magic of the hangman game, to verify if the [] position of the letter input from enterGuess is correct with the golden phrase, and then it will print out the letter in the word progress HTML.

enterFull()
- a function that allows the player to guess the full phrase, else they face bankruptcy

gameWin()
- mostly a DOM function that triggers when the player enters the full phrase correctly, to reset the game HTML elements to a new slate

restart()
- function that resets game variables to original state, but retains wallet amount.

reset()
= function that resets game variables to original state





