function increase_stitch() {
    let stitches_count = parseInt(document.getElementById('stitches-counter').innerHTML)
    let rows_count = parseInt(document.getElementById('rows-counter').innerHTML)
    prev_stitches = stitches_count
    prev_rows = rows_count
    stitches_count++
    if (document.getElementById('input-autoincrease').checked) {
        if (stitches_count >= parseInt(document.getElementById('input-stitches').value)) {
            rows_count++
            stitches_count = 0
        }
    }
    document.getElementById('rows-counter').innerHTML = rows_count
    document.getElementById('stitches-counter').innerHTML = stitches_count
}

function increase_row() {
    let stitches_count = parseInt(document.getElementById('stitches-counter').innerHTML)
    let rows_count = parseInt(document.getElementById('rows-counter').innerHTML)
    prev_stitches = stitches_count
    prev_rows = rows_count
    rows_count++
    document.getElementById('rows-counter').innerHTML = rows_count
    document.getElementById('stitches-counter').innerHTML = 0
}

function reset() {
    let stitches_count = parseInt(document.getElementById('stitches-counter').innerHTML)
    let rows_count = parseInt(document.getElementById('rows-counter').innerHTML)
    prev_stitches = stitches_count
    prev_rows = rows_count
    document.getElementById('rows-counter').innerHTML = 0
    document.getElementById('stitches-counter').innerHTML = 0
}

function undo() {
    let stitches_count = parseInt(document.getElementById('stitches-counter').innerHTML)
    let rows_count = parseInt(document.getElementById('rows-counter').innerHTML)
    document.getElementById('rows-counter').innerHTML = prev_rows
    document.getElementById('stitches-counter').innerHTML = prev_stitches
    prev_stitches = stitches_count
    prev_rows = rows_count
}

document.getElementById('button-stitch').onclick = increase_stitch
document.getElementById('button-row').onclick = increase_row
document.getElementById('button-reset').onclick = reset
document.getElementById('button-undo').onclick = undo

let prev_stitches = 0
let prev_rows = 0
