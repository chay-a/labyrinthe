function printMazewithPosition(mazeInfo, position) {
    console.log("------------------------------------------------------");

    for (let i = 0; i < mazeInfo.length; i++) {
        let mazeDisplay = "";
        for (let j = 0; j < mazeInfo[i].length; j++) {
            if (mazeInfo[i][j].path == 0) {
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