const Leaf = (value) => ({
  kind: 'leaf',
  value
});

const Branch = (value, children) => ({
  kind: 'branch',
  value,
  children
});


const generateTreeTree = (depth) => {
  if (depth <= 1) return Leaf(1);

  // const splitAngle = Math.random() * 180;
  const splitAngle = 50;
  return Branch(splitAngle, [generateTreeTree(depth - 1), generateTreeTree(depth - 1)]);
};

const treeTreeToSVG = (tree) => {
  if (tree.kind === 'leaf') {
    return `<line x1="0" y1="0" x2="1" y2="0" stroke="black" stroke-width=".01"/>`;
  }
  if (tree.kind === 'branch') {
    const leftTree = treeTreeToSVG(tree.children[0]);
    const rightTree = treeTreeToSVG(tree.children[1]);
    return `
      <line x1="0" y1="0" x2="1" y2="0" stroke="black" stroke-width=".01"/>
      <g transform="translate(1,0) scale(0.75) rotate(${-tree.value / 2})">${leftTree}</g>
      <g transform="translate(1,0) scale(0.75) rotate(${tree.value / 2})">${rightTree}</g>
    `
  }
}

const tree = generateTreeTree(15);
const svg = `
  <svg width="800" height="600" viewBox="-0.1 -0.1 1.2 1.2" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0.5 1) scale(0.25) rotate(-90)">  
      ${treeTreeToSVG(tree)}
    </g>
  </svg>`

document.body.innerHTML = svg;

