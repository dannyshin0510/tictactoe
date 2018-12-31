var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const firstName= document.getElementById(name);
const cells = document.querySelectorAll('.cell');

startGame();
function setName()
{
	var firstName=document.getElementById("gameName");
	var realName=firstName.elements["name"].value;
	document.getElementById("mainTitle").innerHTML="Welcome,"+ realName;
	return realName;
}

function startGame()
{
	document.querySelector(".endgame").style.display="none";
	origBoard=Array.from(Array(9).keys());

	for (var i=0;i<cells.length; i++)
	{
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener ('click', turnClick, false);
	}
}

function turnClick(square)
{
	if (typeof origBoard[square.target.id]=='number')
	{
		turn (square.target.id, huPlayer)
		if (!checkTie()) 
			turn (bestSpot(), aiPlayer);
	}
}
function turn (squareId, player)
{
	//make thee array value change.
	origBoard[squareId]=player;
	//show the chane in value (display it)
	document.getElementById(squareId).innerText=player;
	let gameWon=checkWin(origBoard, player);
	if (gameWon)
		gameOver(gameWon)
}
//THIS IS WHERE IT WAS GOOD TO PLAY
 function checkWin(board, player)	
 {
 	let gameWon=null;

 	for (var i=0;i<8;i++)
 	{
 	
 		if (board[winCombos[i][0]]==board[winCombos[i][1]]&&board[winCombos[i][1]]==board[winCombos[i][2]])
 		{
 			gameWon= {index: i, player:board[winCombos[i][0]]};
 			break;
 		}
 	}
	return(gameWon);
 }

 function gameOver (gameWon)
 {
 	for (let index of winCombos[gameWon.index]) 
 	{
 		document.getElementById(index).style.backgroundColor=gameWon.player==huPlayer ? "blue": "red";
 		for (var i=0;i<cells.length; i++)
 		{
 			cells[i].removeEventListener('click', turnClick, false);
 		}
 	}
 	declareWinner(gameWon.player==huPlayer ? setName()+" won!":firstName+" lost!");
 }

 function declareWinner (who)
 {
 	document.querySelector(".endgame").style.display="block";
 	document.querySelector(".endgame .text").innerText=who;
 }
function emptySquares()
{
	return origBoard.filter(s => typeof s=='number');
}
 function bestSpot()
 {
 	return emptySquares()[0];
 }

 function checkTie()
{
	if (emptySquares().length==0)
	{
		for (var i=0; i<cells.length; i++)
		{
			cells[i].style.backgroundColor="purple";
			cells[i].removeEventListener('click', turnClick, false);
		}
	declareWinner ("It's a TIE!")
	return true;
 }
 return false;
}
