class Menu {
    constructor(){
        this.el = document.querySelector('#menu')
        this.instructionEl = document.querySelector('#instructions')
        this.usernameEl = this.el.querySelector('#usernameInput')
        this.playButton = this.el.querySelector('#playGame')
        this.showInstructionButton = this.el.querySelector('#showInstruction')

        this.username = ''
    }

    mount(){
        this.el.classList.add('active')
        this.registerEvents()
    }

    unMount(){
        this.el.classList.remove('active')
        this.removeEvents()
    }

    registerEvents(){
        this.usernameEl.value = this.username

        this.usernameEl.oninput = () => {
            this.playButton.disabled = !this.usernameEl.value
            this.username = this.usernameEl.value
        }

        this.playButton.onclick = () => {
            screenController.changeScreen('gameboard')
            this.usernameEl.value = ''
        }

        this.showInstructionButton.onclick = () => this.instructionEl.classList.add('active')
        this.instructionEl.querySelector('button').onclick = () => this.instructionEl.classList.remove('active')
    }

    removeEvents(){
        this.usernameEl.oninput = () => {}
        this.playButton.onclick = () => {}
        this.showInstructionButton.onclick = () => {}
        this.instructionEl.querySelector('button').onclick = () => {}
    }
}