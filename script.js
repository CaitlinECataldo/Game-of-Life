// IMPORTANT NOTE - All coordinates are formated [y,x] so that they can be indexed within 2D arrays

$( document ).ready(function() {
 
// Variables
let cellSize = 50; // The size of all cells
let windowWidth = $(window).width(); // the total width of the screen size
let windowHeight = $(window).height(); // the total height of the screen size
let gameColumns = Math.round(windowWidth/cellSize);
let gameRows = Math.round(windowHeight/cellSize);
let cellMatrix = []; // This is a matrix of the numbers representing all cells, in the same rows/columns as UI
let totalCells = gameRows * gameColumns; // This is the total number of  cells present within the UI
let cellStatus = []; // All cells organized into alive and dead status. Include ID, data-number and cell coordinate
let deadCells = []; // This is the same info as cellStatus but filtered with only dead cells
let aliveCells = []; // This is the same info as cellStatus but filtered with only alive cells

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
        spawnLife(targetId, true);
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
function spawnLife(id,click) {
    $(`.cell#${id}`).removeClass("dead").addClass("alive");
    if (click) {
        $(`.cell#${id}`).addClass("immortal");
    }
    allCellStatus();
    console.log("cellStatus:",cellStatus);
    
    // Check all cells and update their status based on neighbor status
    
        for (let i = 0; i < totalCells; i++) {
           let cellDataId = cellStatus[i].dataId;
            // row = cellStatus[i].coordinate[0];
            // column = cellStatus[i].coordinate[1];

            lifeRules(cellCoordinate(cellDataId));
        } 
}

function killCell(id) {
    $(`.cell#${id}`).removeClass("alive").addClass("dead");

    allCellStatus();
    
    // Check all cells and update their status based on neighbor status
    
        for (let i = 0; i < totalCells; i++) {
           let cellDataId = cellStatus[i].dataId;

            // lifeRules(cellCoordinate(cellDataId));
        } 
}



function lifeRules(coordinate) {
    let cellInfo = findCell(coordinate);
    let row = coordinate[0];
    let column = coordinate[1];

    let familyStatus = findFamily(row, column);

    //Birth rule: An empty, or “dead,” cell with precisely three “live” neighbors (full cells) becomes live. 
    if (cellInfo.status === "dead" && familyStatus.alive === 3) {
        // spawnLife(id, dataId);
        console.log(`cell ${cellInfo.id} has 3 siblings and should spawn a life`);
        return spawnLife(cellInfo.id, false);
    }

    // Survival rule: A live cell with two or three neighbors remains alive.
    if (cellInfo.immortal === false && cellInfo.status === "alive" && familyStatus.alive === 2 || familyStatus.alive === 3 ) {
        return
    }
    
    // Death rule: A live cell with zero or one neighbors dies of isolation; a live cell with four or more neighbors dies of overcrowding.
    if (cellInfo.immortal === false && cellInfo.status === "alive" && familyStatus.alive <= 1 || familyStatus.alive >= 4 ) {
        // return killCell(cellInfo.id);
    }
}

function allCellStatus() {
    let allCells = $(".cell");
    cellStatus = [];
    deadCells = [];
    aliveCells = [];

    // adds the id and data-number to each cell element within cellStatus object
    for (let i = 0; i < totalCells; i++) {
        let deadOrAlive = ($(allCells[i]).attr('class').split(" ")).filter(function(x){return x === "dead" || x === "alive"})[0];
        let immortalStatus = ($(allCells[i]).attr('class').split(" ")).filter(function(x){return x === "immortal"})[0];
        let idValue = $(allCells[i]).attr('id');
        let dataIdValue = parseInt($(allCells[i]).attr('data-number'));
        let coordinateValue = cellCoordinate(parseInt($(allCells[i]).attr('data-number')));

        if (immortalStatus === "immortal") {
            immortalStatus = true;
        } else {
            immortalStatus = false;
        }
        cellStatus.push({status: deadOrAlive,id: idValue, dataId: dataIdValue, coordinate: coordinateValue, immortal: immortalStatus});
    }

    // Push dead cells from cellStatus array into global deadCells array
    for (let i = 0; i < cellStatus.length; i++) {
        if (cellStatus[i].status === "dead") {
            deadCells.push(cellStatus[i]);
        } else if (cellStatus[i].status === "alive") {
            aliveCells.push(cellStatus[i]);
        }
    }
    // console.log("filtered dead cells:",deadCells);
    // console.log("filtered alive cells:",aliveCells);

        return cellStatus;
    }




// Controls the actions of all cells touching the selected cell
function findFamily(rowIndex, columnIndex) {
    familyStatus = {alive: [], dead: []};


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
                
                // Seperate cells by cell status by pushing into familyStatus
                if (familyCells[family].status === "dead") {
                    familyStatus.dead.push(familyCells[family].id);
                } else if (familyCells[family].status === "alive") {
                    familyStatus.alive.push(familyCells[family].id);
                }
            }

            if (cellStatus[i].coordinate[0] === rowIndex && cellStatus[i].coordinate[1] === columnIndex) {
                id = cellStatus[i].id;
                dataId = cellStatus[i].dataId;
            }
            
        }
    }

    familyStatus.alive = familyStatus.alive.length;
    familyStatus.dead = familyStatus.dead.length;
    // console.log("familyCells:",familyCells);
    // console.log("cellStatus:",cellStatus);
    // console.log("family cell status", familyStatus);
    return familyStatus;
}

// This identifies the cellStatus info for the matching cell
function findCell(coordinate) {
    let row = coordinate[0];
    let column = coordinate[1];
    let cellInfo = "";

    for (let i = 0; i < cellStatus.length; i++) {
        if (cellStatus[i].coordinate[0] === row && cellStatus[i].coordinate[1] === column) {
            cellInfo = cellStatus[i];
        }
    }
    return cellInfo;
}

// This finds a coordinate of any cell by using the dataId
function cellCoordinate(dataId) {
    dataId = parseFloat(dataId);
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



