/* ======================
Jogo dos Quadrados
Inteligência Artificial
Author: Vagner Santana
File: ia.js
http://vagnersantana.com/8-puzzle-js/

8puzzle solver pro game acima 
Author: Roland Gabriel
=========================*/

const resultState = [
        [1,2,3]
        ,[4,5,6]
        ,[7,8,0]
    ];
        
var stateMatrix = [
    [5,7,8]
    ,[3,6,0]
    ,[1,4,2]
];

// Sum of the distance of every piace 
// to its original position
// includes blank position. 
var heuristic = function (matrix) {
    const originalPositions = [
            {'row': 2, 'col':2 }
            ,{'row': 0, 'col':0 }
            ,{'row': 0, 'col':1 }
            ,{'row': 0, 'col':2 }
            ,{'row': 1, 'col':0 }
            ,{'row': 1, 'col':1 }
            ,{'row': 1, 'col':2 }
            ,{'row': 2, 'col':0 }
            ,{'row': 2, 'col':1 } ]
        ,boardLength = 3;
        
    var h = 0, rowDiff, colDiff; 
    for (var row = 0; row < boardLength; row++) {
        for (var col = 0; col < boardLength; col++) {
            var element = matrix[row][col];
            rowDiff = row - originalPositions[element]['row'];            
            colDiff = col - originalPositions[element]['col'];
            h += Math.abs(rowDiff) + Math.abs(colDiff);           
        }    
    }
    return h;
};

// heuristic(stateMatrix);

var findIndexesByValue = function (matrix, value) {
    for (var row = 0; row < matrix.length; row++) {
        for (var col = 0; col < matrix.length; col++) {
        if (matrix[row][col] === value) {
            return {
                'row':row
                ,'col':col }
        }
    }
}
}; 



function Solver (initialMatrix) {
    var state = {}
        ,OPEN = []
        ,CLOSED = []
        ,childNodes = []

    state.matrix = initialMatrix
        ,state.h = heuristic(initialMatrix);
    
    OPEN.push(state)
    
    while(OPEN.length) {
        OPEN.sort(function (a, b) {
            return b.h - a.h; //descending order 
        });
        state = OPEN.pop(); //get smallest h()
        CLOSED.push(state);
        
        if(state.h === 0) {
            // reached meta
            return true;
        }
        
        childNodes = createChildNodes(state.matrix);
        childNodes.forEach(function(child){
            CLOSED.find(function (closed) {
                if(closed.h === child.h){
                    //TODO continue here
                    debugger
                }
            });
        });
        debugger
        
        
         
               
        
        
        
        
    }     
    return false;
};

var createChildNodes = function (matrix) { 
    const safeMATRIX = []
        ,freePosition = findIndexesByValue(matrix, 0);
    var res = []
        ,h=0
        ,auxMatrix = [];
    
    clone2DArray(matrix, safeMATRIX);
    Object.freeze(safeMATRIX);
        
    // copy current matrix
    clone2DArray(safeMATRIX, auxMatrix);
    // move blank position up
    if(auxMatrix[freePosition.row - 1]
        && auxMatrix[freePosition.row - 1][freePosition.col]) {
        auxMatrix[freePosition.row][freePosition.col] = auxMatrix[freePosition.row - 1][freePosition.col];
        auxMatrix[freePosition.row - 1][freePosition.col] = 0;
        h = heuristic(auxMatrix);
        res.push( { 
            matrix: auxMatrix
            , h: h 
        });    
    }
    
    // copy current matrix
    auxMatrix = []
    clone2DArray(safeMATRIX, auxMatrix);
    // ...down
    if(auxMatrix[freePosition.row + 1]
        && auxMatrix[freePosition.row + 1][freePosition.col]) {
            auxMatrix[freePosition.row][freePosition.col] = auxMatrix[freePosition.row + 1][freePosition.col];
            auxMatrix[freePosition.row + 1][freePosition.col] = 0;
            h = heuristic(auxMatrix);
            res.push( { 
                matrix: auxMatrix
                , h: h 
            });
    }
    // copy current matrix
    auxMatrix = []
    clone2DArray(safeMATRIX, auxMatrix);
    // ...left
    if(auxMatrix[freePosition.row][freePosition.col - 1]){
        auxMatrix[freePosition.row][freePosition.col] = auxMatrix[freePosition.row][freePosition.col - 1];
        auxMatrix[freePosition.row][freePosition.col - 1] = 0;
        h = heuristic(auxMatrix);
        res.push( { 
            matrix: auxMatrix
            , h: h 
        });
    }
    // copy current matrix
    auxMatrix = []
    clone2DArray(safeMATRIX, auxMatrix);
    // ...right
    if(auxMatrix[freePosition.row][freePosition.col + 1]){
        auxMatrix[freePosition.row][freePosition.col] = auxMatrix[freePosition.row][freePosition.col + 1];
        auxMatrix[freePosition.row][freePosition.col + 1] = 0;
        h = heuristic(auxMatrix);
        res.push( { 
            matrix: auxMatrix
            , h: h 
        });
    }
    return res;
}


function clone2DArray(src, dest) {
    for (var index = 0; index < src.length; index++) {
        dest.push(src[index].slice());
    }
}