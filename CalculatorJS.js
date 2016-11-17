//---------Global variable--------
var myCalculation = ''; // This is the string that is presented on the calcScreen
var currentKey; // Holds the value of the most recent button which was clicked
var calcString = []; // accumulates the numbers and actions to be calculated in the end
var newNumber = true; // designates whether the current number is still in the writing process, or is it a new one which is following one of thew action buttons (+,-, *, etc.)

$(document).ready(startHere);

function startHere() {
    $('.calcButtons').on('click', function () {

        if (newNumber) {
            myCalculation = '';
            newNumber = false;
        }


        if (this.id == 'btnPlus') {
            //currentKey = '+';
            addNumber(myCalculation, '+');
        } else if (this.id == 'btnMinus') {
            currentKey = '-';
            addNumber(myCalculation, currentKey);
        } else if (this.id == 'btnTimes') {
            currentKey = '*';
            addNumber(myCalculation, currentKey);
        } else if (this.id == 'btnDivide') {
            currentKey = '/';
            addNumber(myCalculation, currentKey);
        } else if (this.id == 'btnEquals') {
            calcString.push(myCalculation); // Adds the last number on the screen
            finalCalculation();


        } else { // Means that a Number or .  was clicked

            currentKey += this.id;
            newNumber = false;
            myCalculation += this.id;
            $('#digitOutput').html(myCalculation);

        };
    })
};

function addNumber(currentNumber, sign) {
    newNumber = true;
    calcString.push(currentNumber);
    calcString.push(sign);
    console.log(calcString);

}

function finalCalculation() {
    var totalSum = 0;
    var figureA;
    var figureB;
    var thisSign;

    if (calcString.length > 1) {
        figureA = parseInt(calcString[0]);
        figureB = parseInt(calcString[2]);
        thisSign = calcString[1];
        console.log(figureA);
        console.log(figureB);
        console.log(thisSign);
        calcString.splice(0, 3); // At position 0 remove 3 items


        switch (thisSign) {
            case '+':
                totalSum = figureA + figureB;
                break;
            case '-':
                totalSum = figureA - figureB;
                break;
            case '*':
                totalSum = figureA * figureB;
                break;
            case '/':
                totalSum = figureA / figureB;
                break;
            default: //do nothing
        }
        console.log('totalSum now is:' + totalSum);
        calcString.splice(0, 0, totalSum);
        console.log('calcString: ' + calcString);
        finalCalculation();
    } else {
        //$('#digitOutput').html(calcString[0]);
        var thisResult = calcString[0];
        calcString = [];
        newNumber = true;
        $('#digitOutput').html(thisResult);

    }

}
