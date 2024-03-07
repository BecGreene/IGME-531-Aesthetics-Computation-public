// Path = [Point] | [Point, ...Path]

const Path = (startPoint, rest) => ({
  point: startPoint, 
  rest
});

const infiniteSpiral = (distBetweenLoops, angularDistBetweenPoints, currentAngle = 0) => {
  let r = distBetweenLoops * currentAngle;
  let point = [r * Math.cos(currentAngle), r * Math.sin(currentAngle)];

  return Path(point, () => {
    return infiniteSpiral(distBetweenLoops, 
                          angularDistBetweenPoints, 
                          currentAngle + angularDistBetweenPoints);
    });
}

const pathToPoints = (numPoints, path) => {
  let points = [path.point];
  for (let i = 0; i < numPoints; i++) {
    path = path.more();
    points.push(path.point);
  }
  return points;
}

const renderPointsToSVG = (points) => {
  return `<polyline points="${points.join(' ')}" stroke="black" fill="none" />`;
}

const spiral = infiniteSpiral(11, 1 * Math.PI / 180);

const svgContent = renderPointsToSVG(pathToPoints(10000, spiral));

document.body.innerHTML = `
  <svg width="800" height="600" viewBox="-400 -300 800 600" xmlns="http://www.w3.org/2000/svg">
    ${svgContent}
  </svg>
`;
