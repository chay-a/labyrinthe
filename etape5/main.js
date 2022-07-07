const mazeInfo = [
    [{ path: 0, possibilities: "", nodeNb:  null }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }],
    [{ path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }],
    [{ path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }],
    [{ path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }],
    [{ path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }],
    [{ path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }, { path: 1, possibilities: "", nodeNb: 0 }, { path: 0, possibilities: "", nodeNb: 0 }]];
const goal = [4, 2];
let position = [0, 0];
let nodeCount =0;
let ariane = [[0,0]];

movingInMaze(mazeInfo, goal, position);
printEndInfo();

function movingInMaze(mazeInfo, goal, position) {
    printMazewithPosition(mazeInfo, position);
    if (isPositionSameAsGoal(position)) {
        return;
    } else {
        checkPossibilities(mazeInfo, position);
        let nextNode = mazeInfo[position[1]][position[0]].nodeNb +1;
        position[0] = ariane[nextNode][0];
        position[1] = ariane[nextNode][1];

        movingInMaze(mazeInfo, goal, position);
    }
    
}

function printEndInfo() {
    console.log(position);
    console.log(ariane);
    console.log("nombre d'étapes complet : " + ariane.length);
    console.log("longueur du chemin : " + nodeCount);
}

function printMazewithPosition(mazeInfo, position) {
    console.log("------------------------------------------------------");

    for (let i = 0; i < mazeInfo.length; i++) {
        let mazeDisplay = "";
        for (let j = 0; j < mazeInfo[i].length; j++) {
            if (mazeInfo[i][j].path == 0) {
                if (position[0] == j && position[1] == i) {
                    mazeDisplay += "   ICI ";
                } else {
                    if (mazeInfo[i][j].nodeNb == null) {
                        mazeDisplay += "   S   ";
                    } else if (mazeInfo[i][j].nodeNb > 9) {
                        mazeDisplay += "   "+ mazeInfo[i][j].nodeNb +"  ";
                    } else {
                        mazeDisplay += "   "+ mazeInfo[i][j].nodeNb +"   ";
                    }
                }
            } else {
                mazeDisplay += "   M   ";
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
        mazeInfo[position[1] + 1][position[0]].nodeNb = nodeCount;
        ariane[nodeCount] = [position[0], position[1] + 1];
    }
    if (isRightPathInMaze(mazeInfo, position) && isRightPathAPath(mazeInfo, position) && isRightPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[1]][position[0] + 1].nodeNb = nodeCount;
        ariane[nodeCount] = [position[0] +1, position[1]];
    }
    if (isUpPathInMaze(mazeInfo, position) && isUpPathAPath(mazeInfo, position) && isUpPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[1] - 1][position[0]].nodeNb = nodeCount;
        ariane[nodeCount] = [position[0], position[1]-1];
    }
    if (isLeftPathInMaze(mazeInfo, position) && isLeftPathAPath(mazeInfo, position) && isLeftPathNotVisited(mazeInfo, position)) {
        nodeCount++;
        mazeInfo[position[1]][position[0] - 1].nodeNb;
        ariane[nodeCount] = [position[0]-1, position[1]];
    }
}

function isDownPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[1] + 1] !== 'undefined';
}

function isDownPathAPath(mazeInfo, position) {
    return mazeInfo[position[1] + 1][position[0]].path == 0;
}

function isDownPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[1] + 1][position[0]].nodeNb == 0;
}

function isRightPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[1]][position[0] + 1] !== 'undefined';
}

function isRightPathAPath(mazeInfo, position) {
    return mazeInfo[position[1]][position[0] + 1].path == 0;
}

function isRightPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[1]][position[0] + 1].nodeNb == 0;
}

function isUpPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[1] - 1] !== 'undefined';
}

function isUpPathAPath(mazeInfo, position) {
    return mazeInfo[position[1] - 1][position[0]].path == 0;
}

function isUpPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[1] - 1][position[0]].nodeNb == 0;
}

function isLeftPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[1]][position[0] - 1] !== 'undefined';
}

function isLeftPathAPath(mazeInfo, position) {
    return mazeInfo[position[1]][position[0] - 1].path == 0;
}

function isLeftPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[1]][position[0] - 1].nodeNb == 0;
}