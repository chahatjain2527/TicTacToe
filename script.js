// "Use Strict";
// const boxes = document.querySelectorAll(".box");
// const instructions = document.querySelector(".instructions");
// const btn = document.querySelector(".btn");

// let currPlayer;
// let gameGrid;

// const winPos = [ 
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,5]
// ];

function Initial(){
    currPlayer = "O";
    gameGrid = ["","","","","","","","",""];
    // btn.classList.remove("active");
    // instructions.innerText = `Current Player `;
    document.getElementsByClassName('instructions');
    console.log(document.getElementsByClassName('instructions').length());
}

Initial();