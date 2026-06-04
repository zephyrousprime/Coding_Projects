
function multiple() {
    let mult = document.getElementById("mult").value
    mult = parseInt(mult)
    let check = document.getElementById("check").value
    check = parseInt(check)
    
    if (check%mult === 0) {
        document.getElementById("result").innerHTML = "The number is a multiple of " + mult
    } else {
        document.getElementById("result").innerHTML = "The number is not a multiple of " + mult
    }
}
