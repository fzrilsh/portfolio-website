/**
 * @param {string} message 
 * @param {string} type | success/error/info 
 */
function sendAlert(message, type, ms = 3000, callback = () => {}) {
    const alertPopup = document.getElementById('alertPopup')
    alertPopup.textContent = message
    alertPopup.className = `alert-popup ${type}`
    alertPopup.classList.add('show')

    setTimeout(() => {
        alertPopup.classList.remove('show')
        if(callback) callback()
    }, ms);
}

/**
 * @param {Cell} a 
 * @param {Cell} b 
 * @returns {number}
 */
function heuristic(a, b){
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}