document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const instructions = document.querySelector(".instructions");
  const btn = document.querySelector(".btn");
  const toggle = document.getElementById("themeToggle");
  let currPlayer;
  let gameGrid;
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
  function Initial() {
    currPlayer = "O";
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

  function SwapPlayer() {
    if (currPlayer == 'X')
      currPlayer = 'O';
    else
      currPlayer = "X";
    instructions.innerHTML = `${currPlayer}`;
  }

  function GameCheck() {
    let answer = "";

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

    let count = 0;
    gameGrid.forEach((box) => {
      if (box !== "")
        count++;
    });

    if (count === 9) {
      instructions.innerText = "Game Tied...!";
      document.getElementById('btn1').style.visibility = 'visible';
    }
  }

  function HandelCheck(index) {
    if (gameGrid[index] === "") {
      boxes[index].innerHTML = currPlayer;
      boxes[index].style.pointerEvents = "none";
      gameGrid[index] = currPlayer;

      SwapPlayer();
      GameCheck();

    }
  }

  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      HandelCheck(index);
    });
  })



  // btn.addEventListener('click',Initial);
  btn.onclick = function () {
    Initial();
  };
  
  toggle.onchange = function () {
    if (!toggle.checked)
      document.getElementById("light-them").href = "lightThemStyle.css";
    else
      document.getElementById("light-them").href = "darkThemStyle.css";
  };

});