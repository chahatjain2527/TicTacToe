  const boxes = document.querySelectorAll(".box");
  const instructions = document.querySelector(".instructions");
  const btn = document.querySelector(".btn");
  const toggle = document.getElementById("themeToggle");
  let currPlayer;
  let gameGrid;
  let count = 0;
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
    if (currPlayer == 'X')
      currPlayer = 'O';
    else
      currPlayer = "X";
    instructions.innerHTML = `${currPlayer}`;
  }

  // this function checks the winner 
  function GameCheck() {
    let answer = "";
    //let count = 0;

    winPos.forEach((position) => {

      if ((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '')
        && (gameGrid[position[0]] === gameGrid[position[1]])
        && (gameGrid[position[1]] === gameGrid[position[2]])) {
        if (gameGrid[position[0]] === "X")
          answer = "X";
        else
          answer = "O";

        boxes.forEach((box) => {
          box.style.pointerEvents = "none";
        })

        boxes[position[0]].classList.add("winner");
        boxes[position[1]].classList.add("winner");
        boxes[position[2]].classList.add("winner");
      }

      if (answer !== "") {
        instructions.innerText = `${answer} Wins`;
        document.getElementById('btn1').style.visibility = 'visible';
        return;
      }
    });

    if (count === 9) {// this situation check for tie condition
      instructions.innerText = "Game Tied...!";
      document.getElementById('btn1').style.visibility = 'visible';
    }
  }

  // this function puts current player value in box and make it disable
  function HandelCheck(index) { 
    if (gameGrid[index] === "") {
      boxes[index].innerHTML = currPlayer;
      boxes[index].style.pointerEvents = "none";
      gameGrid[index] = currPlayer;
      count++;
      SwapPlayer();
      GameCheck();
    }
  }

  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      HandelCheck(index);
    });
  })

  btn.addEventListener('click',()=>{
    Initial();
  });
  
  toggle.addEventListener("change",()=>{
    document.getElementById("light-them").href = toggle.checked ? "darkThemStyle.css" : "lightThemStyle.css"
  });