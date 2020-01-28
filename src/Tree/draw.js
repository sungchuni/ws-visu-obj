import { gsap } from "gsap";

import Leaf from "./Leaf";
import gene from "./gene";
import { drawShadow } from "../trait";

export default function draw() {
  const { options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const leaves = gene()
    .map(({ k, x, y, z, link }) => {
      return new Leaf({ k, x, y, z, link });
    })
    .map((leaf, index, leaves) => {
      const { x, y } = leaf;
      leaf.h =
        x * options.treeWidth + (clientRect.width - options.treeWidth) * 0.5;
      leaf.v = y * options.treeHeight;
      leaf.link = leaf.link.map(k => leaves[k]);
      return leaf;
    });
  let maskingIndex = { current: 0 };
  let done = false;
  const duration = options.animationDuration / 1000;
  gsap.to(maskingIndex, duration, {
    ease: "power1.in",
    current: leaves.length,
    onComplete: () => void (done = true)
  });
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    leaves.forEach(leaf => {
      drawNode(ctx, options, leaf, maskingIndex);
      drawLeaf(ctx, options, leaf, maskingIndex);
    });
    options.hasShadow && drawShadow(ctx, options, clientRect);
    if (!done) {
      window.requestAnimationFrame(shoot);
    }
  };
  if (leaves.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawNode(ctx, options, fromLeaf, maskingIndex) {
  const { color, colorLine } = options;
  const { z: fromZ, h: fromH, v: fromV, link } = fromLeaf;
  const { current } = maskingIndex;
  link.forEach(toLeaf => {
    const { k: toK, z: toZ, h: toH, v: toV } = toLeaf;
    ctx.globalAlpha = Math.min(fromZ, toZ) * Math.min(1, current - toK);
    ctx.strokeStyle = color || colorLine;
    ctx.beginPath();
    ctx.moveTo(fromH, fromV);
    ctx.lineTo(toK < current ? toH : fromH, toK < current ? toV : fromV);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}

function drawLeaf(ctx, options, leaf, maskingIndex) {
  const { color, colorPoint, dotSize } = options;
  const { k, z, h, v } = leaf;
  const { current } = maskingIndex;
  if (k < current) {
    const weight = Math.min(1, current - k);
    ctx.globalAlpha = z * weight;
    ctx.fillStyle = color || colorPoint;
    ctx.beginPath();
    ctx.arc(h, v, dotSize * z * weight, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
