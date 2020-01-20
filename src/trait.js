export function drawShadow(ctx, options, clientRect) {
  const {
    color,
    colorPoint,
    colorLine,
    shadowSize,
    shadowBlur,
    shadowOffset = 0
  } = options;
  const { width, height } = clientRect;
  const start = width * 0.5 - shadowSize * 0.5;
  const end = start + shadowSize;
  const y = height - shadowBlur * 2 - shadowOffset;
  const bezierOffset = shadowSize * 0.125;
  ctx.fillStyle = color || colorLine || colorPoint;
  ctx.beginPath();
  ctx.moveTo(start, y);
  ctx.bezierCurveTo(start, y - bezierOffset, end, y - bezierOffset, end, y);
  ctx.bezierCurveTo(end, y + bezierOffset, start, y + bezierOffset, start, y);
  ctx.filter = `blur(${shadowBlur}px)`;
  ctx.fill();
  ctx.filter = "none";
}
