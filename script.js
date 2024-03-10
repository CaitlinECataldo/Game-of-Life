// IMPORTANT NOTE - All coordinates are formated [y,x] so that they can be indexed within 2D arrays

$( document ).ready(function() {
 
// Variables
let cellSize = 50; // The size of all cells
let windowWidth = $(window).width(); // the total width of the screen size
let windowHeight = $(window).height(); // the total height of the screen size
let gameColumns = Math.round(windowWidth/cellSize);
let gameRows = Math.round(windowHeight/cellSize);
let cellMatrix = []; // This is a matrix of the numbers representing all cells, in the same rows/columns as UI
let totalCells = gameRows * gameColumns;

// All cells organized into alive and dead status. Include ID, data-number and cell coordinate
let cellStatus = [];


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
    allCellStatus();
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
    let row = cellCoordinate(dataId)[0];
    let column = cellCoordinate(dataId)[1];
    $(`.cell#${id}`).removeClass("dead").addClass("alive");

    allCellStatus();
    
    // Check all cells and update their status based on neighbor status
    
        for (let i = 0; i < totalCells; i++) {
           
            // row = cellStatus[i].coordinate[0];
            // column = cellStatus[i].coordinate[1];
            // treeOfLife(row,column);
        }
        treeOfLife(row, column);
        console.log("cellStatus:",cellStatus);    
}

function cellCoordinate(dataId) {
    if (typeof dataId != "number") {
        throw Error("dataId must be a number in order to receive corrdinates");
    }
    // Find the coordinate of dataId
    let cellCoordinate = "";
    let columnIndex = ""; 
    let rowIndex = "";
    let index = "";
    
    for (let i = 0; i < gameRows; i++) {
        index = cellMatrix[i].indexOf(dataId);
        if (index != -1) {
            columnIndex = index;
            rowIndex = i;
            cellCoordinate = [rowIndex, columnIndex];
            return cellCoordinate;
            }
        } 
}



function allCellStatus() {
    let allCells = $(".cell");
    cellStatus = [];

    // adds the id and data-number to each cell element within cellStatus object
    for (let i = 0; i < totalCells; i++) {
        let deadOrAlive = ($(allCells[i]).attr('class').split(" ")).filter(function(x){return x === "dead" || x === "alive"})[0];
        let idValue = $(allCells[i]).attr('id');
        let dataIdValue = parseInt($(allCells[i]).attr('data-number'));
        let coordinateValue = cellCoordinate(parseInt($(allCells[i]).attr('data-number')));
        cellStatus.push({status: deadOrAlive,id: idValue, dataId: dataIdValue, coordinate: coordinateValue});
    }
        return cellStatus;
    }



// Controls the actions of all cells touching the selected cell
function treeOfLife(rowIndex, columnIndex) {
    let allStatus = [];
    let aliveCells = [];
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
    
    // Assign values for status, id and value within the familyCells object
    for (let family in familyCells) {
        
        for (let i = 0; i < cellStatus.length; i++) {
            // look up the coordinate for a specific family cell
            if (cellStatus[i].coordinate[0] === familyCells[family].coordinate[0] && cellStatus[i].coordinate[1] === familyCells[family].coordinate[1]) {
                // Reference cellStatus array to find the data-number, id and alive/dead status
                // Assign these values to the specific family cell
                familyCells[family].value = cellStatus[i].dataId;
                familyCells[family].id = cellStatus[i].id;
                familyCells[family].status = cellStatus[i].status;                
            }
            
            
        }
    }
    console.log("familyCells:",familyCells);


    //Birth rule: An empty, or “dead,” cell with precisely three “live” neighbors (full cells) becomes live. 
    
        // Identifies the alive/dead status of each family cell
        for (let direction in familyCells) {
        
            allStatus.push(familyCells[direction].status);
        }

        // Identifies the total number of alive family cells
        aliveCells = allStatus.filter(function(status) {
            return status === "alive";
        }).length;

        if (aliveCells === 3) {
            
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



