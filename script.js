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
    console.log("cellCoordinate:",cellCoordinate);
    // treeOfLife(dataId, rowIndex, columnIndex);

    let familyCells = {
        top: {
            coordinate: [rowIndex - 1, columnIndex],
            value: "",
            status: "",
            id : "" },
        topRight: {
            coordinate: [rowIndex - 1, columnIndex + 1], 
            value: "",
            status: "",
            id: "" },
        topLeft: {
            coordinate: [rowIndex - 1, columnIndex - 1], 
            value: "",
            status: "",
            id: "" },
        left: {
            coordinate: [rowIndex, columnIndex - 1],
            value: "",
            status: "",
            id : "" },
        right: {
            coordinate: [rowIndex, columnIndex + 1], 
            value: "",
            status: "",
            id: "" },
        bottom: {
            coordinate: [rowIndex + 1, columnIndex], 
            value: "",
            status: "",
            id: "" },
        bottomRight: {
            coordinate: [rowIndex + 1, columnIndex + 1], 
            value: "",
            status: "",
            id: "" },
        bottomLeft: {
            coordinate: [rowIndex + 1, columnIndex - 1], 
            value: "",
            status: "",
            id: "" },
        
    }

    for (let cell in familyCells) {
        familyCells[cell].value = cellMatrix[familyCells[cell].coordinate[0]][familyCells[cell].coordinate[1]];
        
        if ($(`[data-number = ${familyCells[cell].value}]`).attr('class').indexOf("dead") != -1) {
            familyCells[cell].status = "dead";
        } else {
            familyCells[cell].status = "alive";
        }
        
        familyCells[cell].id = $(`[data-number = ${familyCells[cell].value}]`).attr('id');
    }

    console.log("familyCells:", familyCells);
}


// Controls the actions of all cells touching the selected cell
function treeOfLife(dataId, rowIndex, columnIndex) {

    


    //Birth rule: An empty, or “dead,” cell with precisely three “live” neighbors (full cells) becomes live. 
    // Death rule: A live cell with zero or one neighbors dies of isolation; a live cell with four or more neighbors dies of overcrowding. 
    // Survival rule: A live cell with two or three neighbors remains alive.


   /* // Check if the neighboring cells are within bounds
    if (leftCellCoordinate[1] >= 0 && leftCellStatus === "dead") {
        spawnLife(leftCellId, dataId);
        leftCellStatus = "alive";
    }
    if (topCellCoordinate[0] >= 0) {
        // spawnLife(topCellId, dataId);
    }
    if (rightCellCoordinate[1] < gameColumns) {
        // spawnLife(rightCellId, dataId);
    }
    if (bottomCellCoordinate[0] < gameRows) {
        // spawnLife(bottomCellId, dataId);
    }

        // Brings all touching cells to life
    */


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



