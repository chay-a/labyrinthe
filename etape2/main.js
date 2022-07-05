const lab = [
    [{ path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }],
    [{ path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }],
    [{ path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }],
    [{ path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }],
    [{ path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }],
    [{ path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }, { path: 1, possibilities: "", stepCount: 0, isPassed: false }, { path: 0, possibilities: "", stepCount: 0, isPassed: false }]];
const goal = [4, 2];
let position = [0, 0];
let i = 0;
let ariane = [];
let stepCount = 0;

console.table(lab);

labyrinthe(lab, ariane, position);

console.table(lab);
console.log(position);
console.log(ariane);

function labyrinthe(lab, ariane, position) {
    if (position[0] == goal[0] && position[1] == goal[1]) {
        return;
    } else {

        if (!lab[position[1]][position[0]].isPassed) {
            checkPossibilities(lab, position);
        }


        let positionX = position[0];
        let positionY = position[1];

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
            stepCount -= 2;
            lab[position[1]][position[0]].possibilities = "N" + lab[position[1]][position[0]].possibilities;
        }

        lab[position[1]][position[0]].possibilities = lab[position[1]][position[0]].possibilities.slice(1);

        lab[position[1]][position[0]].stepCount = stepCount;
        lab[position[1]][position[0]].isPassed = true;

        position[0] = positionX;
        position[1] = positionY;

        stepCount++;
        i++;

        ariane[i] = [position[0], position[1]];
        // console.table(lab);
        // console.log(position);
        labyrinthe(lab, ariane, position);
    }

}

function findOldPath(lab, position, returnPossibilities) {
    if (typeof lab[position[1]][position[0] - 1] !== 'undefined' && lab[position[1]][position[0] - 1].path == 0 && lab[position[1]][position[0] - 1].isPassed && !(lab[position[1]][position[0] - 1].possibilities.includes('R'))) {
        returnPossibilities.push({ positionX: position[0] - 1, positionY: position[1], possibilities: lab[position[1]][position[0] - 1].possibilities });
    }
    if (typeof lab[position[1] - 1] !== 'undefined' && lab[position[1] - 1][position[0]].path == 0 && lab[position[1] - 1][position[0]].isPassed && !(lab[position[1] - 1][position[0]].possibilities.includes("D"))) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] - 1, possibilities: lab[position[1] - 1][position[0]].possibilities });
    }
    if (typeof lab[position[1]][position[0] + 1] !== 'undefined' && lab[position[1]][position[0] + 1].path == 0 && lab[position[1]][position[0] + 1].isPassed && !(lab[position[1]][position[0] + 1].possibilities.includes('L'))) {
        returnPossibilities.push({ positionX: position[0] + 1, positionY: position[1], possibilities: lab[position[1]][position[0] + 1].possibilities });
    }
    if (typeof lab[position[1] + 1] !== 'undefined' && lab[position[1] + 1][position[0]].path == 0 && lab[position[1] + 1][position[0]].isPassed && !(lab[position[1] + 1][position[0]].possibilities.includes('U'))) {
        returnPossibilities.push({ positionX: position[0], positionY: position[1] + 1, possibilities: lab[position[1] + 1][position[0]].possibilities });
    }

    let indexMax = 0;
    for (let index = 0; index < returnPossibilities.length; index++) {
        console.log(ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY);
        console.log(ariane[i-1][0] == returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY);
        console.log(ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] == returnPossibilities[index].positionY);
        console.log(((ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) || (ariane[i-1][0] == returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) ||  (ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] == returnPossibilities[index].positionY)));
        console.log(returnPossibilities[index].possibilities.length > returnPossibilities[indexMax].possibilities.length);
        if ( ((ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) || (ariane[i-1][0] == returnPossibilities[index].positionX && ariane[i-1][1] != returnPossibilities[index].positionY) ||  (ariane[i-1][0] != returnPossibilities[index].positionX && ariane[i-1][1] == returnPossibilities[index].positionY)) && returnPossibilities[index].possibilities.length >= returnPossibilities[indexMax].possibilities.length) {
            indexMax = index;
        }
    }
    return indexMax;
}

function checkPossibilities(lab, position) {
    if (typeof lab[position[1] + 1] !== 'undefined' && lab[position[1] + 1][position[0]].path == 0 && !lab[position[1] + 1][position[0]].isPassed) {
        lab[position[1]][position[0]].possibilities = "D";
    }
    if (typeof lab[position[1]][position[0] + 1] !== 'undefined' && lab[position[1]][position[0] + 1].path == 0 && !lab[position[1]][position[0] + 1].isPassed) {
        lab[position[1]][position[0]].possibilities += "R";
    }
    if (typeof lab[position[1] - 1] !== 'undefined' && lab[position[1] - 1][position[0]].path == 0 && !lab[position[1] - 1][position[0]].isPassed) {
        lab[position[1]][position[0]].possibilities += "U";
    }
    if (typeof lab[position[1]][position[0] - 1] !== 'undefined' && lab[position[1]][position[0] - 1].path == 0 && !lab[position[1]][position[0] - 1].isPassed) {
        lab[position[1]][position[0]].possibilities += "L";
    }
    // if (lab[position[1]][position[0]].possibilities == "") {
    //     lab[position[1]][position[0]].possibilities += "N";
    // }
}
