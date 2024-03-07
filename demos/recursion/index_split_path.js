

/*
  base numbers 1 and 0
  2 is 0 + 1 + 1
  3 is 0 + 1 + 1 + 1
  4 is 0 + 4 * 1

  pos_integers = 0 | pos_integers + 1
*/

// const counting = (someNum) => {
//   // Case: 0
//   if (someNum === 0) {
//     return 0;
//   } 
//   // Case: pos_integers + 1
//   else if (someNum > 0) {
//     // someNum = (someNumLess1) + 1
//     return counting(someNum - 1) + someNum;
//   }
// }

// /*
//   list = [] | {someElem: x, rest: list}
// */
// // {someElem: 1, rest: []}
// // {someElem: 2, rest: {someElem: 1, rest: []}}

// const counting = (someListOfNumbers) => {
//   // if someList is []
//   if (someListOfNumbers.length === 0) {
//     return 0;
//   } 
//   // if someList .length is > 0
//   // {someElem: x, rest: list}
//   else if (someListOfNumbers.length > 0) {
//     return someListOfNumbers[0] + counting(someListOfNumbers.slice(1))
//   } 
// }

// naive structure: [point, point, point, ...point]

// line is two or more points in series
// line = (point, point)
// line = (point, line)

// line = (point, point)
// line = (line, line)

// [a, b, c]
// [[a, b], [b, c]]


// path = (point, point)
const Line = (pointA, pointB) => {
  return {
    kind: 'line',
    a: pointA,
    b: pointB
  };
}

// path = (path, path)
const SplitPath = (pathA, pathB) => {
  return {
    kind: 'split',
    pathA: pathA,
    pathB: pathB
  }
}

const examplePath = 
  SplitPath(
    SplitPath(
      Line([0, 0], [1, 1]),
      Line([1,1], [2, 1])
    ),
    Line([2,1], [100,100])
  );

const pathToPoints = (path) => {
  // if path is a line
  if (path.kind === 'line') {
    return [path.a, path.b];
  }

  // if path is a split path
  if (path.kind === 'split') {
    const pointsA = pathToPoints(path.pathA);
    const pointsB = pathToPoints(path.pathB);

    return pointsA.concat(pointsB);
  }
}

const produceSplitPath = (path, levels = 0) => {
  if (levels === 0) {
    return path;
  }

  if (path.kind === 'line') {
    const a = path.a;
    const b = path.b;
    const midPoint = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    const lineLength = Math.sqrt(Math.pow(b[0] - a[0], 2) + 
                                 Math.pow(b[1] - a[1], 2));
    const perpendicularToLine = [
      -(b[1] - a[1]) / lineLength,
      (b[0] - a[0]) / lineLength
    ];

    const angle = 90 * Math.PI / 180;
    let splitPoint = [
      midPoint[0] + (lineLength / 2) * Math.sin(angle) * perpendicularToLine[0],
      midPoint[1] + (lineLength / 2) * Math.sin(angle) * perpendicularToLine[1]
    ];

    return produceSplitPath(
      SplitPath(
        Line(a, splitPoint),
        Line(splitPoint, b)
      ),
      levels - 1
    );
  } 
  else if (path.kind === 'split') {    
    const splitPathA = produceSplitPath(path.pathA, levels - 1);
    const splitPathB = produceSplitPath(path.pathB, levels - 1);

    return produceSplitPath(
      SplitPath(splitPathA, splitPathB),
      levels - 1 
    );
  }

}

let theSplitPath = produceSplitPath(examplePath, 17);
const points = pathToPoints(theSplitPath);

// draw to svg
document.body.innerHTML = `
  <svg width="800" height="600" viewBox="-400 -300 800 600" xmlns="http://www.w3.org/2000/svg">
    ${renderPointsToSVG(points)}
  </svg>
`;


function renderPointsToSVG (points) {
  let dString = ''
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      dString += `M${points[0]} `;
    }
    else {
      dString += `L${points[i]} `;
    }
  }
  return `<path d="${dString}" stroke="black" fill="none" />`;
}







// // Base case of path of points
// const Line = (start, end) => {
//   return { kind: 'line', start: start, end: end };
// }

// // Recursive case of path of points
// const SplitPath = (path1, path2) => {
//   return { kind: 'split', path1: path1, path2: path2 };
// }

// // Recursive function to render a Path to an array of points
// const renderPathToPoints = (path) => {
//   // Base case: convert a line to an array of points
//   if (path.kind === 'line') {
//       return [path.start, path.end];
//   } else if (path.kind === 'split') {
//       // Recursive step: concatenate arrays of points
//       const path1Points = renderPathToPoints(path.path1);
//       const path2Points = renderPathToPoints(path.path2);

//       return path1Points.concat(path2Points);
//   } 

//   return [];
// }

// const renderPointsToSVG = (points) => {
//   let dString = ''
//   for (let i = 0; i < points.length; i++) {
//     if (i === 0) {
//       dString += `M${points[0]} `;
//     }
//     else {
//       dString += `L${points[i]} `;
//     }
//   }
//   return `<path d="${dString}" stroke="black" fill="none" />`;
// }

// // Corecursive function accepting a single Path object, producing a Levy C fractal Curve
// const levyC = (level, path) => {
//   if (level <= 0) {
//       return path;
//   }

//   // Base case: a line is replaced by a split path
//   if (path.kind === 'line') {
//       let angle = 90 * Math.PI / 180; 

//       const start = path.start;
//       const end = path.end;
//       const lineLength = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2));
//       const midPoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
//       const perpendicularToLine = [
//         -(end[1] - start[1]) / lineLength,
//         (end[0] - start[0]) / lineLength
//       ];

//       let splitPoint = [
//         midPoint[0] + (lineLength / 2) * Math.sin(angle) * perpendicularToLine[0],
//         midPoint[1] + (lineLength / 2) * Math.sin(angle) * perpendicularToLine[1]
//       ];

//       const splitPath1 = Line(start, splitPoint);
//       const splitPath2 = Line(splitPoint, end);
//       return levyC(level - 1, SplitPath(splitPath1, splitPath2));
//   } else if (path.kind === 'split') {
//       // Recursive step: apply levyC to each path in the split
//       const path1 = levyC(level - 1, path.path1);
//       const path2 = levyC(level - 1, path.path2);
//       return SplitPath(path1, path2);
//   } 

//   return path;
// }

// // Example of using the Line and SplitPath constructors
// // const examplePath = SplitPath(Line([0, 0], [10, 10]), SplitPath(Line([10, 10], [20, 10]), Line([20, 10], [30, 0])));
// const leviedPath = levyC(3, Line([-100, 0], [100, 0]));

// const svgContent = renderPointsToSVG(renderPathToPoints(leviedPath));

// document.body.innerHTML = `
//   <svg width="800" height="600" viewBox="-400 -300 800 600" xmlns="http://www.w3.org/2000/svg">
//     ${svgContent}
//   </svg>
// `;
