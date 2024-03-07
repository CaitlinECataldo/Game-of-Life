// IMPORTANT NOTE - All coordinates are formated [y,x] so that they can be indexed within 2D arrays

$( document ).ready(function() {
 
// Variables
let totalCells = "";
let cellSize = 50; // The size of all cells
let windowWidth = $(window).width(); // the total width of the screen size
let windowHeight = $(window).height(); // the total height of the screen size
let gameColumns = Math.round(windowWidth/cellSize);
let gameRows = Math.round(windowHeight/cellSize);
let cellMatrix = []; // This is a matrix of the numbers representing all cells, in the same rows/columns as UI


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
    spawnLife(targetId,targetDataId);
});

createGameBoard();

createCellArray();

// this sets the total rows and columns for the game
function createGameBoard() {
    let columnStyle = ""
    let rowStyle = ""


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
            // let cellDataColumn = [];
            
                
            //         for(let i = 0; i < gameColumns; i++) {
                        let randomId = spawnRandomId(10);
                        let dataNumber = cellIndex++;
                        // cellDataColumn.push(dataNumber);
                        let cellDiv = `<button class="cell dead" id="${randomId}" data-number="${dataNumber}" ></button>`; // the div used to show cells in UI/DOM
                        $( ".gameBoard" ).append( $( cellDiv ) );
                    // }
               
    }
}
populateCells(totalCells);

}

// This function returns a grid for all cells showing in the UI
function createCellArray(countOfCells) {
    let cellArray = [];

    for (let i = 0; i < $(".cell").length; i++ ) {
        let cellElement = $(".cell")[i];
        cellArray.push(Number(cellElement.dataset.number));
    }
    let column = [];
    // Group the dataset numbers into colums
    let index = 0;
    for (let i=0; i < gameRows; i++) {
        column = [];

        for (let j = 0; j < gameColumns; j++) {
            column.push(cellArray[index]);
            index++;
        }
        cellMatrix.push(column);
    }
 
          console.log("cellMatrix: ",cellMatrix);
}

// This function brings a cell to life based on the id entered into the parameter
function spawnLife(id, dataId) {
    let cellCoordinate = "";
    $(`.cell#${id}`).removeClass("dead").addClass("alive");
    
    // Find the coordinate of dataId
    let columnIndex = "";
    let rowIndex = "";
    for (let i = 0; i < gameRows; i++) {
        let index = "";
        index = cellMatrix[i].indexOf(dataId);
        if (index != -1) {
            columnIndex = index;
            rowIndex = i;
            }
        } 
    cellCoordinate = [rowIndex, columnIndex];
    
    treeOfLife(dataId);
    function treeOfLife(dataId) {
        // Coordinates of all touching cells of dataId
        let leftCellCoordinate = [];
        let topCellCoordinate = [];
        let rightCellCoordinate = [];
        let bottomCellCoordinate = [];

        topCellCoordinate.push(rowIndex - 1, columnIndex);
        bottomCellCoordinate.push(rowIndex + 1, columnIndex);
        rightCellCoordinate.push(rowIndex, columnIndex + 1);
        leftCellCoordinate.push(rowIndex, columnIndex - 1);

        // Value of all touching cells of dataId
        let leftCellValue = "";
        let topCellValue = "";
        let rightCellValue = "";
        let bottomCellValue = "";

        leftCellValue = cellMatrix[leftCellCoordinate[0]][leftCellCoordinate[1]];
        topCellValue = cellMatrix[topCellCoordinate[0]][topCellCoordinate[1]];
        rightCellValue = cellMatrix[rightCellCoordinate[0]][rightCellCoordinate[1]];
        bottomCellValue = cellMatrix[bottomCellCoordinate[0]][bottomCellCoordinate[1]];

        // ID of all touching cells of dataId
        let leftCellId = $(`[data-number = ${leftCellValue}]`).attr('id');
        let topCellId = $(`[data-number = ${topCellValue}]`).attr('id');;
        let rightCellId = $(`[data-number = ${rightCellValue}]`).attr('id');;
        let bottomCellId = $(`[data-number = ${bottomCellValue}]`).attr('id');;



    console.log("targetDataId:",id," left:",leftCellId, " right:",rightCellId," up:",topCellId, " down:", bottomCellId );


    }
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



