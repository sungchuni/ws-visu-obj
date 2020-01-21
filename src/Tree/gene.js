export default function gene() {
  const { options } = this;
  const { dotsQuantity } = options;
  const tree = [[{ theta: 0, phi: 0 }], [{ theta: 0, phi: 0 }]];
  while (!isDone(tree, dotsQuantity)) {
    const numberOfLeaves = 3 * tree[tree.length - 2].length;
    const leaves = [];
    tree.push(leaves);
    for (let i = 0; i < numberOfLeaves; i++) {
      !isDone(tree, dotsQuantity) &&
        leaves.push({
          theta: Math.PI * 0.25 * (1 + (Math.random() - 0.5) * 0.2),
          phi:
            (i - i / numberOfLeaves) * Math.PI * 2 +
            (tree.length % 3) * (Math.PI / 3)
        });
    }
  }
  return tree;
}

function isDone(tree, dotsQuantity) {
  return !([].concat(...tree).length < dotsQuantity);
}
