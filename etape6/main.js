const mazeInfo = [
[{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 }],
[{ path: 1, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 }],
[ { path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 }],
[ { path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 }],
[ { path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 }],
[ { path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 }],
[ { path: 0, possibilities: "", stepCount: 0 },
{ path: 1, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 },
{ path: 0, possibilities: "", stepCount: 0 }]];


const goal = [4, 2];
let position = [0, 0];
let i = 0;
let ariane = [[0, 0]];
let stepCount = 0;


moveInMaze(mazeInfo, ariane, position);

printEndInfo();


function moveInMaze(mazeInfo, ariane, position) {
    if (isPathNotVisited(mazeInfo, position)) {
        mazeInfo[position[0]][position[1]].stepCount = stepCount;
        stepCount++;
    }
    printMazewithPosition(mazeInfo, position);

    if (isPositionSameAsGoal(position)) {
        return;
    } else {

        if (isPathWithNoPossibilities(mazeInfo, position)) {
            checkPossibilities(mazeInfo, position);
        }


        let positionX = position[0];
        let positionY = position[1];

        ({ positionY, positionX } = actionAccordingToPossibilities(mazeInfo, position, positionY, positionX));



        position[0] = positionX;
        position[1] = positionY;


        i++;

        ariane[i] = [position[0], position[1]];
        moveInMaze(mazeInfo, ariane, position);
    }

}

function isPositionSameAsGoal(position) {
    return position[0] == goal[0] && position[1] == goal[1];
}

function isPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]].stepCount == 0;
}

function isPathWithNoPossibilities(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]].possibilities == "";
}

function printEndInfo() {
    console.log(position);
    console.log(ariane);
    console.log("nombre d'étapes complet : " + ariane.length);
    console.log("longueur du chemin : " + mazeInfo[position[0]][position[1]].stepCount);
}

function printMazewithPosition(mazeInfo, position) {
    console.log("------------------------------------------------------");

    for (let i = 0; i < mazeInfo[0].length; i++) {
        let mazeDisplay = "";
        for (let j = 0; j < mazeInfo.length; j++) {
            if (mazeInfo[j][i].path == 0) {
                if (position[0] == j && position[1] == i) {
                    mazeDisplay += " ICI ";
                } else {
                    mazeDisplay += "  _  ";
                }
            } else {
                mazeDisplay += "  M  ";
            }

        }
        console.log(mazeDisplay);
    }
}

function actionAccordingToPossibilities(mazeInfo, position, positionY, positionX) {
    if (isDownAPossibility(mazeInfo, position)) {
        positionY += 1;
    } else if (isRightAPossibility(mazeInfo, position)) {
        positionX += 1;
    } else if (isUpAPossibility(mazeInfo, position)) {
        positionY -= 1;
    } else if (isLeftAPossibility(mazeInfo, position)) {
        positionX -= 1;
    } else {
        let returnPossibilities = [];
        let indexMax = findOldPath(mazeInfo, position, returnPossibilities);
        positionX = returnPossibilities[indexMax].positionX;
        positionY = returnPossibilities[indexMax].positionY;
    }
    mazeInfo[position[0]][position[1]].possibilities = mazeInfo[position[0]][position[1]].possibilities.slice(1);
    return { positionY, positionX };
}



function findOldPath(mazeInfo, position, returnPossibilities) {
    if (isLeftPathInMaze(mazeInfo, position) && isLeftPathAPath(mazeInfo, position) && isLeftPathAlreadyVisited(mazeInfo, position) && hasNotLeftPathARightPossibility(mazeInfo, position)) {
        returnPossibilities.push({ positionX: position[0] - 1, positionY: position[1], possibilities: mazeInfo[position[0] - 1][position[1]].possibilities });
    }
    if (isUpPathInMaze(mazeInfo, position) && isUpPathAPath(mazeInfo, position) && isUpPathAlreadyVisited(mazeInfo, position) && hasNotUpPathADownPossibility(mazeInfo, position)) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] - 1, possibilities: mazeInfo[position[0]][position[1] - 1].possibilities });
    }
    if (isRightPathInMaze(mazeInfo, position) && isRightPathAPath(mazeInfo, position) && isRightPathAlreadyVisited(mazeInfo, position) && hasNotRightPathALeftPossibility(mazeInfo, position)) {
        returnPossibilities.push({ positionX: position[0] + 1, positionY: position[1], possibilities: mazeInfo[position[0] + 1][position[1]].possibilities });
    }
    if (isDownPathInMaze(mazeInfo, position) && isDownPathAPath(mazeInfo, position) && isDownPathAlreadyVisited(mazeInfo, position) && hasNotDownPathAUpPossibility(mazeInfo, position)) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] + 1, possibilities: mazeInfo[position[0]][position[1] + 1].possibilities });
    }

    let indexMax = 0;
    if (returnPossibilities.length > 1) {
        for (let index = 0; index < returnPossibilities.length; index++) {
            if (isPositionDifferentFromBefore(returnPossibilities, index) && isLengthOfPossibilitiesGreaterThanPossibilitiesatIndexMax(returnPossibilities, index, indexMax)) {
                indexMax = index;
            }
        }
    }

    return indexMax;
}



function checkPossibilities(mazeInfo, position) {
    if (isDownPathInMaze(mazeInfo, position) && isDownPathAPath(mazeInfo, position) && isDownPathNotVisited(mazeInfo, position)) {
        mazeInfo[position[0]][position[1]].possibilities = "D";
        if (position[0] == goal[0] && position[1] + 1 == goal[1]) {
            return;
        }
    }
    if (isRightPathInMaze(mazeInfo, position) && isRightPathAPath(mazeInfo, position) && isRightPathNotVisited(mazeInfo, position)) {
        if (position[0] + 1 == goal[0] && position[1] == goal[1]) {
            mazeInfo[position[0]][position[1]].possibilities = "R";
            return;
        }
        mazeInfo[position[0]][position[1]].possibilities += "R";
    }
    if (isUpPathInMaze(mazeInfo, position) && isUpPathAPath(mazeInfo, position) && isUpPathNotVisited(mazeInfo, position)) {
        if (position[0] == goal[0] && position[1] - 1 == goal[1]) {
            mazeInfo[position[0]][position[1]].possibilities = "U";
            return;
        }
        mazeInfo[position[0]][position[1]].possibilities += "U";
    }
    if (isLeftPathInMaze(mazeInfo, position) && isLeftPathAPath(mazeInfo, position) && isLeftPathNotVisited(mazeInfo, position)) {
        if (position[0] - 1 == goal[0] && position[1] == goal[1]) {
            mazeInfo[position[0]][position[1]].possibilities = "L";
            return;
        }
        mazeInfo[position[0]][position[1]].possibilities += "L";
    }
}


function isLeftAPossibility(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]].possibilities.charAt(0) == "L";
}

function isUpAPossibility(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]].possibilities.charAt(0) == "U";
}

function isRightAPossibility(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]].possibilities.charAt(0) == "R";
}

function isDownAPossibility(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]].possibilities.charAt(0) == "D";
}

function isDownPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]+1].stepCount == 0;
}

function isRightPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]+1][position[1]].stepCount == 0;
}

function isUpPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]-1].stepCount == 0;
}

function isLeftPathNotVisited(mazeInfo, position) {
    return mazeInfo[position[0]-1][position[1]].stepCount == 0;
}

function isLengthOfPossibilitiesGreaterThanPossibilitiesatIndexMax(returnPossibilities, index, indexMax) {
    return returnPossibilities[index].possibilities.length >= returnPossibilities[indexMax].possibilities.length;
}

function isPositionDifferentFromBefore(returnPossibilities, index) {
    return (ariane[i - 1][0] != returnPossibilities[index].positionX && ariane[i - 1][1] != returnPossibilities[index].positionY) || (ariane[i - 1][0] == returnPossibilities[index].positionX && ariane[i - 1][1] != returnPossibilities[index].positionY) || (ariane[i - 1][0] != returnPossibilities[index].positionX && ariane[i - 1][1] == returnPossibilities[index].positionY);
}

function hasNotDownPathAUpPossibility(mazeInfo, position) {
    return !(mazeInfo[position[0]][position[1]+1].possibilities.includes('U'));
}

function isDownPathAlreadyVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]+1].stepCount >= 0;
}

function isDownPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]+1].path == 0;
}

function isDownPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]][position[1]+1] !== 'undefined';
}

function hasNotRightPathALeftPossibility(mazeInfo, position) {
    return !(mazeInfo[position[0]+1][position[1]].possibilities.includes('L'));
}

function isRightPathAlreadyVisited(mazeInfo, position) {
    return mazeInfo[position[0]+1][position[1]].stepCount >= 0;
}

function isRightPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]+1][position[1]].path == 0;
}

function isRightPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]+1] !== 'undefined';
}

function hasNotUpPathADownPossibility(mazeInfo, position) {
    return !(mazeInfo[position[0]][position[1]-1].possibilities.includes("D"));
}

function isUpPathAlreadyVisited(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]-1].stepCount >= 0;
}

function isUpPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]][position[1]-1].path == 0;
}

function isUpPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]][position[1]-1] !== 'undefined';
}

function hasNotLeftPathARightPossibility(mazeInfo, position) {
    return !(mazeInfo[position[0]-1][position[1]].possibilities.includes('R'));
}

function isLeftPathAlreadyVisited(mazeInfo, position) {
    return mazeInfo[position[0]-1][position[1]].stepCount >= 0;
}

function isLeftPathAPath(mazeInfo, position) {
    return mazeInfo[position[0]-1][position[1]].path == 0;
}

function isLeftPathInMaze(mazeInfo, position) {
    return typeof mazeInfo[position[0]-1] !== 'undefined';
}