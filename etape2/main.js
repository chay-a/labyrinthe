const lab = [[[0, ""],[1, ""],[0, ""],[0, ""],[0, ""],[0, ""],[0, ""]], [[0, ""],[1, ""],[0, ""],[1, ""],[1, ""],[0, ""],[1, ""]], [[0, ""],[1, ""],[0, ""],[1, ""],[0, ""],[0, ""],[0, ""]], [[0, ""],[0, ""],[0, ""],[0, ""],[1, ""],[1, ""],[0, ""]], [[0, ""],[1, ""],[0, ""],[1, ""],[0, ""],[0, ""],[0, ""]], [[0, ""],[1, ""],[0, ""],[0, ""],[0, ""],[1, ""],[0, ""]]];
const goal = [2, 4];
let position = [0, 0];
let i = 1;
let j = 0;
let ariane = [[0,0]];

console.table(lab);

labyrinthe(lab, ariane, position);

console.table(lab);
console.log(position);
console.log(ariane);

function labyrinthe(lab, ariane, position) {
    if (position[0] == goal[0] && position[1] == goal[1]) {
        return;
    } else {
        if (typeof lab[position[0]+1] !== 'undefined' && lab[position[0]+1][position[1]][0] == 0 && lab[position[0]+1][position[1]][1].charAt(0) != "D") {
            lab[position[0]][position[1]][1] = "D";
            position[0] += 1;

        } else if (typeof lab[position[0]][position[1] + 1] !== 'undefined' && lab[position[0]][position[1] + 1][0] == 0 && lab[position[0]][position[1] + 1][1].charAt(1) != "R") {
            lab[position[0]][position[1]][1] = "DR";
            position[1] += 1;

        } else if (typeof lab[position[0] - 1] !== 'undefined' && lab[position[0] - 1][position[1]][0] == 0 && lab[position[0] - 1][position[1]][1].charAt(2) != "DRU") {
            lab[position[0]][position[1]][1] = "DRU";
            position[0] -= 1;

        } else if (typeof lab[position[0]][position[1] - 1] !== 'undefined' && lab[position[0]][position[1] - 1][0] == 0 && lab[position[0]][position[1] - 1][1].charAt(3) != "DRUL") {
            lab[position[0]][position[1]][1] = "DRUL";
            position[1] -= 1;
        } else {
            position[0] = ariane[i-1][0];
            position[1] = ariane[i-1][1];
        }
        ariane[i] = [position[0], position[1]];
        i++;
        labyrinthe(lab, ariane, position);
    }

}