function renderTreeToSVG(node, position = { x: 100, y: 50 }, level = 0, maxLevelWidth = 800) {
  const childY = position.y + 100; // Increase vertical space between levels
  const childXOffset = Math.pow(1.5, level) * maxLevelWidth / 4; // Adjust horizontal spacing

  if (node.kind === 'leaf') {
      // Leaf as a circle with label
      return `<circle cx="${position.x}" cy="${position.y}" r="15" fill="lightgreen" />
              <text x="${position.x}" y="${position.y + 4}" font-size="10" fill="black" text-anchor="middle">${node.value}</text>`;
  } else if (node.kind === 'branch') {
      // Branch as a rect with label, and lines to children
      const branchSVG = `<rect x="${position.x - 15}" y="${position.y - 15}" width="30" height="30" fill="none" />
                         <text x="${position.x}" y="${position.y + 4}" font-size="10" fill="black" text-anchor="middle">${node.value}</text>`;
      // Positions for left and right children
      const leftChildPosition = { x: position.x - childXOffset, y: childY };
      const rightChildPosition = { x: position.x + childXOffset, y: childY };
      // Lines to children
      const linesSVG = `<line x1="${position.x}" y1="${position.y + 15}" x2="${leftChildPosition.x}" y2="${leftChildPosition.y - 15}" stroke="black"/>
                        <line x1="${position.x}" y1="${position.y + 15}" x2="${rightChildPosition.x}" y2="${rightChildPosition.y - 15}" stroke="black"/>`;
      // Recursively render children and concatenate SVG strings
      const childrenSVG = renderTreeToSVG(node.left, leftChildPosition, level + 1, maxLevelWidth / 2) +
                          renderTreeToSVG(node.right, rightChildPosition, level + 1, maxLevelWidth / 2);

      return branchSVG + linesSVG + childrenSVG;
  }
  return '';
}
// const renderTreeToSVG = (node, boundingBox = { x: 0, y: 0, width: 0, height: 0, rotation: 0 }, level) => {
//   const position = { x: boundingBox.x + boundingBox.width / 2, 
//                      y: boundingBox.y + boundingBox.height / 2 };
  
//   if (node.kind === 'leaf') {
//       // Leaf as a circle with label
//       return `<circle cx="${position.x}" cy="${position.y}" r="15" fill="lightgreen" />
//               <text x="${position.x}" y="${position.y + 4}" font-size="10" fill="black" text-anchor="middle">${node.value}</text>`;
//   } else if (node.kind === 'branch') {
//     const childOffsetValue = Math.pow(Math.E, level);
    
//     const leftChildPosition = { x: position.x - childOffsetValue, y: position.y + childOffsetValue };
//     const rightChildPosition = { x: position.x + childOffsetValue, y: position.y + childOffsetValue };
//     const childBounding
//   }
// }

// Wrapper function to generate full SVG
function treeToSVG(tree) {
  const svgContent = renderTreeToSVG(tree);
  return `<svg width="800" height="600" viewBox="-1000 0 2000 750" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
}

// // Example usage
// const exampleTree = {
//   kind: 'branch', value: 'Root', 
//   left: { kind: 'leaf', value: 'L1' },
//   right: {
//       kind: 'branch', value: 'R1', 
//       left: { kind: 'leaf', value: 'L2' }, 
//       right: { kind: 'leaf', value: 'R2' }
//   }
// };

// const svgOutput = treeToSVG(exampleTree);
// console.log(svgOutput);

function generateTree(level, value = 1, step = 1) {
  if (level <= 0) {
      // Base case
      return { kind: 'leaf', value: value };
  } else {
      // Corecursive step: generate left and right branches with an evolving pattern
      const newValue = value + step * level;
      const leftChild = generateTree(level - 1, newValue - step, step + 1);
      const rightChild = generateTree(level - 1, newValue + step, step + 1);
      return {
          kind: 'branch',
          value: value,
          left: leftChild,
          right: rightChild
      };
  }
}

// Example usage
const interestingTree = generateTree(0);
console.log(interestingTree);

const svgOutput = treeToSVG(interestingTree);
console.log(svgOutput);

// insert svg into dom
document.body.innerHTML = svgOutput;
