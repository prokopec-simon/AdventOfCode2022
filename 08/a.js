var fs = require("fs");
var array = fs.readFileSync("C://input.txt").toString().split("\r\n");

var treeMatrix = [];
array.forEach((line) => {
  singleArray = [];
  for (var i = 0; i < line.length; i++) {
    singleArray.push({ num: parseInt(line[i]), isVisible: false });
  }
  treeMatrix.push(singleArray);
});

//rows
for (let i = 0; i < treeMatrix.length; i++) {
  let currentHighest = -1;

  for (let n = 0; n < treeMatrix[0].length; n++) {
    if (treeMatrix[i][n].num > currentHighest) {
      treeMatrix[i][n].isVisible = true;
    }

    if (treeMatrix[i][n].num > currentHighest) {
      currentHighest = treeMatrix[i][n].num;
    }

    //rows backwards
    let currentHighestReverse = -1;
    let lastIndex = treeMatrix[0].length;
    for (let n = 0; n < treeMatrix[0].length; n++) {
      if (treeMatrix[i][lastIndex - 1 - n].num > currentHighestReverse) {
        treeMatrix[i][lastIndex - 1 - n].isVisible = true;
      }

      if (treeMatrix[i][lastIndex - 1 - n].num > currentHighestReverse) {
        currentHighestReverse = treeMatrix[i][lastIndex - 1 - n].num;
      }
    }
  }
}

//columns
for (let i = 0; i < treeMatrix[0].length; i++) {
  let currentHighest = -1;
  for (let n = 0; n < treeMatrix.length; n++) {
    let currentTree = treeMatrix[n][i];
    if (currentTree.num > currentHighest) {
      currentTree.isVisible = true;
      currentHighest = currentTree.num;
    }
  }

  //columnsBackwards
  let currentHighestReverse = -1;
  let lastIndex = treeMatrix.length;
  for (let n = 0; n < treeMatrix.length; n++) {
    let currentTree = treeMatrix[lastIndex - n - 1][i];
    if (currentTree.num > currentHighestReverse) {
      currentTree.isVisible = true;
      currentHighestReverse = currentTree.num;
    }
  }
}

let totalVisibleTrees = 0;
treeMatrix.forEach((el) => {
  el.forEach((elIn) => {
    if (elIn.isVisible == true) {
      totalVisibleTrees = totalVisibleTrees + 1;
    }
  });
});

console.log("Total visible trees: " + totalVisibleTrees);
