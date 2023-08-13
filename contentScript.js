//alert("contentScript entrance");

setTimeout(evalInjection,  5000);  

let showBarFor = "";

function evalInjection() {
    const whiteBar = document.querySelector('.evaluation-bar-white'); // white bar main class (unchanged)
    const white2ndBar = document.querySelector('.evaluation-bar-black'); // black bar class
    const black2ndBar = document.querySelector('.evaluation-bar-draw'); // draw bar class

    let eval1 = get1stLine();
    let height1 = getEvalHeight(eval1);

    let eval2 = get2ndLine();
    height2 = getEvalHeight(eval2);

    console.log("1st Line Eval: "+eval1);
    console.log("2nd Line Eval: "+eval2);

    if (showBarFor == "black") {
        whiteBar.style.cssText = `background-color: rgb(205, 205, 205);transform: translate3d(0px, ${height1}%, 0px);`;
        white2ndBar.style.cssText = `background-color: rgb(250,250,250);transform: translate3d(0px, ${height1}%, 0px);`;
        black2ndBar.style.cssText = `background-color: rgb(80,80,80);transform: translate3d(0px, ${height2}%, 0px);`;
        console.log("BLACK TO MOVE")
        console.log("Height1 (wB1, wB2): "+height1);
        console.log("Height2 (bB2): "+height2);
    } else {
        black2ndBar.style.cssText = `background-color: rgb(80,80,80);transform: translate3d(0px, ${100}%, 0px);`;
        white2ndBar.style.cssText = `background-color: rgb(250,250,250); transform: translate3d(0px, ${height1}%, 0px);`;
        whiteBar.style.cssText = `background-color: rgb(205,205,205) !important; transform: translate3d(0px, ${height2}%, 0px);`;
        console.log("WHITE TO MOVE")
        console.log("Height1 (wB2, bB2): "+height1);
        console.log("Height2 (wB1): "+height2);
    }
    
    /* Bar behavior: 
    
    - white bar overwrites all others
    - black bar overwrites draw bar
    - draw bar is the lowest */
}

function getEvalHeight(eval){
    let height = 2;
    if (eval >= 4 || eval <= -4) {
        if (eval >= 4) {
            height = 5;
        } else {
            height = 95;
        }
    } else {
        height = (eval*-11.25) + 50;
    }
    return height;
}

function get1stLine() {
    let line1 = document.querySelector(".evaluation-lines-score");
    let firstEvalStr = line1.textContent;
    let firstEval = parseFloat(firstEvalStr);
    return firstEval;
}

function get2ndLine() {
    let lines = document.querySelectorAll(".evaluation-lines-score");
    let secondEvalStr = "";

    if (lines.length >= 2) {
       secondEvalStr = lines[1].textContent;
       let moveNode = lines[1].nextElementSibling;

       let moveNodeText = moveNode.textContent;
       console.log("Move text: " +moveNodeText);

       let moveTurn = checkPeriods(moveNodeText);
       console.log("Move turn: "+moveTurn);
       console.log(secondEvalStr);

       let secondEval = parseFloat(secondEvalStr);
       return secondEval;
    
    } else {
        console.log("Not enough elements with the specified class.");
    }
}  

function getMoveTurn(input) {
    const match = input.match(/^(\d+)(\.|\.{3}).*/);
    
    if (match) {
        const numberOfPeriods = match[2].length;
        
        if (numberOfPeriods === 1) {
            showBarFor = "white";
            return "white";
        } else if (numberOfPeriods === 3) {
            showBarFor = "black";
            return "black";
        }
    }
    
    return "invalid move";
}

function checkPeriods(str) {
    const onePeriodRegex = /\./g;
    const threePeriodsRegex = /\.{3}/g;
  
    const onePeriodMatches = (str.match(onePeriodRegex) || []).length;
    const threePeriodsMatches = (str.match(threePeriodsRegex) || []).length;
  
    if (onePeriodMatches === 1) {
        showBarFor = "white";
        return "white";
    } else if (threePeriodsMatches === 1) {
        showBarFor = "black";
        return "black";
    } else {
      return "unknown";
    }
  }
  