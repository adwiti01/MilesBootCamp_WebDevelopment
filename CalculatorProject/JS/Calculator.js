//Enum for the operators 
const operators = {
    ADD : 'Add',
    SUBTRACT : 'Subtract',
    MULTIPLY : 'Multiply',
    DIVIDE : 'Divide'
}

const firstNumEle = document.getElementById('txtFirst'); //gets the first number textbox 
const secondNumEle = document.getElementById('txtSecond'); //gets the second number textbox
const resultEle = document.getElementById("lblResult"); //gets the result label

//Function to set focus on the first or second number textbox
function setFocus()
{ 
    if(firstNumEle.value=="") 
    {
        firstNumEle.focus();     
    }
    else if(secondNumEle.value=="") 
    {
        secondNumEle.focus();
    }
}

//Function to clear or reset controls
function resetControls()
{ 
    firstNumEle.value = "";
    secondNumEle.value = "";
    resultEle.innerText="";

    getsetOperator("set"); //clear the selection of radio buttons

    setFocus();
}

/**JSDoc
 * Function to check for all numbers entered in a given textbox
 * @since 1.0.1
 * not used anymore
 */
function validateTextBox(id)
{
    let num = document.getElementById(id).value;
    if(num!=null)
    {
        let reg = new RegExp('^[0-9]+$');        
        
        if(!reg.test(num))
        {
            alert("Invalid input. Please enter numbers only.");
            document.getElementById(id).select();
        }
    }
}

//Function to select only one particular radio button
function selectRadio(id)
{
    document.getElementById(id).checked = true;
}

//Function to get the result of the operation to be 
//performed on the numbers entered
//and display it
function getResult()
{
    let firstNum = parseFloat(firstNumEle.value);
    let secondNum = parseFloat(secondNumEle.value);
    let mathOP = getsetOperator("get"); //get the operator selected
        
    let result = 0;

    if(firstNumEle.value!="" && secondNumEle.value!="")
    {
        if(mathOP!=null && mathOP!="")
        {
            result = doMath(firstNum,secondNum,mathOP);
            if(result=="errorDivZero")
            {
                resultEle.innerText = "";
            }
            else
            {
                let lastchar = mathOP.toLowerCase().charAt(mathOP.length-1); //remove e from Divide before displaying in result if operation is Divide
                
                resultEle.innerText =  "The result of " + (lastchar =="e" ? mathOP.toLowerCase().slice(0,-1) : mathOP.toLowerCase()) + "ing " + firstNum + " and " + secondNum + " is " + result.toFixed(3);
            }
        }
        else
        {
            alert("Please select an operation.");
        }
    }
    else
    {        
        alert("Please enter the numbers");
        setFocus();
    }

}

//Function to check which radio button is selected (get)
//or to reset selection of radio buttons on cancel (set)
function getsetOperator(prop)
{
    let radioEle = document.getElementsByName('operations');
    let op;

    if(prop=="get")
    {
        //for in loop used instead of foreach to break away from loop 
        //when checked radio button is detected
        for(element in radioEle)
        {
            if(radioEle[element].checked)
            {
                op = radioEle[element].value;
                return op;
            }
        }
    }
    else
    {
        radioEle.forEach((element) => {
            element.checked = false;
        }); 
    }    
}

//Function to do the mathematical calculation 
//on the two operands using the selected operator
//and return the result or error in case user tries
//division by zero
function doMath(num1, num2, op)
{
    let result = 0;
    switch(op){
        case operators.ADD :  {
            result = num1 + num2;
            break;          
        }
        case operators.SUBTRACT : {
            result = num1 - num2;
            break;
        }
        case operators.MULTIPLY : {
            result = num1 * num2;
            break;                
        }
        case operators.DIVIDE : {
            if(num2==0){
                alert("Division by Zero is not allowed.\nPlease provide a different second number.");
                document.getElementById('txtSecond').select();
                result="errorDivZero";
                return result;
            }
            else
            {
                result = num1 / num2;
                break;
            }
        }
        default : {
            break;
        }    
    }
    return result;
}