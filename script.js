
// initialise variables
let gameMode = 0; // default 2-player mode
let computerFirst = 0; // default is computer goes second
let turnCounter = 1; // stores current turn value
let turnState = 1; // 1 is O's turn, 2 is X's turn
let winState = 0; // stores the state of win
let currentBoardState = ['', '', '', '', '', '', '', '', '']; // stores current board state
let currentBoardValueO = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // stores current board value for O
let currentBoardValueX = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // stores current board value for X
const boardValue = [2, 11, 5, 9, 6, 3, 7, 1, 10]; // defines a value for each square

// define certain targets for elements
const boardText = document.getElementsByClassName('board-text');
const boardArea = document.getElementById('board-area');
const inputArea = document.getElementsByClassName('input-area');
const winMessage = document.getElementById('win-message');

// WIP
function setComputerEasy(){
	gameMode = 1;
	clearBoardArea();
	if (confirm('Would you like the computer to move first?')) {
		computerFirst = 1;
		computerMove();
	} else {}
}

// WIP
function setComputerHard(){
	gameMode = 2;
	clearBoardArea()
}

// WIP
function computerMove(){
	let moveValid = false;
	getTurnState();


	if (computerFirst == 0 && gameMode == 1) { // default setting, computer only inputs "X"

		while(moveValid == false){
			randLoc = Math.floor(Math.random() * currentBoardState.length);
			if (currentBoardState[randLoc] == ''){
				currentBoardState[randLoc] = 'X';
				console.log(currentBoardState);
				displayBoardState();
				moveValid = true;
			}
		}
	} else if (computerFirst == 1 && gameMode == 1) { // computer only inputs "O"

		while(moveValid == false){
			randLoc = Math.floor(Math.random() * currentBoardState.length);
			if (currentBoardState[randLoc] == ''){
				currentBoardState[randLoc] = 'O';
				console.log(currentBoardState);
				displayBoardState();
				moveValid = true;
			}
		}
	}

	turnCounter++;
	winCheck();
}

// assigns board value based on the current board state
function findBoardValue(){
	if (turnState == 1){ // for player one
		for (i = 0; i < currentBoardState.length; i++){
			if (currentBoardState[i] == "O"){
				currentBoardValueO[i] = boardValue[i];
			}
		}
		console.log(currentBoardValueO);
		return currentBoardValueO; // return board value for O

	} else { // for player two
		for (i = 0; i < currentBoardState.length; i++){
			if (currentBoardState[i] == "X"){
				currentBoardValueX[i] = boardValue[i];
			}
		}
		console.log(currentBoardValueX);
		return currentBoardValueX; // return board value for X
 	}
}

// accepts a board value input finds the sum of each winning direction
function findWinBoardValue(boardValue){

	let winBoardValue = [0, 0, 0, 0, 0, 0, 0, 0]; // define 8 summations

	// horizontal check
	for (i = 0; i < 3; i++){
		winBoardValue[i] = boardValue[i + (2*i)] + boardValue[i+1+(2*i)] + boardValue[i+2+(2*i)];

	}

	// vertical check
	for (i = 3; i < 6; i++){
		winBoardValue[i] = boardValue[i-3] + boardValue[i] + boardValue[i+3];
	}

	// diagonal check
	winBoardValue[6] = boardValue[0] + boardValue[4] + boardValue[8];
	winBoardValue[7] = boardValue[2] + boardValue[4] + boardValue[6];

	return winBoardValue; // returns all 8 directions of summation
}

// inputs content of HTML into currentBoardState array
function getBoardState() {
	for (i = 0; i < 9; i++){
		currentBoardState[i] = boardText[i].innerHTML;
	}
}

// sets HTML from currentBoardState array
function displayBoardState() {
	for (i = 0; i < 9; i++){
		boardText[i].innerHTML = currentBoardState[i];
	}
}

// update turn state (first player or seond player)
function getTurnState(){
	turnState = turnCounter % 2;
}

// clears board and resets parameters
function clearBoardArea(){
	currentBoardState = ['', '', '', '', '', '', '', '', ''];
	turnCounter = 1;
	turnState = 1;
	winState = 0;
	currentBoardValueO = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	currentBoardValueX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	winMessage.classList.add('hidden');
	displayBoardState();
}

// uses winState to determine win message
function displayWinMessage(){
	if (winState == 1) {
		winMessage.innerHTML = "Player One has won!";
		winMessage.classList.remove('hidden');
	} else if (winState == 2) {
		winMessage.innerHTML = "Player Two has won!";
		winMessage.classList.remove('hidden');
	} else if (winState == 3) {
		winMessage.innerHTML = "Game is a draw!";
		winMessage.classList.remove('hidden');
	}
}

// outputs a win message based on who won or draw if nobody won
function winCheck(){

	// obtain win condition
	winCondition = findWinBoardValue(findBoardValue());

	// checks win board values which are equal to 18
	if (turnCounter < 10){
		for (i = 0; i < winCondition.length; i++) {
			if ((turnState == 1) && (winCondition[i] == 18)){
				winState = 1;
				// setTimeout(function() {window.alert('You won ZULUL')}, 250);
			} else if ((turnState == 0) && (winCondition[i] == 18)){
				winState = 2;
			} else {}
		}
	} else {
		winState = 3; // draw as turn counter reaches 9
	}
	// display win message
	displayWinMessage();
}

// event handler on clicking an input-area
boardArea.onclick = function(event){
	// prevent default behaviour
	event.preventDefault();

	// updates turn state
	getTurnState();

	// on click display X or O based on turn state and whether empty space was clicked
	if (turnState == 1 && event.target.innerHTML == ''){
		event.target.innerHTML = "O";
		getBoardState();
		turnCounter++; // update turn counter
		winCheck();
		if (gameMode > 0 && winState == 0) {
			computerMove();
		}

	} else 	if (turnState == 0 && event.target.innerHTML == ''){
		event.target.innerHTML = "X";
		getBoardState();
		turnCounter++; // update turn counter
		winCheck();
		if (gameMode > 0 && winState == 0) {
			computerMove();
		}

	} else {
		window.alert('Please click on an empty square');
	}


	// display currentBoardState
	// getBoardState();
	// displayBoardState();

}


// show initial board (which is empty)
displayBoardState();