class Leaderboard {
    constructor() {
        this.el = document.querySelector('#leaderboard')
        this.leaderboardBody = this.el.querySelector('#leaderboardBody')
        this.backButton = this.el.querySelector('.back-btn')
        this.button = this.el.querySelector('.btn')
    }

    mount() {
        this.el.classList.add('active')

        this.datas = JSON.parse(localStorage.getItem('leaderboard') ?? '[]')
        this.datas.sort((a, b) => {
            if (b.stage !== a.stage) {
                return b.stage - a.stage
            }

            return a.timePlayed - b.timePlayed
        })

        this.backButton.onclick = () => screenController.changeScreen('gameOver')
        this.button.onclick = () => screenController.changeScreen('menu')

        this.leaderboardBody.innerHTML = this.datas.map((data, i) => {
            data.timePlayed = parseInt(data.timePlayed)
            let s = data.timePlayed % 60
            let m = Math.floor(data.timePlayed / 60) % 60
            let h = Math.floor(data.timePlayed / 3600)

            return `<tr>
                <td>${i + 1}</td>
                <td>${data.username}</td>
                <td>${data.stage}</td>
                <td>${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}</td>
            </tr>`
        }).join('')
    }

    unMount() {
        this.el.classList.remove('active')

        this.backButton.onclick = () => { }
        this.button.onclick = () => { }
    }
}