const lab = [[[0, ""], [1, ""], [0, ""], [0, ""], [0, ""], [0, ""], [0, ""]], [[0, ""], [1, ""], [0, ""], [1, ""], [1, ""], [0, ""], [1, ""]], [[0, ""], [1, ""], [0, ""], [1, ""], [0, ""], [0, ""], [0, ""]], [[0, ""], [0, ""], [0, ""], [0, ""], [1, ""], [1, ""], [0, ""]], [[0, ""], [1, ""], [0, ""], [1, ""], [0, ""], [0, ""], [0, ""]], [[0, ""], [1, ""], [0, ""], [0, ""], [0, ""], [1, ""], [0, ""]]];
const goal = [2, 4];
let position = [0, 0];
let i = 1;
let j = 0;
let ariane = [[0, 0]];

console.table(lab);

labyrinthe(lab, ariane, position);

console.table(lab);
console.log(position);
console.log(ariane);

function labyrinthe(lab, ariane, position) {
    if (position[0] == goal[0] && position[1] == goal[1]) {
        return;
    } else {
        checkPossibilities(lab, position);

        if (lab[position[0]][position[1]][1].charAt(0) == "D") {
            position[0] += 1;
        } else if (lab[position[0]][position[1]][1].charAt(0) == "R") {
            position[1] += 1;
        } else if (lab[position[0]][position[1]][1].charAt(0) == "U") {
            position[0] -= 1;
        } else if (lab[position[0]][position[1]][1].charAt(0) == "L") {
            position[1] -= 1;
        } else {

        }
        lab[position[0]][position[1]][1].slice(1);

        ariane[i] = [position[0], position[1]];
        i++;
        labyrinthe(lab, ariane, position);
    }

}

function checkPossibilities(lab, position) {
    if (typeof lab[position[0] + 1] !== 'undefined' && lab[position[0] + 1][position[1]][0] == 0) {
        lab[position[0]][position[1]][1] = "D";
    }
    if (typeof lab[position[0]][position[1] + 1] !== 'undefined' && lab[position[0]][position[1] + 1][0] == 0) {
        lab[position[0]][position[1]][1] += "R";
    }
    if (typeof lab[position[0] - 1] !== 'undefined' && lab[position[0] - 1][position[1]][0] == 0) {
        lab[position[0]][position[1]][1] += "U";
    }
    if (typeof lab[position[0]][position[1] - 1] !== 'undefined' && lab[position[0]][position[1] - 1][0] == 0) {
        lab[position[0]][position[1]][1] += "L";
    }
}
