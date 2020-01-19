export function drawShadow(ctx, options, clientRect) {
  const {
    color,
    colorPoint,
    colorLine,
    shadowSize,
    shadowOffset,
    shadowBlur
  } = options;
  const { width, height } = clientRect;
  const start = width * 0.5 - shadowSize * 0.5;
  const end = start + shadowSize;
  const y = height - shadowOffset - shadowBlur * 2;
  ctx.strokeStyle = color || colorLine || colorPoint;
  ctx.lineWidth = shadowBlur * 0.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(start, y);
  ctx.lineTo(end, y);
  ctx.filter = `blur(${shadowBlur}px)`;
  ctx.stroke();
  ctx.lineCap = "butt";
  ctx.filter = "none";
}
