
// initialise variables
let turnCounter = 1;
let turnState = 1; // 1 is "O", 2 is "X"
let winState = 0;
let currentBoardState = ['', '', '', '', '', '', '', '', ''];
let currentBoardValueO = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let currentBoardValueX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const boardValue = [2, 11, 5, 9, 6, 3, 7, 1, 10];
// const letter = ['X' 'O'];
const boardText = document.getElementsByClassName('board-text');
const boardArea = document.getElementById('board-area');
const inputArea = document.getElementsByClassName('input-area');
const winMessage = document.getElementById('win-message');

function setComputerEasy(){

}

function findBoardValue(){
	if (turnState == 1){
		for (i = 0; i < currentBoardState.length; i++){
			if (currentBoardState[i] == "O"){
				currentBoardValueO[i] = boardValue[i];
			}
		}
		console.log(currentBoardValueO);
		return currentBoardValueO;
	} else {
		for (i = 0; i < currentBoardState.length; i++){
			if (currentBoardState[i] == "X"){
				currentBoardValueX[i] = boardValue[i];
			}
		}
		console.log(currentBoardValueX);
		return currentBoardValueX;
 	}
}

function findWinBoardValue(boardValue){

	let winBoardValue = [0, 0, 0, 0, 0, 0, 0, 0];
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
	return winBoardValue;
}

// inputs content of HTML into currentBoardState array
function getBoardState() {
	for (i = 0; i < 9; i++){
		currentBoardState[i] = boardText[i].innerHTML;
	}
}

// sets HTML from currentBoardState array
function displayBoardState(){
	for (i = 0; i < 9; i++){
		boardText[i].innerHTML = currentBoardState[i];
	}
}

// there are only two players in tic tac toe, playerA and playerB. therefore, there are only two turnStates;
function getTurnState(){
	turnState = turnCounter % 2;
}

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

function winCheck(){
	// check win condition
	winCondition = findWinBoardValue(findBoardValue());
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
		winState = 3;
	}
	// display win message
	displayWinMessage();
}

// event handler on clicking an input-area
boardArea.onclick = function(event){
	// prevent default behaviour
	event.preventDefault();

	// console.log("event: " + event);
	// console.log(event);
	// console.log(event.target);

	// change currentBoardState
	getTurnState();

	if (turnState == 1 && event.target.innerHTML == ''){
		event.target.innerHTML = "O";
		turnCounter++; // update turn counter
	} else 	if (turnState == 0 && event.target.innerHTML == ''){
		event.target.innerHTML = "X";
		turnCounter++; // update turn counter
	} else {
		window.alert('Please click on an empty square');
	}

	// display currentBoardState
	getBoardState();
	displayBoardState();

	winCheck();
}


// show initial board (which is empty)
displayBoardState();