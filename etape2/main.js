const mazeInfo = [
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }]];
const goal = [4, 2];
let position = [0, 0];
let i = 0;
let ariane = [[0,0]];
let stepCount = 0;


moveInMaze(mazeInfo, ariane, position);

printEndInfo();


function moveInMaze(mazeInfo, ariane, position) {
    if (mazeInfo[position[1]][position[0]].stepCount == 0) {
        mazeInfo[position[1]][position[0]].stepCount = stepCount;
        stepCount++;
    }
    printMazewithPosition(mazeInfo, position);

    if (position[0] == goal[0] && position[1] == goal[1]) {
        return;
    } else {

        if (mazeInfo[position[1]][position[0]].possibilities == "") {
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

function printEndInfo() {
    console.log(position);
    console.log(ariane);
    console.log("nombre d'étapes complet : " + ariane.length);
    console.log("longueur du chemin : " + mazeInfo[position[1]][position[0]].stepCount);
}

function printMazewithPosition (mazeInfo, position) {
    let maze = [];

    for (let i = 0; i < mazeInfo.length; i++) {
        maze[i] = [];
        for (let j = 0; j < mazeInfo[i].length; j++) {
            if (mazeInfo[i][j].path == 0) {
                maze[i][j] = "_";
            } else {
                maze[i][j] = "M";
            }
        }
    }

    maze[position[1]][position[0]] = "ICI";

    console.table(maze);
}

function actionAccordingToPossibilities(mazeInfo, position, positionY, positionX) {
    if (mazeInfo[position[1]][position[0]].possibilities.charAt(0) == "D") {
        positionY += 1;
    } else if (mazeInfo[position[1]][position[0]].possibilities.charAt(0) == "R") {
        positionX += 1;
    } else if (mazeInfo[position[1]][position[0]].possibilities.charAt(0) == "U") {
        positionY -= 1;
    } else if (mazeInfo[position[1]][position[0]].possibilities.charAt(0) == "L") {
        positionX -= 1;
    } else {
        let returnPossibilities = [];
        let indexMax = findOldPath(mazeInfo, position, returnPossibilities);
        positionX = returnPossibilities[indexMax].positionX;
        positionY = returnPossibilities[indexMax].positionY;
    }
    mazeInfo[position[1]][position[0]].possibilities = mazeInfo[position[1]][position[0]].possibilities.slice(1);
    return { positionY, positionX };
}

function findOldPath(mazeInfo, position, returnPossibilities) {
    if (typeof mazeInfo[position[1]][position[0] - 1] !== 'undefined' && mazeInfo[position[1]][position[0] - 1].path == 0 && mazeInfo[position[1]][position[0] - 1].stepCount >= 0 && !(mazeInfo[position[1]][position[0] - 1].possibilities.includes('R'))) {
        returnPossibilities.push({ positionX: position[0] - 1, positionY: position[1], possibilities: mazeInfo[position[1]][position[0] - 1].possibilities });
    }
    if (typeof mazeInfo[position[1] - 1] !== 'undefined' && mazeInfo[position[1] - 1][position[0]].path == 0 && mazeInfo[position[1] - 1][position[0]].stepCount >= 0 && !(mazeInfo[position[1] - 1][position[0]].possibilities.includes("D"))) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] - 1, possibilities: mazeInfo[position[1] - 1][position[0]].possibilities });
    }
    if (typeof mazeInfo[position[1]][position[0] + 1] !== 'undefined' && mazeInfo[position[1]][position[0] + 1].path == 0 && mazeInfo[position[1]][position[0] + 1].stepCount >= 0 && !(mazeInfo[position[1]][position[0] + 1].possibilities.includes('L'))) {
        returnPossibilities.push({ positionX: position[0] + 1, positionY: position[1], possibilities: mazeInfo[position[1]][position[0] + 1].possibilities });
    }
    if (typeof mazeInfo[position[1] + 1] !== 'undefined' && mazeInfo[position[1] + 1][position[0]].path == 0 && mazeInfo[position[1] + 1][position[0]].stepCount >= 0 && !(mazeInfo[position[1] + 1][position[0]].possibilities.includes('U'))) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] + 1, possibilities: mazeInfo[position[1] + 1][position[0]].possibilities });
    }

    let indexMax = 0;
    for (let index = 0; index < returnPossibilities.length; index++) {
        if ( ((ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) || (ariane[i-1][0] == returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) ||  (ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] == returnPossibilities[index].positionY)) && returnPossibilities[index].possibilities.length >= returnPossibilities[indexMax].possibilities.length) {
            indexMax = index;
        }
    }
    return indexMax;
}

function checkPossibilities(mazeInfo, position) {
    if (typeof mazeInfo[position[1] + 1] !== 'undefined' && mazeInfo[position[1] + 1][position[0]].path == 0 && mazeInfo[position[1] + 1][position[0]].stepCount == 0) {
        mazeInfo[position[1]][position[0]].possibilities = "D";
        if (position[0] == goal[0] && position[1] + 1 == goal[1]) {
            return;   
        }
    }
    if (typeof mazeInfo[position[1]][position[0] + 1] !== 'undefined' && mazeInfo[position[1]][position[0] + 1].path == 0 && mazeInfo[position[1]][position[0] + 1].stepCount == 0) {
        if (position[0]+1 == goal[0] && position[1] == goal[1]) {
            mazeInfo[position[1]][position[0]].possibilities = "R";
            return;   
        }
        mazeInfo[position[1]][position[0]].possibilities += "R";
    }
    if (typeof mazeInfo[position[1] - 1] !== 'undefined' && mazeInfo[position[1] - 1][position[0]].path == 0 && mazeInfo[position[1] - 1][position[0]].stepCount == 0) {
        if (position[0] == goal[0] && position[1]-1 == goal[1]) {
            mazeInfo[position[1]][position[0]].possibilities = "U";
            return;   
        }
        mazeInfo[position[1]][position[0]].possibilities += "U";
    }
    if (typeof mazeInfo[position[1]][position[0] - 1] !== 'undefined' && mazeInfo[position[1]][position[0] - 1].path == 0 && mazeInfo[position[1]][position[0] - 1].stepCount == 0) {
        if (position[0]-1 == goal[0] && position[1] == goal[1]) {
            mazeInfo[position[1]][position[0]].possibilities = "L";
            return;   
        }
        mazeInfo[position[1]][position[0]].possibilities += "L";
    }
}
