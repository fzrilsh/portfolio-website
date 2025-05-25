class Gameboard {
    constructor() {
        this.el = document.querySelector('#gameboard')
        this.mazeContainer = this.el.querySelector('#mazeContainer')

        this.backButtonEl = this.el.querySelector('.back-btn')
        this.playerNameEl = this.el.querySelector('#playerName')
        this.timeLeftEl = this.el.querySelector('#timeLeft')
        this.stageNumberEl = this.el.querySelector('#stageNumber')

        this.isStarted = false
        this.player = null
        this.finish = null

        this.interval = null
        this.timePlayedInterval = null

        this.cells = []
        this.hearts = [...this.el.querySelectorAll('.hp-heart')]

        this.memorizeTime = 10
        this.moveTime = 20

        this.stage = 1
        this.times = 0
        this.timePlayed = 0
    }

    mount() {
        this.el.classList.add('active')
        this.resetInfoBoard()
        this.registerEvents()

        this.timePlayedInterval = setInterval(() => {
            this.timePlayed++
        }, 1000);
    }

    unMount() {
        document.getElementById('alertPopup').classList.remove('show')
        this.el.classList.remove('active')
        this.isStarted = false

        setTimeout(() => {
            this.removeEvents()
            this.resetHeart()

            this.cells.flat().forEach(cell => cell.el.remove())
            this.cells = []

            this.player?.reset()
            this.player = null
            this.finish = null

            clearInterval(this.interval)
            clearInterval(this.timePlayedInterval)
        }, 500);
    }

    resetInfoBoard() {
        this.timePlayed = 0
        this.times = this.memorizeTime
        this.stage = 1

        this.playerNameEl.textContent = screenController.menu.username
        this.timeLeftEl.textContent = `${this.times}s`
        this.stageNumberEl.textContent = this.stage
    }

    registerEvents() {
        this.backButtonEl.onclick = () => screenController.changeScreen('menu')

        this.generateMaze()
        this.setWalls()
    }

    removeEvents() {
        this.backButtonEl.onclick = () => { }
    }

    decreaseHeart() {
        let heart = this.hearts.pop()
        heart.remove()

        if(this.hearts.length){
            return sendAlert('You are hitting wall!', 'error', 1000)
        }

        sendAlert('Game Over.', 'error')
        clearInterval(this.interval)
        this.isStarted = false

        setTimeout(() => {
            screenController.changeScreen('gameover')
        }, 3000);
    }

    resetHeart() {
        this.el.querySelector('.hp-container').innerHTML = `
            <div class="hp-heart"></div>
            <div class="hp-heart"></div>
            <div class="hp-heart"></div>
            <div class="hp-heart"></div>
            <div class="hp-heart"></div>
        `
        this.hearts = [...this.el.querySelectorAll('.hp-heart')]
    }

    generateMaze() {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (!this.cells[row]) this.cells[row] = []
                this.cells[row][col] = new Cell(row, col)
            }
        }
    }

    setWalls() {
        this.player?.reset()
        this.cells.flat().forEach(cell => cell.reset())

        for (let index = 0; index < 35; index++) {
            let notWall = this.cells.flat().filter(cell => !cell.isWall)
            notWall[Math.floor(Math.random() * notWall.length)].setAsWall()
        }

        this.setPosition()
    }

    setPosition() {
        const cells = this.cells.flat()

        let cellForPlayer = cells.filter(cell => !cell.isWall && cell.col === 0)
        let cellForFinish = cells.filter(cell => !cell.isWall && cell.col === 9)
        if (!cellForPlayer.length || !cellForFinish.length) return this.setWalls()

        this.player = new Player(cellForPlayer[Math.floor(Math.random() * cellForPlayer.length)])
        this.finish = cellForFinish[Math.floor(Math.random() * cellForFinish.length)]
        this.finish.setAsFinish()

        const validateRoute = this.validatePath()
        if (!validateRoute) return this.setWalls()

        this.memorizingTime()
    }

    validatePath() {
        const start = this.player.cell
        const finish = this.finish

        let queue = [start]
        let visited = new Map([])

        const gScore = Array.from({ length: 10 }, () => Array(10).fill(Infinity))
        gScore[start.row][start.col] = 0

        const fScore = Array.from({ length: 10 }, () => Array(10).fill(Infinity))
        fScore[start.row][start.col] = heuristic(start, finish)

        while (queue.length > 0) {
            queue.sort((a, b) => fScore[a.row][a.col] - gScore[b.row][b.col])
            const current = queue.shift()

            if (current.row === finish.row && current.col === finish.col) {
                const path = []
                let temp = current
                while (temp) {
                    path.push(temp)
                    temp = visited.get(`${temp.row}:${temp.col}`)
                }

                return path.reverse()
            }

            const directions = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1],
            ]

            for (const [dirX, dirY] of directions) {
                const cell = this.cells?.[current.row + dirX]?.[current.col + dirY]
                if (!cell || cell.isWall) continue

                const tentative = gScore[current.row][current.col] + 1
                if (tentative < gScore[cell.row][cell.col]) {
                    visited.set(`${cell.row}:${cell.col}`, current)

                    gScore[cell.row][cell.col] = tentative
                    fScore[cell.row][cell.col] = tentative + heuristic(cell, finish)

                    if (!queue.some(q => q.row === cell.row && q.col === cell.col)) {
                        queue.push(cell)
                    }
                }
            }
        }

        return null
    }

    hideWalls(status = true) {
        this.cells.flat().filter(cell => cell.isWall).forEach(cell => cell.el.classList.toggle('wall', !status))
    }

    memorizingTime() {
        sendAlert('Memorizing time...', 'info')

        this.times = this.memorizeTime
        this.interval = setInterval(() => {
            this.times--
            this.timeLeftEl.textContent = `${this.times}s`

            if (this.times <= 0) {
                clearInterval(this.interval)
                this.playGame()
            }
        }, 1000);
    }

    playGame() {
        sendAlert('Walls hidden. Game started.', 'info')

        this.hideWalls()
        this.isStarted = true

        this.times = this.moveTime
        this.timeLeftEl.textContent = `${this.times}s`

        this.interval = setInterval(() => {
            this.times--
            this.timeLeftEl.textContent = `${this.times}s`

            if (this.times <= 0) {
                clearInterval(this.interval)
                this.resetStage()
            }
        }, 1000);
    }

    resetStage() {
        sendAlert('Time has run out. Restarting stage...', 'error')
        clearInterval(this.interval)
        this.isStarted = false

        setTimeout(() => {
            this.player.backToFirstPos()
            this.hideWalls(false)
            this.memorizingTime()
        }, 3000);
    }

    nextStage() {
        sendAlert('Congratulation! going to next stage...', 'success')
        clearInterval(this.interval)

        this.isStarted = false
        this.stage++

        setTimeout(() => {
            this.setWalls()
            this.stageNumberEl.textContent = this.stage
        }, 3000);
    }
}