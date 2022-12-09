var fs = require("fs");
var array = fs.readFileSync("C://input.txt").toString().split("\r\n");

let treeMatrix: string[][] = [];

for (var i = 0; i < 10; i++) {
  let singleArray: string[] = [];
  for (var n = 0; n < 10; n++) {
    singleArray.push(".");
  }
  treeMatrix.push(singleArray);
}
let visitedCoords: number[][] = [];
let currentCoordsHead: number[] = [0, 0];
let currentCoordsMidParts: number[][] = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
let currentCoordsTail: number[] = [0, 0];

array.forEach((line: string) => {
  let direction = line.substring(0, 1);
  let steps = Number(line.substring(2));

  for (var k = 0; k < steps; k++) {
    if (direction == "R") {
      currentCoordsHead[0] = currentCoordsHead[0] + 1;
    }

    if (direction == "L") {
      currentCoordsHead[0] = currentCoordsHead[0] - 1;
    }

    if (direction == "U") {
      currentCoordsHead[1] = currentCoordsHead[1] + 1;
    }

    if (direction == "D") {
      currentCoordsHead[1] = currentCoordsHead[1] - 1;
    }

    currentCoordsMidParts[0] = matchTailMovement(
      currentCoordsHead,
      currentCoordsMidParts[0]
    );

    for (let i = 0; i < 7; i++) {
      currentCoordsMidParts[i + 1] = matchTailMovement(
        currentCoordsMidParts[i],
        currentCoordsMidParts[i + 1]
      );
    }

    currentCoordsTail = matchTailMovement(
      currentCoordsMidParts[7],
      currentCoordsTail
    );

    if (
      searchForArray(visitedCoords, [
        currentCoordsTail[0],
        currentCoordsTail[1],
      ]) == false
    ) {
      visitedCoords.push([currentCoordsTail[0], currentCoordsTail[1]]);
    }
  }
});
console.log(visitedCoords.length);

function searchForArray(haystack: any, needle: any) {
  let stringElement = JSON.stringify(needle);
  let stringList = JSON.stringify(haystack);
  if (stringList.indexOf(stringElement) > 0) {
    return true;
  }
  return false;
}

function matchTailMovement(
  currentCoordsHead: number[],
  currentCoordsTail: number[]
) {
  let differenceX = currentCoordsHead[0] - currentCoordsTail[0];
  let differenceY = currentCoordsHead[1] - currentCoordsTail[1];

  if (Math.abs(differenceX) == 1 && Math.abs(differenceY) == 1) {
    return currentCoordsTail;
  }

  if (Math.abs(differenceX) + Math.abs(differenceY) > 2) {
    let toMoveX = 0;
    if (differenceX > 0) {
      toMoveX = 1;
    } else {
      toMoveX = -1;
    }

    let toMoveY = 0;
    if (differenceY > 0) {
      toMoveY = 1;
    } else {
      toMoveY = -1;
    }
    currentCoordsTail[0] = currentCoordsTail[0] + toMoveX;
    currentCoordsTail[1] = currentCoordsTail[1] + toMoveY;

    return currentCoordsTail;
  }

  if (Math.abs(differenceX) > 1) {
    let toMove = 1;
    if (differenceX < 0) {
      toMove = -1;
    }
    currentCoordsTail[0] = currentCoordsTail[0] + toMove;
  }

  if (Math.abs(differenceY) > 1) {
    let toMove = 1;
    if (differenceY < 0) {
      toMove = -1;
    }
    currentCoordsTail[1] = currentCoordsTail[1] + toMove;
  }

  return currentCoordsTail;
}
