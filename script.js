$( document ).ready(function() {
 
// Variables
let gridDimension = document.querySelectorAll(".cell");
// let gameColumns = $(".gameBoard").css("grid-template-columns").split(" ").length;
// let gameRows = $(".gameBoard").css("grid-template-rows").split(" ").length; 
let totalCells = "";
let cellSize = 50; // The size of all cells
let cellMatrixArray = []; // This is a matrix of the numbers representing all cells, in the same rows/columns as UI


// Event Listeners

// Resizes the gameboard to match when the user resizes their screen
$(window).resize(function() {
    createGameBoard();
});
createGameBoard();

// Changes a cell to alive when clicked
$(window).click(function(event) {
    let targetId = (event.target.id);
    spawnLife(targetId);
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
        let cellIndex = 0;
        let cellDataNumbers = [];
        $( ".gameBoard" ).empty();
        for (cellIndex; cellIndex < countOfCells;) {
            let cellDataRow = [];
            cellDataNumbers.push(cellDataRow);
            // console.log("cellDataRow: ", cellDataRow);
            for (let i = 0; i < gameRows; i++) {
                let cellDataColumn = [];
                cellDataRow.push(cellDataColumn);
                // console.log("cellDataColumn: ", cellDataColumn);
                for (let i = 0; i < gameColumns; i++) {
                    let columnIndex = Math.floor(cellIndex/gameColumns);
                    let rowIndex = Math.floor(cellIndex/gameRows);
                    let randomId = spawnRandomId(10);
                    let dataNumber = cellIndex++;
                    cellDataColumn.push(dataNumber);
                    // columnObject.id = randomId;
                    // columnObject.dataNumber = cellIndex++;
                    let cellDiv = `<button class="cell dead" id="${randomId}" data-number="${dataNumber}" ></button>`; // the div used to show cells in UI/DOM
                    // console.log("columnObject: ",columnObject,"countOfCells: ",countOfCells,"cellIndex: ",cellIndex,"gameColumns: ",gameColumns, "columnIndex: ",columnIndex, "rowIndex: ", rowIndex, "gameRows: ",gameRows);
                    $( ".gameBoard" ).append( $( cellDiv ) );
                }
            }
    }
    console.log("cellDataNumbers: ", cellDataNumbers, "countOfCells: ", countOfCells);
}
    populateCells(totalCells);
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



