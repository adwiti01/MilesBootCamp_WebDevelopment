/* Global Constants and Variables declaration */
const userOptions = {
    ROCK : 'rock',
    PAPER : 'paper',
    SCISSOR : 'scissor'
} 

const user = "Player"; 
const comp = "Computer";
const tie = "tie";
const defaultRounds = 3;//sets the default number of rounds

var userSelection; //stores the selection made by the player
var compSelection; //stores the selection made by the computer
var usrScore ;  // No. of times player wins
var compScore ; // No. of times Computer wins 
var tieScore ;  // No. of times there is a Tie between player and computer

//Function to play the game through the console or on click of the "Let's Play" button
function playGame()
{  
    console.clear(); 

    //gets user input for number of rounds, default number of rounds is set
    var userInput = prompt("How many rounds do you want to play?",defaultRounds); 

    // Initializes the score counters for every click of the play button
    usrScore = 0;  
    compScore = 0; 
    tieScore = 0;

    if(userInput!=null  && userInput!="")
    { 
        var rounds = parseInt(userInput); //stores no. of rounds to be played    

        /* When an invalid input is provided for the number of rounds 
        the user is prompted to provide a correct input, until they
        provide a valid input or choose to Cancel */
        while(isNaN(rounds))
        {        
            userInput = prompt("That was an invalid input. Let's try again.\n How many rounds do you want to play?",defaultRounds);            
            if(userInput==null)//when CANCEL is clicked
            {
                break;
            }
            rounds = parseInt(userInput);            
        }
        if(userInput!=null && userInput!="")
        {
            console.log("%cLet's Play",'color:green');
            console.log("We will play",rounds,"rounds of Rock Paper Scissor");
            
            //Loops for the number of rounds specified 
            for(var i=1; i<=rounds; i++)
            {
                console.log("%cRound",'color:blue',i);
                getCompSelection(); //generates Computer's selection
                userSelection = prompt ("( Rock Paper Scissor ) SHOOT your option !!! \n This is Round " + i);
                if(userSelection!=null && userSelection!="")
                {
                    //Calls the function to check the user selected 
                    //option comparing it with the enum userOptions
                    checkUserSelection(userSelection.toLowerCase(),compSelection.toLowerCase()); 

                    //Gets the result of this round as well as the scores uptil this round                    
                    var result = getResult(userSelection.toLowerCase(),compSelection.toLowerCase());

                    //Displays the result and scores
                    if(result !=null && result.toLowerCase()==tie)
                    {
                        console.log("%cResult :",'color:green','Its a',tie);
                    }
                    else
                    {
                        console.log('%cResult :','color:green',result,'wins');
                    }
                    console.log("%cScore :","color:red",user,"wins",usrScore,comp,"wins",compScore,"They Tied",tieScore,tieScore<=1?"time":"times");
                }
                else
                {
                    return;
                }               
                
            }
        }
        
    }    
    return;       
        
}

/*Function to generate the computer's selection 
by generating a random whole number between 0 and 9 and 
setting the default selection as Rock if the number is less than equal to 3,
setting the selection as Paper if the number is between 3 and 6,
setting the selection as Scissor if the number is greater than 6.*/
function getCompSelection()
{
    let num = Math.floor(Math.random()*10);                
    compSelection = "";                
    switch(true)
    {                    
        case (num > 3 && num <= 6):
        {
            compSelection = userOptions.PAPER;
            break;
        }
        case (num > 6 ):
        {
            compSelection = userOptions.SCISSOR;
            break;
        }
        default:
        {
            compSelection = userOptions.ROCK;
            break;
        }
    }
}

/*Function to check and display the user selection
 as well as the computer selection*/
function checkUserSelection(usrSel,compSel)
{    
    switch (usrSel)
    {        
        case userOptions.PAPER :
        {
            console.log(user,"selected",userOptions.PAPER,"and",comp,"selected",compSel);
            break;
        }
        case userOptions.SCISSOR :
        {
            console.log(user,"selected",userOptions.SCISSOR,"and",comp,"selected",compSel);
            break;
        }            
        case userOptions.ROCK :
        {
            console.log(user,"selected",userOptions.ROCK,"and",comp,"selected",compSel);
            break;
        }
        default:
        {
            userSelection = userOptions.ROCK;
            console.log(user,"selected",userOptions.ROCK,"and",comp,"selected",compSel);
            break;
        }                        
    }    
}

/*Function to decide the result by comparing the user and computer selections
Its a tie when both select the same options. In other cases the game rules are 
used to compare the selections and decide the winner of that round.
Based on who wins a round the score of the player or computer is incremented.
If its a tie, the counter which keeps track of the no. of times a Tie happened
 is incremented. */
function getResult(userSel,compSel)
{
    var res="";
    switch(userSel)
    {
        case compSel:
        {
            res = "tie";
            tieScore++;
            break;
        }
        case userOptions.ROCK:
        {
            if(compSel===userOptions.PAPER)
            {
                res = comp;
                compScore++;                
            }
            else
            {
                res = user;
                usrScore++;
            }
            break;
        }
        case userOptions.PAPER:
        {
            if(compSel===userOptions.ROCK)
            {
                res = user;
                usrScore++;
            }
            else
            {
                res = comp;
                compScore++;
            }
            break;
        } 
        case userOptions.SCISSOR:
        {
            if(compSel===userOptions.ROCK)
            {
                res = comp;
                compScore++;
            }
            else
            {
                res = user;
                usrScore++;
            }
            break;
        }        
    }
    return res;
}