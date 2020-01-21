import Leaf from "./Leaf";
import gene from "./gene";
import { drawShadow } from "../trait";

export default function draw() {
  const { options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = gene.call(this);
  const unit = options.treeHeight / dataTable.length;
  const wholeLeaves = [];
  const root = dataTable
    .map((leaves, level) => {
      return leaves.map(leaf => {
        leaf.r =
          level < 2 ? level * unit * 0.5 : getRandomRadius(unit) * Math.sqrt(2);
        return new Leaf(leaf, options);
      });
    })
    .reduce((root, leaves, level, parsedTree) => {
      const prevLeaves = parsedTree[level - 1];
      if (prevLeaves) {
        leaves.forEach((leaf, leafIndex) => {
          const prevLeaf = prevLeaves[leafIndex % prevLeaves.length];
          prevLeaf.leaves.push(leaf);
          wholeLeaves.push(leaf);
        });
      } else {
        const leaf = leaves[0];
        root = leaf;
        wholeLeaves.push(leaf);
      }
      return root;
    }, {});
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    drawTree(ctx, options, clientRect, root, null, wholeLeaves);
    options.hasShadow && drawShadow(ctx, options, clientRect);
    window.requestAnimationFrame(shoot);
  };
  if (dataTable.length) {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    window.requestAnimationFrame(shoot);
  }
}

function getRandomRadius(unit) {
  return unit * (1 + (Math.random() - 0.5) * 0.2);
}

function drawTree(
  ctx,
  options,
  clientRect,
  currentLeaf,
  parentLeaf,
  wholeLeaves
) {
  const { dotSize, perspective } = options;
  const { theta, phi, r, leaves } = currentLeaf;
  const { h: parentH = clientRect.width * 0.5, v: parentV = dotSize } =
    parentLeaf || {};
  const x = (currentLeaf.x = r * Math.sin(theta) * Math.cos(phi));
  const y = (currentLeaf.y = r * Math.cos(theta));
  const z = (currentLeaf.z = r * Math.sin(theta) * Math.sin(phi));
  const s = (currentLeaf.s =
    (clientRect.width * perspective) / (clientRect.width * perspective + z));
  currentLeaf.h = x * s + parentH;
  currentLeaf.v = y * s + parentV;
  drawNode(ctx, options, clientRect, parentLeaf || {}, currentLeaf);
  drawLine(ctx, options, currentLeaf, wholeLeaves);
  drawLeaf(ctx, options, clientRect, currentLeaf);
  leaves.forEach(
    leaf =>
      void drawTree(ctx, options, clientRect, leaf, currentLeaf, wholeLeaves)
  );
}

function drawNode(ctx, options, clientRect, fromLeaf, toLeaf) {
  const { color, colorLine } = options;
  const { z: fromZ, h: fromH, v: fromV } = fromLeaf;
  const { z: toZ, h: toH, v: toV } = toLeaf;
  ctx.globalAlpha = Math.min(
    1,
    Math.abs(0.5 - ((fromZ + toZ) * 0.5) / clientRect.width)
  );
  ctx.strokeStyle = color || colorLine;
  ctx.beginPath();
  ctx.moveTo(fromH, fromV);
  ctx.lineTo(toH, toV);
  ctx.stroke();
}

function drawLine(ctx, options, currentLeaf, wholeLeaves) {
  if (!wholeLeaves.slice(0, 2).includes(currentLeaf)) {
    const { color, colorLine } = options;
    const { r, x, y, z, h, v } = currentLeaf;
    const candidates = wholeLeaves.map(({ x: toX, y: toY, z: toZ }, i) => ({
      d: Math.sqrt(
        Math.pow(toX - x, 2) + Math.pow(toY - y, 2) + Math.pow(toZ - z, 2)
      ),
      i
    }));

    candidates
      .sort((a, b) => a.d - b.d)
      .filter(({ d, i }) => d && i > 1)
      .slice(0, 2)
      .forEach(({ d, i }) => {
        const { h: toH, v: toV } = wholeLeaves[i];
        if (toH && toV) {
          ctx.globalAlpha = Math.min(1, Math.sqrt(r) / d);
          ctx.strokeStyle = color || colorLine;
          ctx.beginPath();
          ctx.moveTo(h, v);
          ctx.lineTo(toH, toV);
          ctx.stroke();
        }
      });
  }
}

function drawLeaf(ctx, options, clientRect, currentLeaf) {
  const { color, colorPoint, dotSize } = options;
  const { z, h, v, s } = currentLeaf;
  ctx.globalAlpha = Math.min(1, Math.abs(0.8 - z / clientRect.width));
  ctx.fillStyle = color || colorPoint;
  ctx.beginPath();
  ctx.arc(h, v, dotSize * s, 0, Math.PI * 2);
  ctx.fill();
}
