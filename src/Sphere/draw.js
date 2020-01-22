import Dot from "./Dot";
import geo from "./geo";

import { drawShadow } from "../trait";

export default function draw() {
  const { options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = geo
    .call(this)
    .map(({ theta, phis }, thetaIndex, thetas) => {
      const dots = phis.map(phi => {
        let link = [];
        const { phis: nextPhis } = thetas[thetaIndex + 1] || {};
        if (nextPhis) {
          const candidates = nextPhis
            .map((targetPhi, i) => ({ d: Math.abs(targetPhi - phi), i }))
            .sort((a, b) => b.d - a.d)
            .map(({ i }) => i);
          link.push(
            ...(phis.length < 4 ? candidates : candidates.slice(-2))
          );
        }
        return new Dot({ phi, theta, link }, options);
      });
      return dots;
    });
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    dataTable.forEach((row, rowIndex) => {
      row
        .map(dot => {
          const { sphereRadius, perspective } = options;
          const { phi, theta } = dot;
          const x = (dot.x = sphereRadius * Math.sin(theta) * Math.cos(phi));
          const y = (dot.y = sphereRadius * Math.cos(theta));
          const z = (dot.z =
            sphereRadius * Math.sin(theta) * Math.sin(phi) + sphereRadius);
          const s = (dot.s =
            (clientRect.width * perspective) /
            (clientRect.width * perspective + z));
          dot.h = x * s + clientRect.width * 0.5;
          dot.v = y * s + clientRect.height * 0.5;
          return dot;
        })
        .forEach((dot, dotIndex) => {
          drawHorizontalLine(ctx, options, clientRect, dot, row[dotIndex + 1]);
          drawVerticalLine(
            ctx,
            options,
            clientRect,
            dot,
            dataTable[rowIndex + 1]
          );
          drawSphere(ctx, options, clientRect, dot);
        });
    });
    options.hasShadow && drawShadow(ctx, options, clientRect);
    window.requestAnimationFrame(shoot);
  };
  if (dataTable.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawHorizontalLine(ctx, options, clientRect, fromDot, toDot) {
  if (toDot) {
    const { color, colorLine } = options;
    const { z: fromZ, v: fromV, h: fromH } = fromDot;
    const { z: toZ, v: toV, h: toH } = toDot;
    ctx.globalAlpha = Math.abs(1 - ((fromZ + toZ) * 0.5) / clientRect.width);
    ctx.strokeStyle = color || colorLine;
    ctx.beginPath();
    ctx.moveTo(fromH, fromV);
    ctx.lineTo(toH, toV);
    ctx.stroke();
  }
}

function drawVerticalLine(ctx, options, clientRect, dot, nextDots) {
  const { color, colorLine } = options;
  const { link = [], z, v, h } = dot;
  link.forEach(index => {
    const { z: targetZ, v: targetV, h: targetH } = nextDots[index];
    if (targetZ && targetV && targetH) {
      ctx.globalAlpha = Math.abs(1 - ((z + targetZ) * 0.5) / clientRect.width);
      ctx.strokeStyle = color || colorLine;
      ctx.beginPath();
      ctx.moveTo(h, v);
      ctx.lineTo(targetH, targetV);
      ctx.stroke();
    }
  });
}

function drawSphere(ctx, options, clientRect, dot) {
  const { color, colorPoint, dotSize } = options;
  const { z, v, h, s } = dot;
  ctx.globalAlpha = Math.abs(1 - (z / clientRect.width));
  ctx.fillStyle = color || colorPoint;
  ctx.beginPath();
  ctx.arc(h, v, dotSize * s, 0, Math.PI * 2);
  ctx.fill();
}
