import Dot from "./Dot";
import geo from "./geo";

export default function draw() {
  const { options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = [].concat(
    ...geo.call(this).map(({ theta, phis }) => {
      return phis.map(phi => new Dot({ phi, theta }, options));
    })
  );
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    dataTable
      .map(dot => {
        const { sphereRadius, perspective } = options;
        const { phi, theta } = dot;
        const { x, y, z } = {
          x: sphereRadius * Math.sin(phi) * Math.cos(theta),
          y: sphereRadius * Math.cos(phi),
          z: sphereRadius * Math.sin(phi) * Math.sin(theta) + sphereRadius
        };
        const s = (dot.s =
          (clientRect.width * perspective) /
          (clientRect.width * perspective + z));
        dot.h = x * s + clientRect.width * 0.5;
        dot.v = y * s + clientRect.height * 0.5;
        return dot;
      })
      .forEach(dot => {
        drawSphere(ctx, options, clientRect, dot);
      });
    drawShadow(ctx, options, clientRect);
    window.requestAnimationFrame(shoot);
  };
  if (dataTable.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawSphere(ctx, options, clientRect, dot) {
  const { color, colorPoint, dotSize } = options;
  const { z, v, h, s } = dot;
  ctx.globalAlpha = Math.abs(1 - z / clientRect.width);
  ctx.fillStyle = color || colorPoint;
  ctx.beginPath();
  ctx.arc(h, v, dotSize * s, 0, Math.PI * 2);
  ctx.fill();
}

function drawShadow(ctx, options, clientRect) {
  const {
    color,
    colorPoint,
    colorLine,
    sphereRadius,
    shadowSize,
    shadowOffset,
    shadowBlur
  } = options;
  const { width, height } = clientRect;
  const start = width * 0.5 - (shadowSize * 0.5 || sphereRadius * 0.25);
  const end = start + (shadowSize || sphereRadius * 0.5);
  const y = height * 0.5 + sphereRadius * 0.5 + shadowOffset;
  ctx.strokeStyle = color || colorLine || colorPoint;
  ctx.lineWidth = shadowBlur * 0.25;
  ctx.beginPath();
  ctx.moveTo(start, y);
  ctx.lineTo(end, y);
  ctx.filter = `blur(${shadowBlur}px)`;
  ctx.stroke();
  ctx.filter = "none";
}
