alert("contentScript entrance");

setTimeout(evalInjection,  5000);  

function evalInjection() {
    const whiteBar = document.querySelector('.evaluation-bar-white'); // white bar main class (unchanged)
    const blackBar = document.querySelector('.evaluation-bar-black'); // black bar class
    const drawBar = document.querySelector('.evaluation-bar-draw'); // draw bar class


    /**    const whiteBar = document.querySelector('.evaluation-bar-white'); // white bar main class (unchanged)
    const blackBar = document.querySelector('.evaluation-bar-black'); // black bar class
    const black2ndBar = document.querySelector('.evaluation-bar-draw'); // draw bar class
 */
    whiteBar.style.cssText = "background-color: red";
    blackBar.style.cssText = "background-color: blue";
    drawBar.style.cssText = "background-color: green";


    let eval = get2ndLine();
    height = getEvalHeight(eval);
    console.log("2nd Line Eval: "+eval);
    console.log("White bar height %age: "+height);

    let height2 = 100-height;

    whiteBar.style.cssText = `background-color: grey; transform: translate3d(0px, ${height}%, 0px);`;
    drawBar.style.cssText = `background-color: red; transform: translate3d(0px, ${height2*(1/3)}%, 0px);`;
    blackBar.style.cssText = `background-color: yellow; transform: translate3d(0px, ${height2 *(2/3)}%, 0px);`;
    console.log("Draw bar height %age: "+height2*(1/3));
    console.log("Black bar height %age: "+height2*(2/3));

    /* Bar behavior: 
    
    - white bar overwrites all others
    - black bar overwrites draw bar
    - draw bar is the lowest */
    /* let greyBar = document.createElement('div');
    greyBar.style.cssText = `background-color: grey; height: ${height}%; transform: translate3d(0px, ${height}%, 0px);`;
    blueBar.style.cssText = "background-color: blue; height: 5%; transform: translate3d(0px, 28.325%, 0px);"
    while (whiteBar.firstChild) {
        whiteBar.removeChild(whiteBar.firstChild);
    }
    whiteBar.appendChild(greyBar);
    whiteBar.appendChild(blueBar);*/
}

function getEvalHeight(eval){
    let height = 2;
    if (eval >= 4 || eval <= -4) {
        if (eval >= 4) {
            height = 95;
        } else {
            height = 5;
        }
    } else {
        height = (eval*-11.25) + 50;
    }
    return height;
}

function get2ndLine() {
    let lines = document.querySelectorAll(".evaluation-lines-score");
    let secondEvalStr = "";
    if (lines.length >= 2) {
       secondEvalStr = lines[1].textContent;
       console.log(secondEvalStr);
       let secondEval = parseFloat(secondEvalStr);
       return secondEval;
    } else {
        console.log("Not enough elements with the specified class.");
    }
}  