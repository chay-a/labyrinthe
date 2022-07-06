const lab = [
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }],
    [{ path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }, { path: 1, possibilities: "", stepCount: 0 }, { path: 0, possibilities: "", stepCount: 0 }]];
const goal = [6, 0];
let position = [0, 0];
let i = 0;
let ariane = [[0,0]];
let stepCount = 0;


labyrinthe(lab, ariane, position);

printEndInfo();


function labyrinthe(lab, ariane, position) {
    if (lab[position[1]][position[0]].stepCount == 0) {
        lab[position[1]][position[0]].stepCount = stepCount;
        stepCount++;
    }
    printMazewithPosition(lab, position);

    if (position[0] == goal[0] && position[1] == goal[1]) {
        return;
    } else {

        if (lab[position[1]][position[0]].possibilities == "") {
            checkPossibilities(lab, position);
        }


        let positionX = position[0];
        let positionY = position[1];

        ({ positionY, positionX } = actionAccordingToPossibilities(lab, position, positionY, positionX));

        

        position[0] = positionX;
        position[1] = positionY;

        
        i++;

        ariane[i] = [position[0], position[1]];
        labyrinthe(lab, ariane, position);
    }

}

function printEndInfo() {
    console.log(position);
    console.log(ariane);
    console.log("nombre d'étapes complet : " + ariane.length);
    console.log("longueur du chemin : " + lab[position[1]][position[0]].stepCount);
}

function printMazewithPosition (lab, position) {
    let maze = [];

    for (let i = 0; i < lab.length; i++) {
        maze[i] = [];
        for (let j = 0; j < lab[i].length; j++) {
            if (lab[i][j].path == 0) {
                maze[i][j] = "_";
            } else {
                maze[i][j] = "M";
            }
        }
    }

    maze[position[1]][position[0]] = "ICI";

    console.table(maze);
}

function actionAccordingToPossibilities(lab, position, positionY, positionX) {
    if (lab[position[1]][position[0]].possibilities.charAt(0) == "D") {
        positionY += 1;
    } else if (lab[position[1]][position[0]].possibilities.charAt(0) == "R") {
        positionX += 1;
    } else if (lab[position[1]][position[0]].possibilities.charAt(0) == "U") {
        positionY -= 1;
    } else if (lab[position[1]][position[0]].possibilities.charAt(0) == "L") {
        positionX -= 1;
    } else {
        let returnPossibilities = [];
        let indexMax = findOldPath(lab, position, returnPossibilities);
        positionX = returnPossibilities[indexMax].positionX;
        positionY = returnPossibilities[indexMax].positionY;
    }
    lab[position[1]][position[0]].possibilities = lab[position[1]][position[0]].possibilities.slice(1);
    return { positionY, positionX };
}

function findOldPath(lab, position, returnPossibilities) {
    if (typeof lab[position[1]][position[0] - 1] !== 'undefined' && lab[position[1]][position[0] - 1].path == 0 && lab[position[1]][position[0] - 1].stepCount >= 0 && !(lab[position[1]][position[0] - 1].possibilities.includes('R'))) {
        returnPossibilities.push({ positionX: position[0] - 1, positionY: position[1], possibilities: lab[position[1]][position[0] - 1].possibilities });
    }
    if (typeof lab[position[1] - 1] !== 'undefined' && lab[position[1] - 1][position[0]].path == 0 && lab[position[1] - 1][position[0]].stepCount >= 0 && !(lab[position[1] - 1][position[0]].possibilities.includes("D"))) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] - 1, possibilities: lab[position[1] - 1][position[0]].possibilities });
    }
    if (typeof lab[position[1]][position[0] + 1] !== 'undefined' && lab[position[1]][position[0] + 1].path == 0 && lab[position[1]][position[0] + 1].stepCount >= 0 && !(lab[position[1]][position[0] + 1].possibilities.includes('L'))) {
        returnPossibilities.push({ positionX: position[0] + 1, positionY: position[1], possibilities: lab[position[1]][position[0] + 1].possibilities });
    }
    if (typeof lab[position[1] + 1] !== 'undefined' && lab[position[1] + 1][position[0]].path == 0 && lab[position[1] + 1][position[0]].stepCount >= 0 && !(lab[position[1] + 1][position[0]].possibilities.includes('U'))) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] + 1, possibilities: lab[position[1] + 1][position[0]].possibilities });
    }

    let indexMax = 0;
    for (let index = 0; index < returnPossibilities.length; index++) {
        if ( ((ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) || (ariane[i-1][0] == returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) ||  (ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] == returnPossibilities[index].positionY)) && returnPossibilities[index].possibilities.length >= returnPossibilities[indexMax].possibilities.length) {
            indexMax = index;
        }
    }
    return indexMax;
}

function checkPossibilities(lab, position) {
    if (typeof lab[position[1] + 1] !== 'undefined' && lab[position[1] + 1][position[0]].path == 0 && lab[position[1] + 1][position[0]].stepCount == 0) {
        lab[position[1]][position[0]].possibilities = "D";
        if (position[0] == goal[0] && position[1] + 1 == goal[1]) {
            return;   
        }
    }
    if (typeof lab[position[1]][position[0] + 1] !== 'undefined' && lab[position[1]][position[0] + 1].path == 0 && lab[position[1]][position[0] + 1].stepCount == 0) {
        if (position[0]+1 == goal[0] && position[1] == goal[1]) {
            lab[position[1]][position[0]].possibilities = "R";
            return;   
        }
        lab[position[1]][position[0]].possibilities += "R";
    }
    if (typeof lab[position[1] - 1] !== 'undefined' && lab[position[1] - 1][position[0]].path == 0 && lab[position[1] - 1][position[0]].stepCount == 0) {
        if (position[0] == goal[0] && position[1]-1 == goal[1]) {
            lab[position[1]][position[0]].possibilities = "U";
            return;   
        }
        lab[position[1]][position[0]].possibilities += "U";
    }
    if (typeof lab[position[1]][position[0] - 1] !== 'undefined' && lab[position[1]][position[0] - 1].path == 0 && lab[position[1]][position[0] - 1].stepCount == 0) {
        if (position[0]-1 == goal[0] && position[1] == goal[1]) {
            lab[position[1]][position[0]].possibilities = "L";
            return;   
        }
        lab[position[1]][position[0]].possibilities += "L";
    }
}
