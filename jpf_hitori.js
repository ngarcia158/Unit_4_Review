"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: 
   Date:   

   Global Variables
   ================
   
   allCells
      References the TD cells within the Hitori table grid.   
      
   Function List
   =============

   startUp()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   switchPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors()
      Highlights the errors in the Hitori puzzle in a red font.
      
   showSolution()
      Shows the solution to the Hitori puzzle
    
   checkSolution()
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating)
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.
	
*/


var allCells;

//makes the funciton startup run as soon as page is loaded
window.onload = startUp();

function startUp(){
   //makes it so the puzzle buttons variable equals the elements gthat have the class name puzzles and inserts the title name ouzzle 1
   var puzzleButtons = document.getElementsByClassName("puzzles")
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   //inserts puzzle one into the page
   document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);

   //a for loop to run the switch puzzle everytime a puzzle button gets clicked
   for(var i = 0; i < puzzleButtons.length; i++){
      puzzleButtons[i].onclick = switchPuzzle;
   }
   setupPuzzle();

   //makes it so witht he buttons that solves and gives you hints runs the function to do this on a click of them
   document.getElementById("check").addEventListener("click", findErrors);
   document.getElementById("solve").addEventListener("click", showSolution);
}
function switchPuzzle(e){
   //if you try and switch puzzles the text below will display
   if(confirm("YOU WILL LOSE ALL PROGRESS: continue?")){
      //makes a variable for the puzzle id
      var puzzleID = e.target.id;
      document.getElementById("puzzleTitle").innerHTML = e.target.value;

      //makes a switch case to switch the puzzle based on what button is clicked so it will make puzzle 1 if puzzle 1 is clikced 
      switch(puzzleID){
         case "puzzle1":
            document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
            break;
         case "puzzle2":
            document.getElementById("puzzle").innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
            break;
         case "puzzle3":
            document.getElementById("puzzle").innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
            break;
      }

      //runs setUpPuzzle function
      setupPuzzle();
   }

}

function setupPuzzle(){
   //gives the variable a value of any td in a table in the html
   allCells = document.querySelectorAll("table td")

   for(var i = 0; i<allCells.length; i++){
      //changes the bcakground, color, and font to a base color
      allCells[i].style.backgroundColor = "white";
      allCells[i].style.color = "black";
      allCells[i].style.borderRadius = 0;

      allCells[i].addEventListener("mousedown", function(e){
         //makes a function so on mousedown with the shift key nothing changes about the color but 
         //with alt changes the background color to black and font color to white
         //and anything else uses special colors 
         if(e.shiftKey){
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
            e.target.style.borderRadius = 0;
         }else if(e.altKey){
            e.target.style.backgroundColor = "black";
            e.target.style.color = "white";
            e.target.style.borderRadius = 0;

         }else{
            e.target.style.backgroundColor = "rgb(101, 101, 101)";
            e.target.style.color = "white";
            e.target.style.borderRadius = "50%";
         }
         //prevents any higlighting of website
         e.preventDefault();
      }
      )
      //makes it so the cursor changes with each click of the keypad with a mouse hover
         allCells[i].addEventListener("mouseover", function(e){
            if(e.shiftKey){
               e.target.style.cursor = "url(jpf_eraser.png), alias";
            }
            else if(e.altKey){
               e.target.style.cursor = "url(jpf_block.png), cell";
            }
            else{
               e.target.style.cursor = "url(jpf_circle.png), pointer";
            }
         }
      );
      //runs checkSolution when mouseup on the cells
      allCells[i].addEventListener("mouseup", checkSolution);
   }

}
//makes a function that will find the errors made
function findErrors(){
   //when you check your answers if it is wrong it the text turns red but only for a second and then changes to normal
   for(var e = 0; e<allCells.length;e++){
      if(allCells[e].className === "blocks" && allCells[e].style.backgroundColor === "rgb(101, 101, 101)" || allCells[e].className === "circles" && allCells[e].style.backgroundColor === "black"){
         allCells[e].style.color = "red";
      }
     
   }
   setTimeout(function() {
      for(var i = 0; i<allCells.length;i++){
      if(allCells[i].style.color === "red"){
         allCells[i].style.color = "white";
      } 
   }
   } ,1000);
}




         
/* ================================================================= */

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ( (cellClass == "blocks" && cellColor !== "black") || 
           (cellClass == "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}