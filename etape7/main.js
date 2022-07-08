const mazeInfo = [
    [{ path: 0, possibilities: "", nodeNb: null, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 }],
    [{ path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 }],
    [{ path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [] , pathNb :0}],
    [{ path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 }],
    [{ path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 }],
    [{ path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [] , pathNb :0}],
    [{ path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 1, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 },
    { path: 0, possibilities: "", nodeNb: 0, from : [], pathNb :0 }]];

const goal = [4, 2];
let position = [0, 0];
let nodeCount = 0;
let ariane = [[0, 0]];

movingInMaze(mazeInfo, goal, position);
printEndInfo();

function movingInMaze(mazeInfo, goal, position) {
    printMazewithPosition(mazeInfo, position);
    if (isPositionSameAsGoal(position)) {
        return;
    } else {

        checkPossibilities(mazeInfo, position);
        
        let fromNodeCoordinate = mazeInfo[position[0]][position[1]].from;

        if (fromNodeCoordinate.length > 1) {
            mazeInfo[position[0]][position[1]].pathNb = mazeInfo[fromNodeCoordinate[0]][fromNodeCoordinate[1]].pathNb +1;
        }
        

        let nextNode = mazeInfo[position[0]][position[1]].nodeNb +1;
        position[0] = ariane[nextNode][0];
        position[1] = ariane[nextNode][1];
        

        movingInMaze(mazeInfo, goal, position);
    }
    
}

function printEndInfo() {
    let path = [[goal[0], goal[1]]];
    let countPosition = [goal[0], goal[1]];
    let count = 0;
    while ((countPosition[0] != 0 && countPosition[1] != 0) || (countPosition[0] == 0 && countPosition[1] != 0) || (countPosition[0] != 0 && countPosition[1] == 0)) {
        let newPositionX = mazeInfo[countPosition[0]][countPosition[1]].from[0];
        let newPositionY = mazeInfo[countPosition[0]][countPosition[1]].from[1];
        path.unshift([newPositionX, newPositionY]);
        countPosition[0] = newPositionX;
        countPosition[1] = newPositionY;
        count++;
    }

    console.log("------------------------------------------------------");

    for (let i = 0; i < mazeInfo[0].length; i++) {
        let mazeDisplay = "";
        for (let j = 0; j < mazeInfo.length; j++) {
            if (mazeInfo[j][i].path == 0) {
                if (position[0] == j && position[1] == i) {
                    mazeDisplay += "ICI   ";
                } else {
                    if (i == 0 && j == 0) {
                        mazeDisplay += "S     ";
                    } else if (j == goal[0] && i == goal[1]) {
                        mazeDisplay += "G     ";
                    } else {
                        let string = "_ ";
                        for (let index = 0; index < path.length; index++) {
                            if (path[index][0] == j && path[index][1] == i) {
                                if (mazeInfo[j][i].pathNb < 10) {
                                    string = mazeInfo[j][i].pathNb + " ";
                                } else {
                                    string = mazeInfo[j][i].pathNb;
                                }
                                
                            }
                        }
                        mazeDisplay += string +"    ";
                    }
                }
            } else {
                mazeDisplay += "M     ";
            }

        }
        console.log(mazeDisplay);
    }

    console.log(position);
    console.log(path);
    console.log("nombre d'étapes complet : " + ariane.length);


    console.log("longueur du chemin : " + count);
}

function printMazewithPosition(mazeInfo, position) {
    console.log("------------------------------------------------------");

    for (let i = 0; i < mazeInfo[0].length; i++) {
        let mazeDisplay = "";
        for (let j = 0; j < mazeInfo.length; j++) {
            if (mazeInfo[j][i].path == 0) {
                if (position[0] == j && position[1] == i) {
                    mazeDisplay += "ICI   ";
                } else {
                    if (i == 0 && j == 0) {
                        mazeDisplay += "S     ";
                    } else if (j == goal[0] && i == goal[1]) {
                        mazeDisplay += "G     ";
                    } else if (mazeInfo[j][i].pathNb > 9) {
                        mazeDisplay += ""+ mazeInfo[j][i].pathNb +"    ";
                    } else {
                        mazeDisplay += ""+ mazeInfo[j][i].pathNb +"     ";
                    }
                }
            } else {
                mazeDisplay += "M     ";
            }

        }
        console.log(mazeDisplay);
    }
}

function isPositionSameAsGoal(position) {
    return position[0] == goal[0] && position[1] == goal[1];
}


function checkPossibilities(mazeInfo, position) {
    if (isDownPathInMaze(mazeInfo, position) && isDownPathAPath(mazeInfo, position) && isDownPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[0]][position[1]+1].nodeNb = nodeCount;
        mazeInfo[position[0]][position[1]+1].from[0] = position[0];
        mazeInfo[position[0]][position[1]+1].from[1] = position[1];
        ariane[nodeCount] = [position[0], position[1] + 1];
    }
    if (isRightPathInMaze(mazeInfo, position) && isRightPathAPath(mazeInfo, position) && isRightPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[0]+1][position[1]].nodeNb = nodeCount;
        mazeInfo[position[0]+1][position[1]].from[0] = position[0];
        mazeInfo[position[0]+1][position[1]].from[1] = position[1];
        ariane[nodeCount] = [position[0] +1, position[1]];
    }
    if (isUpPathInMaze(mazeInfo, position) && isUpPathAPath(mazeInfo, position) && isUpPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[0]][position[1]-1].nodeNb = nodeCount;
        mazeInfo[position[0]][position[1]-1].from[0] = position[0];
        mazeInfo[position[0]][position[1]-1].from[1] = position[1];
        ariane[nodeCount] = [position[0], position[1]-1];
    }
    if (isLeftPathInMaze(mazeInfo, position) && isLeftPathAPath(mazeInfo, position) && isLeftPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[0]-1][position[1]].nodeNb = nodeCount;
        mazeInfo[position[0]-1][position[1]].from[0] = position[0];
        mazeInfo[position[0]-1][position[1]].from[1] = position[1];
        ariane[nodeCount] = [position[0]-1, position[1]];
    }
}

function isDownPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]][position[1]+1] !== 'undefined';
}

function isDownPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]+1].path == 0;
}

function isDownPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]+1].nodeNb == 0;
}

function isRightPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]+1] !== 'undefined';
}

function isRightPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]+1][position[1]].path == 0;
}

function isRightPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]+1][position[1]].nodeNb == 0;
}

function isUpPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]][position[1]-1] !== 'undefined';
}

function isUpPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]-1].path == 0;
}

function isUpPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]-1].nodeNb == 0;
}

function isLeftPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]-1] !== 'undefined';
}

function isLeftPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]-1][position[1]].path == 0;
}

function isLeftPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]-1][position[1]].nodeNb == 0;
}