import { gsap } from "gsap";

import Point from "./Point";
import { drawShadow } from "../trait";

export default function draw() {
  const { data, options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = data.map(row =>
    Array.isArray(row)
      ? row.map((item, index) => new Point(item, options, !!index))
      : new Point(row, options)
  );
  const dataTables = (dataTable.every(point => point instanceof Point)
    ? [dataTable]
    : dataTable
  ).reverse();
  const flattenedDataTable = [].concat(...dataTable);
  const safeArea = {
    width: clientRect.width - options.marginX * 2,
    height: clientRect.height - options.marginY * 2
  };
  const axisYMarginY = options.marginY * (options.hasAxis ? 2 : 1.5);
  const unit = {
    x:
      safeArea.width /
      (data.every(row => Array.isArray(row)) ? data[0].length : data.length),
    y:
      (safeArea.height - axisYMarginY) /
      Math.max(
        ...[].concat(
          ...data.map(row =>
            Array.isArray(row) ? row.map(({ value }) => value) : row.value
          )
        )
      )
  };
  let maskingPoint = { current: 0 };
  if (options.hasAnimationHorizontal) {
    const duration = options.animationDuration / 1000;
    gsap.to(maskingPoint, duration, {
      ease: "power1.in",
      current: clientRect.width
    });
  }
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    dataTables.forEach((dataTable, dataTableIndex) => {
      dataTable
        .map((item, itemIndex) => {
          const { marginX, marginY } = options;
          item.x = unit.x * itemIndex + unit.x * 0.5 + marginX;
          item.y =
            clientRect.height - (unit.y * Math.abs(item.value) + axisYMarginY);
          item.isMinor = dataTableIndex !== dataTables.length - 1;
          return item;
        })
        .forEach((item, itemIndex) => {
          drawLine(ctx, options, item, dataTable[itemIndex + 1], maskingPoint);
          drawAnnotation(ctx, options, item, maskingPoint);
          drawPoint(ctx, options, item, maskingPoint);
        });
    });
    if (flattenedDataTable.every(({ done }) => done)) {
      drawTitle(ctx, options, clientRect);
      options.hasAxis && drawAxis(ctx, options, safeArea);
      options.hasShadow &&
        !options.hasAxis &&
        drawShadow(ctx, options, clientRect);
    } else {
      window.requestAnimationFrame(shoot);
    }
  };
  if (flattenedDataTable.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawTitle(ctx, options, clientRect) {
  const {
    color,
    colorText,
    titleFontSize,
    fontStyle,
    title,
    marginY,
    hasAxis
  } = options;
  const { x, y } = {
    x: clientRect.width * 0.5,
    y: marginY * (hasAxis ? 0.5 : 1)
  };
  ctx.font = `${titleFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillStyle = ctx.strokeStyle = color || colorText;
  ctx.fillText(title, x, y);
}

function drawAxis(ctx, options, safeArea) {
  const { color, colorLine, colorAxis, marginX, marginY, lineWidth } = options;
  const { width, height } = safeArea;
  const [fromX, fromY, toX, toY] = [
    marginX,
    marginY,
    marginX + width,
    marginY + height
  ];
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = ctx.strokeStyle = colorAxis || color || colorLine;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function drawLine(ctx, options, fromItem, toItem, maskingPoint) {
  if (toItem) {
    const {
      color,
      colorLine,
      colorMinor,
      lineWidth,
      hasAnimationHorizontal
    } = options;
    const { x: fromX, y: fromY, isMinor } = fromItem;
    const { x: toX, y: toY } = toItem;
    const { current } = maskingPoint;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = ctx.strokeStyle = isMinor ? colorMinor : color || colorLine;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    hasAnimationHorizontal
      ? ctx.lineTo(
          current < toX
            ? current < fromX
              ? fromX
              : fromX + (current - fromX)
            : toX,
          current < toX
            ? current < fromX
              ? fromY
              : fromY + (toY - fromY) * ((current - fromX) / (toX - fromX))
            : toY
        )
      : ctx.lineTo(toX, toY);
    ctx.stroke();
  }
}

function drawAnnotation(ctx, options, item, maskingPoint) {
  const {
    color,
    colorText,
    colorMinor,
    annotationTitleFontSize,
    annotationSubtitleFontSize,
    fontStyle,
    marginY,
    pointSize,
    hasAnimationHorizontal
  } = options;
  const { title, subtitle, x, y, isMinor } = item;
  const { current } = maskingPoint;
  const safeMarginX = -pointSize;
  const safeMarginY = 8;
  const subtitleX = x + safeMarginX;
  const titleX = x + safeMarginX;
  const titleY = y + annotationTitleFontSize + safeMarginY;
  const subtitleY = titleY + annotationTitleFontSize * 1.25;
  if (!hasAnimationHorizontal || x < current) {
    ctx.fillStyle = ctx.strokeStyle = isMinor
      ? colorMinor || color
      : color || colorText;
    ctx.textAlign = "left";
    ctx.font = `${annotationTitleFontSize}px ${fontStyle}`;
    ctx.fillText(title, titleX, titleY);
    ctx.font = `${annotationSubtitleFontSize}px ${fontStyle}`;
    ctx.fillText(subtitle, subtitleX, subtitleY);
  }
}

function drawPoint(ctx, options, item, maskingPoint) {
  const {
    color,
    colorPoint,
    colorMinor,
    pointSize,
    hasAnimationHorizontal
  } = options;
  const { x, y, isMinor } = item;
  const { current } = maskingPoint;
  if (!hasAnimationHorizontal || x < current) {
    ctx.fillStyle = ctx.strokeStyle = isMinor
      ? colorMinor || color
      : color || colorPoint;
    ctx.beginPath();
    ctx.arc(x, y, pointSize * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
