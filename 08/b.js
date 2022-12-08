const { Console } = require("console");
var fs = require("fs");
var array = fs.readFileSync("C://input.txt").toString().split("\r\n");

var matrix = [];
array.forEach((line) => {
  singleArray = [];
  for (var i = 0; i < line.length; i++) {
    singleArray.push({ num: parseInt(line[i]), isVisible: false });
  }
  matrix.push(singleArray);
});

let highestScenicScore = 0;

for (let i = 0; i < matrix.length; i++) {
  for (let n = 0; n < matrix[0].length; n++) {
    let leftScore = 0;
    let rightScore = 0;
    let topScore = 0;
    let bottomScore = 0;

    //console.log("Current:" + matrix[i][n].num);

    //right
    let k = 1;
    while (true) {
      if (n + k + 1 > matrix[0].length) {
        break;
      }
      let nextPos = matrix[i][n + k];
      rightScore = rightScore + 1;
      if (nextPos == undefined || nextPos.num >= matrix[i][n].num) {
        break;
      }
      k++;
    }

    //left
    k = 1;
    while (true) {
      if (n - k < 0) {
        break;
      }
      let nextPos = matrix[i][n - k];
      leftScore = leftScore + 1;
      if (nextPos == undefined || nextPos.num >= matrix[i][n].num) {
        break;
      }
      k++;
    }

    //top
    k = 1;
    while (true) {
      if (i - k < 0) {
        break;
      }
      let nextPos = matrix[i - k][n];
      topScore = topScore + 1;
      if (nextPos == undefined || nextPos.num >= matrix[i][n].num) {
        break;
      }
      k++;
    }

    //bottom
    k = 1;
    while (true) {
      if (i + k + 1 > matrix[0].length) {
        break;
      }
      let nextPos = matrix[i + k][n];
      bottomScore = bottomScore + 1;
      if (nextPos == undefined || nextPos.num >= matrix[i][n].num) {
        break;
      }
      k++;
    }

    let totalScore = rightScore * leftScore * bottomScore * topScore;
    if (totalScore > highestScenicScore) {
      highestScenicScore = totalScore;
    }
  }
}
console.log("Highest scenic score: " + highestScenicScore);
