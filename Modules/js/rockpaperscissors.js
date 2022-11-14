//#region Initialise Variables

//Constants
const ROCK = "🪨", PAPER = "📄", SCISSORS = "✂️";
const DRAW = "Draw", USER = "Player", AI = "AI";

//Game Stats
let userScore = 0;
let aiScore = 0;
let roundWinner = "";
let userSelection = "";
let aiSelection = "";

//DOM Elements
const scoreText = document.querySelector(".scoreText");
const playerScoreText = document.querySelector(".playerScoreText");
const aiScoreText = document.querySelector(".AIScoreText");
const startText = document.querySelector(".startText");
const selectionText = document.querySelector(".selectionText");
const roundWinnerText = document.querySelector(".roundWinnerText");

//Buttons
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
rockBtn.addEventListener("click", () => {PlayRound(ROCK);});
paperBtn.addEventListener("click", () => {PlayRound(PAPER);});
scissorsBtn.addEventListener("click", () => {PlayRound(SCISSORS);});
//#endregion

function PlayRound(userSelection) 
{
  UpdateGameText();
  if(userScore >= 5 || aiScore >= 5) ResetGame();
  
  aiSelection = CalcAIResult();
  roundWinner = CalcGameResult(aiSelection, userSelection);

  IncreaseTally(aiSelection, userSelection, roundWinner);  
}

function IncreaseTally(aiSelection, userSelection, roundWinner) {
  if (roundWinner === USER) userScore++;
  if (roundWinner === AI) aiScore++;

  UpdateGameText(userSelection, aiSelection);

  if (userScore >= 5) EndGame(USER);
  if (aiScore >= 5) EndGame(AI);
} 

function UpdateGameText(userSelection, aiSelection) 
{
  startText.style.display = "none";
  scoreText.textContent = "SCORE";
  playerScoreText.textContent = `Player: ${userScore}`;
  aiScoreText.textContent = `Ai: ${aiScore}`;

  selectionText.textContent = `${userSelection} VS ${aiSelection}`;

  if(roundWinner === DRAW) roundWinnerText.textContent = `It's a ${roundWinner}`;
  else roundWinnerText.textContent = `${roundWinner} wins this round`;
}

function EndGame(winner) 
{
  selectionText.textContent = `The Winner Is The ${winner} `;
  roundWinnerText.textContent = "Make a selection to start again"
}

function ResetGame() {
  userScore = 0;
  aiScore = 0;
  drawScore = 0;
  roundWinner = "";
  userSelection = "";
  UpdateGameText();
}

function CalcAIResult() 
{
  let rndNumber = Math.random();  
  
  if (rndNumber <= 0.33) return ROCK;
  else if (rndNumber >= 0.66) return SCISSORS;
  else return PAPER;
}

function CalcGameResult(aiSelection, userSelection) 
{
  if (aiSelection === ROCK) {
    if (userSelection === ROCK) return DRAW;
    if (userSelection === PAPER) return USER;
    if (userSelection === SCISSORS) return AI;
  }
  if (aiSelection === PAPER) {
    if (userSelection === ROCK) return AI;
    if (userSelection === PAPER) return DRAW;
    if (userSelection === SCISSORS) return USER;
  }
  if (aiSelection === SCISSORS) {
    if (userSelection === ROCK) return USER;
    if (userSelection === PAPER) return AI;
    if (userSelection === SCISSORS) return DRAW;
  }
}