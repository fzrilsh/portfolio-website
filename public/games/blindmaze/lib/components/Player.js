class Player {
    /**
     * @param {Cell} cell 
     */
    constructor(cell){
        this.cell = cell
        this.firstCell = cell

        this.cell.el.classList.add('player')
        this.registerEvents()
    }

    registerEvents(){
        window.onkeydown = this.handleKey.bind(this)
    }

    reset(){
        window.onkeydown = () => {}
        this.cell.el.classList.remove('player')
    }

    handleKey({ key }){
        if(!screenController.gameboard.isStarted) return false

        switch (key) {
            case 'w':
            case 'ArrowUp':
                this.move(0, -1)
                break;
            case 'a':
            case 'ArrowLeft':
                this.move(-1, 0)
                break;
            case 's':
            case 'ArrowDown':
                this.move(0, 1)
                break;
            case 'd':
            case 'ArrowRight':
                this.move(1, 0)
                break;
        }
    }

    move(dirX, dirY){
        let nextCell = screenController.gameboard.cells?.[this.cell.row + dirY]?.[this.cell.col + dirX]
        if(!nextCell) return false

        if(nextCell.isWall){
            screenController.gameboard.decreaseHeart()

            nextCell.el.classList.add('crashWall')
            setTimeout(() => {
                nextCell.el.classList.remove('crashWall')
            }, 400);

            return this.backToFirstPos()
        }

        this.cell.el.classList.remove('player')
        nextCell.el.classList.add('player')

        this.cell = nextCell

        if(this.cell === screenController.gameboard.finish){
            screenController.gameboard.nextStage()
        }
    }

    backToFirstPos(){
        this.cell.el.classList.remove('player')
        this.firstCell.el.classList.add('player')

        this.cell = this.firstCell
    }
}