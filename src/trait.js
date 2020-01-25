import { TRAIT_DRAW_SHADOW_BEZIER_OFFSET } from "./constant";

export function drawShadow(ctx, options, clientRect) {
  const { shadowColor, shadowSize, shadowBlur, shadowOffset } = options;
  const { width, height } = clientRect;
  const start = width * 0.5 - Math.min(width * 0.8, shadowSize) * 0.5;
  const end = start + Math.min(width * 0.8, shadowSize);
  const y = height + TRAIT_DRAW_SHADOW_BEZIER_OFFSET + shadowOffset;
  const bezierOffset = TRAIT_DRAW_SHADOW_BEZIER_OFFSET;
  ctx.fillStyle = shadowColor;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetY = -(
    TRAIT_DRAW_SHADOW_BEZIER_OFFSET * 2 +
    shadowBlur * 2 +
    shadowOffset
  );
  ctx.beginPath();
  ctx.moveTo(start, y);
  ctx.bezierCurveTo(start, y - bezierOffset, end, y - bezierOffset, end, y);
  ctx.bezierCurveTo(end, y + bezierOffset, start, y + bezierOffset, start, y);
  ctx.fill();
  ctx.shadowColor = "transparent";
}
