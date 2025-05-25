class Cell {
    constructor(row, col){
        this.el = document.createElement('div')
        this.el.className = 'maze-cell';

        this.w = 40
        this.h = 40
        
        this.row = row
        this.col = col

        this.isWall = false
        this.isFinish = true

        this.append()
    }

    append(){
        screenController.gameboard.mazeContainer.appendChild(this.el)
    }

    setAsWall(){
        this.isWall = true
        this.el.classList.add('wall')
    }

    setAsFinish(){
        this.isFinish = true
        this.el.classList.add('finish')
    }

    reset(){
        this.isWall = false
        this.isFinish = false
        this.el.className = 'maze-cell'
    }
}