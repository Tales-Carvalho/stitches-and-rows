MAX_HISTORY_LENGTH = 32

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

document.getElementById('button-stitch').onclick = increase_stitch
document.getElementById('button-row').onclick = increase_row
document.getElementById('button-reset').onclick = reset
document.getElementById('button-undo').onclick = undo

input_stitches.onchange = () => {
    localStorage['input_stitches'] = input_stitches.value
}

input_autoincrease.onclick = () => {
    localStorage['input_autoincrease'] = input_autoincrease.checked
}