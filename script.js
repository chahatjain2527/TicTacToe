const boxes = document.querySelectorAll("box");
const gameBox = document.querySelector("gameBox");
const btn = document.querySelector("btn");

let currPlayer;
let gameGrid;

const winPos = { 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,5]
};

function Initial(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    btn.classList.remove("active");
    gameBox.innerText = `Current Player - ${currPlayer}`;
}

Initial();