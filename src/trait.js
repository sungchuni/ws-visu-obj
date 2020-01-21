import { TRAIT_DRAW_SHADOW_BEZIER_OFFSET } from "./constant";

export function drawShadow(ctx, options, clientRect) {
  const { shadowColor, shadowSize, shadowBlur, shadowOffset } = options;
  const { width, height } = clientRect;
  const start = width * 0.5 - Math.min(width * 0.8, shadowSize) * 0.5;
  const end = start + Math.min(width * 0.8, shadowSize);
  const y = height - shadowBlur * 3 - shadowOffset;
  const bezierOffset = TRAIT_DRAW_SHADOW_BEZIER_OFFSET;
  ctx.fillStyle = shadowColor;
  ctx.beginPath();
  ctx.moveTo(start, y);
  ctx.bezierCurveTo(start, y - bezierOffset, end, y - bezierOffset, end, y);
  ctx.bezierCurveTo(end, y + bezierOffset, start, y + bezierOffset, start, y);
  ctx.filter = `blur(${shadowBlur}px)`;
  ctx.fill();
  ctx.filter = "none";
}
