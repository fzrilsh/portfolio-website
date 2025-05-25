class GameOver {
    constructor(){
        this.el = document.querySelector('#gameOver')
        this.playerNameEl = this.el.querySelector('#finalPlayerName')
        this.stageEl = this.el.querySelector('#finalStage')
        this.saveScoreButton = this.el.querySelector('#saveScore')
        this.showLeaderboardButton = this.el.querySelector('#showLeaderboard')
        this.playAgainButton = this.el.querySelector('#playAgain')
        this.resetButton = this.el.querySelector('#reset')
    }

    mount(){
        this.el.classList.add('active')

        this.playerNameEl.textContent = screenController.menu.username
        this.stageEl.textContent = screenController.gameboard.stage

        this.registerEvents()
    }

    unMount(){
        this.el.classList.remove('active')

        this.saveScoreButton = () => {}
        this.playAgainButton = () => {}
    }

    registerEvents(){
        this.saveScoreButton.onclick = () => {
            let datas = JSON.parse(localStorage.getItem('leaderboard') ?? '[]')
            datas.push({
                username: screenController.menu.username,
                stage: screenController.gameboard.stage,
                timePlayed: screenController.gameboard.timePlayed
            })

            localStorage.setItem('leaderboard', JSON.stringify(datas))
            sendAlert('Score saved.', 'success')
        }

        this.playAgainButton.onclick = () => {
            screenController.changeScreen('gameboard')
        }

        this.showLeaderboardButton.onclick = () => {
            screenController.changeScreen('leaderboard')
        }

        this.resetButton.onclick = () => {
            screenController.changeScreen('menu')
            screenController.menu.username = ''
        }
    }
}