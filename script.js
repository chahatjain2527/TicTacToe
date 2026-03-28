const boxes = document.querySelectorAll(".box");
const instructions = document.querySelector(".instructions");
const btn = document.querySelector(".btn");
const toggle = document.getElementById("themeToggle");
const aiToggle = document.getElementById("aiToggle");
const difficultySelector = document.getElementById("difficultySelector");
let currPlayer;
let gameGrid;
let count = 0;
let isAiMode = false;
let difficulty = 'medium';
const winPos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function Initial() {// this function initalize all things on page load
  currPlayer = "O";
  count = 0;
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.className = `box box${index + 1}`;
  });
  document.getElementById('btn1').style.visibility = 'hidden';
  instructions.innerText = `${currPlayer}`;
}

Initial();

// this function swap playes after every turn
function SwapPlayer() {
  if (currPlayer == 'X'){
    currPlayer = 'O';}
  else{
    currPlayer = "X";}
  instructions.innerHTML = `${currPlayer}`;
}

// this function checks the winner 
function GameCheck() {
  let answer = "";
  let isGameOver = false;

  winPos.forEach((position) => {

    if ((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '')
      && (gameGrid[position[0]] === gameGrid[position[1]])
      && (gameGrid[position[1]] === gameGrid[position[2]])) {
      if (gameGrid[position[0]] === "X"){
        answer = "X";}
      else{
        answer = "O";}

      isGameOver = true;
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      })

      boxes[position[0]].classList.add("winner");
      boxes[position[1]].classList.add("winner");
      boxes[position[2]].classList.add("winner");
    }

    if (answer !== "") {
      instructions.innerText = `${isAiMode ? answer == "X" ? "AI" : "You" : answer} Wins`;
      document.getElementById('btn1').style.visibility = 'visible';
    }
  });

  if (count === 9 && answer === "") {// this situation check for tie condition
    instructions.innerText = "Game Tied...!";
    document.getElementById('btn1').style.visibility = 'visible';
    isGameOver = true;
  }

  return isGameOver;
}

// this function puts current player value in box and make it disable
function HandelCheck(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currPlayer;
    boxes[index].style.pointerEvents = "none";
    boxes[index].classList.add(currPlayer === "X" ? "box-x" : "box-o");
    gameGrid[index] = currPlayer;
    count++;
    SwapPlayer();
    var result = GameCheck();
    if (isAiMode && currPlayer == "X" && !result) {
      triggerAIMove()
    }
  }
}

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    HandelCheck(index);
  });
})

btn.addEventListener('click', () => {
  Initial();
});

toggle.addEventListener("change", () => {
  document.getElementById("light-them").href = toggle.checked ? "darkThemStyle.css" : "lightThemStyle.css"
});

aiToggle.addEventListener("change", () => {
  difficultySelector.style.display = aiToggle.checked ? "block" : "none";
  isAiMode = aiToggle.checked;
  Initial();
});

document.querySelectorAll('input[name="difficulty"]').forEach((i) => {
  i.addEventListener("change", () => {
    if (i.checked){
      if(i.value=="hard")
      {alert("Work In Preogress...."); return;}

      difficulty = i.value;
    }
    Initial();
  })
});

function triggerAIMove() {
  let index;
  if (difficulty === "easy") {
    index = getEasyMove();
  } else if (difficulty === "medium") {
    index = getMediumMove();
  } else {
    index = getHardMove();
  }
  HandelCheck(index);
};

function getEasyMove() {
  var list = [];
  gameGrid.forEach((val, index) => {
    if (val == "")
      list.push(index);
  });
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
function getMediumMove() {
  let indexToReturn = findWinningMove("X");
  if (indexToReturn == null) {
    indexToReturn =  findWinningMove("O");  //for random move
  }
  if(indexToReturn == null){
    indexToReturn =  getEasyMove();
  }
  return indexToReturn;
}
function getHardMove() {
}

function findWinningMove(player){
  for(const item of winPos){
    if(gameGrid[item[0]] == player && gameGrid[item[1]] == player && gameGrid[item[2]] == ""){
      return item[2];
    }
    else if(gameGrid[item[0]] == player && gameGrid[item[1]] == "" && gameGrid[item[2]] == player){
      return item[1];
    }
    else if(gameGrid[item[0]] == "" && gameGrid[item[1]] == player && gameGrid[item[2]] == player){
      return item[0];
    }
  };
  return null;
};