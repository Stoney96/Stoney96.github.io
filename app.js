const game = () => {
    let pScore = 0
    let cScore = 0

    //starts the game
    const startGame = () => {
        const playBtn = document.querySelector(".intro button")
        const introScreen = document.querySelector(".intro")
        const matchScreen = document.querySelector(".match")

        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut")
            matchScreen.classList.add("fadeIn")
        })
    }

    //play the game itslef

    const playMatch = () => {
        const options = document.querySelectorAll(".options button")
        const playerHands = document.querySelector(".player-hand")
        const computerHands = document.querySelector(".computer-hand")

        // generate a random number
        const computerOptions = ["rock", "paper", "scissors"]

        // console.log(options)
        options.forEach(option => {
            option.addEventListener("click", function(){
                // console.log(this.textContent)

                // computer choice
                const computerNumber = Math.floor((Math.random() * 3))
                const computerChoice = computerOptions[computerNumber]
                // console.log(computerChoice)

                playerHands.src = `./assets/${this.textContent}.png`
                computerHands.src = `./assets/${computerChoice}.png`

                //here is where we call compare hands
                compareHands(this.textContent, computerChoice)
                updateScore()

            })     
        });   
    }

    const updateScore = () =>{
        const playerScore = document.querySelector(".player-score p")
        const computerScore = document.querySelector(".computer-score p")

        playerScore.textContent = pScore
        computerScore.textContent = cScore
    }

    const compareHands = (playerChoice, computerChoice) =>{

        const winner = document.querySelector(".winner")

        if (playerChoice === computerChoice){
            winner.textContent = "It's a tie"
            return 
        }

        if (playerChoice === "rock"){
            if (computerChoice === "scissors"){
                winner.textContent = "Player wins"
                pScore+=1
                return 
            } else{
                winner.textContent = "Computer wins"
                cScore+=1
                return 
            }
        }
        if (playerChoice === "paper"){
            if (computerChoice === "rock"){
                winner.textContent = "Player wins"
                pScore+=1
                return 
            } else{
                winner.textContent = "Computer wins"
                cScore+=1
                return 
            }
        }
        if (playerChoice === "scissors"){
            if (computerChoice === "paper"){
                winner.textContent = "Player wins"
                pScore+=1
                return 
            } else{
                winner.textContent = "Computer wins"
                cScore+=1
                return 
            }
        }

    }
    
    //to actually start the game itself
    startGame()
    playMatch()
}

game()