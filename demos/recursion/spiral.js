// Path = [Point] | [Point, ...Path]

const Path = (startPoint, rest) => ({
  point: startPoint, 
  rest
});

const spiral = (distBetweenLoops, angularDistBetweenPoints, numPoints, currentAngle = 0) => {
  let r = distBetweenLoops * currentAngle;
  let point = [r * Math.cos(currentAngle), r * Math.sin(currentAngle)];

  if (numPoints <= 1) {
    return Path(point, null);
  }

  return Path(point, spiral(distBetweenLoops, 
                            angularDistBetweenPoints, 
                            numPoints - 1,
                            currentAngle + angularDistBetweenPoints));
}

const pathToPoints = (path) => {
  let points = [path.point];
  while (path.rest) {
    path = path.rest;
    points.push(path.point);
  }
  return points;
}

const renderPointsToSVG = (points) => {
  return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`;
}

const theSpiral = spiral(11, 1 * Math.PI / 180, 1000);
console.log(theSpiral);

const svgContent = renderPointsToSVG(pathToPoints(theSpiral));

document.body.innerHTML = `
  <svg width="800" height="600" viewBox="-400 -300 800 600" xmlns="http://www.w3.org/2000/svg">
    ${svgContent}
  </svg>
`;
