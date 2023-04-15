document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll(".box");
    const instructions = document.querySelector(".instructions");
    const btn = document.querySelector(".btn");
    let currPlayer;
    let gameGrid;
    const winPos = [ 
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    function Initial(){
        currPlayer = "O";
        gameGrid = ["","","","","","","","",""];
        //btn.classList.remove("active");
        boxes.forEach((box,index)=>{
            box.innerText = "";
            boxes[index].style.pointerEvents = "all";
            box.classList = `box box${index+1}`;
        });
        document.getElementById('btn1').style.visibility = 'hidden';
        instructions.innerText = `Current Player: ${currPlayer}`;        
      }
    
      Initial();
      
      function SwapPlayer(){
        if(currPlayer == 'X')
          currPlayer = 'O';
        else
          currPlayer = "X";
        instructions.innerHTML = `Current Player: ${currPlayer}`;
      }

      function GameCheck(){
        let answer = "";

        winPos.forEach((position)=>{

            if((gameGrid[position[0]] !== '' || gameGrid[position[1]] !== '' || gameGrid[position[2]] !== '') && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "O";

                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("winner");
                boxes[position[1]].classList.add("winner");
                boxes[position[2]].classList.add("winner");
            }
            
            if(answer !== ""){                
                instructions.innerText = `WINNER IS ${answer}`;
                document.getElementById('btn1').style.visibility = 'visible';
                return;
            }
        });

        let count = 0;
        gameGrid.forEach((box) =>{
            if(box !== "")
                count++;
        });

        if(count === 9){
            instructions.innerText = "Game Is Tied...!";
            document.getElementById('btn1').style.visibility = 'visible';
        }
      }

      function HandelCheck(index){
        if(gameGrid[index] === ""){
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

      btn.addEventListener('click',Initial);
});