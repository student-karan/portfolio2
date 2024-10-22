let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");

let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#computer-score");

const GencompChoice = () => {
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}
const showWinner = (userWin) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! `;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose!`;
        msg.style.backgroundColor = "red";
    }
}
const playGame = (userChoice) =>{
    //Generate computer choice
    const CompChoice = GencompChoice();
    
    if(userChoice === CompChoice){
    msg.innerText = "Game was draw! play again";
    msg.style.backgroundColor = "white";
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            //scissors,paper
           userWin = CompChoice === "paper"? false : true
        }
        else if(userChoice === "paper"){
            //rock,scissors
            userWin = CompChoice === "scissors"? false : true
        }
        else {
            //rock,paper
            userWin = CompChoice === "rock"? false : true
        }
        showWinner(userWin);
    }
};

choices.forEach((choice) => {
    console.log("choice");
    let userChoice = choice.getAttribute("id");
    choice.addEventListener("click",() => {
    playGame(userChoice);
    })
});