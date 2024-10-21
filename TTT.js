const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const update = document.querySelector("#update");
const newgame = document.querySelector(".newGame");

let turnO = true;//PlayerX , PlayerO

const WinPatterns = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[2,4,6],[6,7,8]];

boxes.forEach((box) =>{
    box.addEventListener("click",() => {
     if(turnO === true){
        box.innerText = "O";
        turnO = false;
     } else{
        box.innerText = "X";
        turnO = true;
     }
     box.disabled = true;

     checkWinner();
    });
});

const resetGame = () =>{
    turnO = true;
    enableBox();
}

const disableBox = () =>{
    for(let box of boxes){
        box.disabled = true;
    }};
    
const enableBox = () =>{
        for(let box of boxes){
            update.innerText = "Player X v/s Player O";
            update.style.backgroundColor = "white";
            update.style.color = "black";
            box.disabled = false;
            box.innerText = "";
            reset.disabled = false;
            newgame.classList.add("hide");
        }};

const checkWinner = () => {
    for(let pattern of WinPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === "X"){
                update.innerText = "Player X has Won!";
                update.style.backgroundColor = "green";
                update.style.color = "white";
                newgame.classList.remove("hide");
                reset.disabled = true;
                disableBox();
            } 
            if(pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === "O"){
                update.innerText = "Player O has Won!";
                update.style.backgroundColor = "green";
                update.style.color = "white";
                newgame.classList.remove("hide");
                reset.disabled = true;
                disableBox();
            } else{};
        }
    }
};
newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);