class Screen {
    constructor(){
        this.currentScreen = null

        // all screens
        this.menu = new Menu()
        this.gameboard = new Gameboard()
        this.gameover = new GameOver()
        this.leaderboard = new Leaderboard()

        this.changeScreen('menu')
    }

    changeScreen(screen){
        if(this.currentScreen) this.currentScreen.unMount()

        this.currentScreen = this[screen]
        this.currentScreen.mount()
    }
}

const screenController = new Screen()