MAX_HISTORY_LENGTH = 32
PIP_WINDOW_SIZE = { width: 280, height: 140 }

class Counter {
    constructor (
        counterElementId,
        localStorageTag
    ) {
        this.counterElement = document.getElementById(counterElementId)
        this.localStorageTag = localStorageTag
        this.count = parseInt(localStorage[this.localStorageTag] || '0')
        this.counterElement.innerHTML = this.count
        this.history = []
    }
    set = (number) => {
        this.history.push(this.count)
        if (this.history.length > MAX_HISTORY_LENGTH) {
            this.history.splice(0, this.history.length - MAX_HISTORY_LENGTH)
        }
        this.count = number
        localStorage[this.localStorageTag] = this.count
        this.counterElement.innerHTML = this.count
    }
    increase = () => {
        this.set(this.count + 1)
    }
    undo = () => {
        if (this.history.length > 0) {
            this.count = this.history.pop()
            localStorage[this.localStorageTag] = this.count
            this.counterElement.innerHTML = this.count
        }
    }
}

const stitches_counter = new Counter('stitches-counter', 'stitches')
const rows_counter = new Counter('rows-counter', 'rows')

const input_autoincrease = document.getElementById('input-autoincrease')
const input_stitches = document.getElementById('input-stitches')

input_autoincrease.checked = (localStorage["input_autoincrease"] === 'true')
input_stitches.value = localStorage["input_stitches"] || ""

function increase_stitch() {
    if (input_autoincrease.checked && stitches_counter.count + 1 >= parseInt(input_stitches.value)) {
        rows_counter.increase()
        stitches_counter.set(0)
    }
    else {
        stitches_counter.increase()
        rows_counter.set(rows_counter.count)
    }
}

function increase_row() {
    rows_counter.increase()
    stitches_counter.set(0)
}

function reset() {
    rows_counter.set(0)
    stitches_counter.set(0)
}

function undo() {
    rows_counter.undo()
    stitches_counter.undo()
}

function edit() {
    const new_stitches_counter = parseInt(prompt("Stitches:", stitches_counter.count))
    const new_rows_counter = parseInt(prompt("Rows:", rows_counter.count))
    stitches_counter.set(isNaN(new_stitches_counter) ? stitches_counter.count : new_stitches_counter)
    rows_counter.set(isNaN(new_rows_counter) ? rows_counter.count : new_rows_counter)
}

class PipManager {
    constructor (
        pip_element,
        pip_container,
        pip_button,
        pip_message,
        pip_window_size
    ) {
        this.pip_element = pip_element
        this.pip_container = pip_container
        this.pip_button = pip_button
        this.pip_message = pip_message
        this.pip_window_size = pip_window_size
        this.pip_button.addEventListener("click", this.start_pip)
    }
    start_pip = async () => {
        if (window.documentPictureInPicture.window) {
            return
        }
        this.pip_window = await window.documentPictureInPicture.requestWindow(
            this.pip_window_size
        )
        for (const styleSheet of document.styleSheets) {
            try {
                const cssRules = [...styleSheet.cssRules]
                    .map((rule) => rule.cssText)
                    .join("")
                const style = document.createElement("style")
                style.textContent = cssRules
                this.pip_window.document.head.appendChild(style)
            } catch (e) {
                const link = document.createElement("link")
                link.rel = "stylesheet"
                link.type = styleSheet.type
                link.media = styleSheet.media
                link.href = styleSheet.href
                this.pip_window.document.head.appendChild(link)
            }
        }
        this.pip_window.document.body.append(this.pip_element)
        this.pip_message.style.display = "block"
        this.pip_window.addEventListener("pagehide", this.stop_pip)
        this.pip_button.removeEventListener("click", this.start_pip)
        this.pip_button.addEventListener("click", this.stop_pip)
    }
    stop_pip = () => {
        this.pip_container.append(this.pip_element)
        this.pip_button.removeEventListener("click", this.stop_pip)
        this.pip_button.addEventListener("click", this.start_pip)
        this.pip_message.style.display = "none"
        if (window.documentPictureInPicture.window) {
            window.documentPictureInPicture.window.close()
        }
    }
}

new PipManager(
    document.getElementById('div-pip-element'),
    document.getElementById('div-pip-container'),
    document.getElementById('button-start-pip'),
    document.getElementById('div-pip-message'),
    PIP_WINDOW_SIZE
)

document.getElementById('button-stitch').onclick = increase_stitch
document.getElementById('button-row').onclick = increase_row
document.getElementById('button-reset').onclick = reset
document.getElementById('button-undo').onclick = undo
document.getElementById('button-edit').onclick = edit

input_stitches.onchange = () => {
    localStorage['input_stitches'] = input_stitches.value
}

input_autoincrease.onclick = () => {
    localStorage['input_autoincrease'] = input_autoincrease.checked
}
