$( document ).ready(function() {
 
// Variables
let gridDimension = document.querySelectorAll(".cell");
// let gameColumns = $(".gameBoard").css("grid-template-columns").split(" ").length;
// let gameRows = $(".gameBoard").css("grid-template-rows").split(" ").length; 
let totalCells = "";
let cellSize = 50; // The size of all cells
let cellDataNumbers = []; // This is a matrix of the numbers representing all cells, in the same rows/columns as UI

// Event Listeners

// Resizes the gameboard to match when the user resizes their screen
$(window).resize(function() {
    createGameBoard();
});
createGameBoard();

// Changes a cell to alive when clicked
$(window).click(function(event) {
    let targetId = (event.target.id);
    let targetDataId = $(event.target).data('number');
    spawnLife(targetId);
    console.log("targetDataId: ",targetDataId,"cellDataNumbers",cellDataNumbers,"left: ", "right: ","up: ", "down: " );
});

createGameBoard();

// this sets the total rows and columns for the game
function createGameBoard() {
    let columnStyle = ""
    let rowStyle = ""
    let windowWidth = $(window).width(); // the total width of the screen size
    let windowHeight = $(window).height(); // the total height of the screen size
    let gameColumns = Math.round(windowWidth/cellSize);
    let gameRows = Math.round(windowHeight/cellSize);

    for(let i = 0; i < gameColumns; i++) {
        columnStyle = columnStyle + "auto ";
    }

    for(let i = 0; i < gameRows; i++) {
        rowStyle = rowStyle + "auto ";
    }

    $(".gameBoard").css({"grid-template-columns": columnStyle})
    $(".gameBoard").css({"grid-template-rows": rowStyle})

    totalCells = gameColumns * gameRows;

    // this creates a div for all cells (totalCells) and displays them in the UI
    function populateCells(countOfCells) {
        $( ".gameBoard" ).empty();
        let cellIndex = 0
        for (cellIndex; cellIndex < countOfCells;) {
            let cellDataColumn = [];
            
                
                    for(let i = 0; i < gameColumns; i++) {
                        let randomId = spawnRandomId(10);
                        let dataNumber = cellIndex++;
                        cellDataColumn.push(dataNumber);
                        let cellDiv = `<button class="cell dead" id="${randomId}" data-number="${dataNumber}" ></button>`; // the div used to show cells in UI/DOM
                        $( ".gameBoard" ).append( $( cellDiv ) );
                    }
               
                    cellDataNumbers.push(cellDataColumn);
    }
}
populateCells(totalCells);

}

// This function returns a grid for all cells showing in the UI
function createCellArray(countOfCells) {
    // Loop through all divs with forEach() and target the dataNumber 
    // Refer to partially completed for loops in populateCells()
}

// This function brings a cell to life based on the id entered into the parameter
function spawnLife(id) {
    $(`.cell#${id}`).removeClass("dead").addClass("alive");
}

function spawnRandomId(idLength) {
    
    let randomId = [];
    let priorChar = "";

    for (let i = 0; i < idLength; i++) {
        // Generate a random number between 0 and 25 (inclusive)
        let randomNumber = Math.floor(Math.random() * 26);

        // Convert the random number to a letter using ASCII codes
        let randomLetter = String.fromCharCode(97 + randomNumber); // ASCII code for 'a' is 97

        if(typeof priorChar === "string") {
            randomId = randomId + `${randomNumber}`;
            priorChar = randomNumber;
        } else {
            randomId = randomId + `${randomLetter}`;
            priorChar = randomLetter;
            
        }
    }

    // return randomLetter;
    return randomId;
}

// Error Reporting
// function duplicateIdError() {
//    for (let i = 0; i < )
//     throw Error ("Multiple cells have the same ID. Please adjust your code.") 
// }

// Test functions
// console.log("gameColumns:",gameColumns, gameRows, totalCells);


});



