//alert("contentScript entrance");

setTimeout(evalInjection,  5000);  

function evalInjection() {
    const whiteBar = document.querySelector('.evaluation-bar-white'); // white bar main class (unchanged)
    const white2ndBar = document.querySelector('.evaluation-bar-black'); // black bar class
    const black2ndBar = document.querySelector('.evaluation-bar-draw'); // draw bar class

    let eval = get2ndLine();
    height = getEvalHeight(eval);
    console.log("2nd Line Eval: "+eval);
    console.log("White bar height %age: "+height);

    let height2 = 100-height;

    whiteBar.style.cssText = `background-color: rgb(205, 205, 205); transform: translate3d(0px, ${height}%, 0px);`;
    white2ndBar.style.cssText = `background-color: rgb(250,250,250); transform: translate3d(0px, ${height2 *(2/3)}%, 0px);`;
    black2ndBar.style.cssText = `background-color: rgb(80,80,80); transform: translate3d(0px, ${height2*(1/3)}%, 0px);`;
    console.log("Draw bar height %age: "+height2*(1/3));
    console.log("Black bar height %age: "+height2*(2/3));

    /* Bar behavior: 
    
    - white bar overwrites all others
    - black bar overwrites draw bar
    - draw bar is the lowest */
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
            return "white";
        } else if (numberOfPeriods === 3) {
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
      return "white";
    } else if (threePeriodsMatches === 1) {
      return "black";
    } else {
      return "unknown";
    }
  }
  