import Point from "./Point";
import { drawShadow } from "../trait";

export default function draw() {
  const { data, options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = data.map((row, hIndex) =>
    row.map(
      (item, vIndex) =>
        new Point(Object.assign({}, item, { hIndex, vIndex }), options)
    )
  );
  const flattenedDataTable = [].concat(...dataTable);
  const safeArea = {
    width: clientRect.width - options.marginX * 2,
    height: clientRect.height - options.marginY * 2
  };
  const unit = {
    x: safeArea.width / (data.length - 1),
    y: safeArea.height / Math.max(...data.map(({ length }) => length))
  };
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    dataTable.forEach((col, colIndex) => {
      const nextCol = dataTable[colIndex + 1] || [];
      col
        .map(item => {
          const { marginX, marginY, pointSize } = options;
          const { hIndex, vIndex } = item;
          item.x = unit.x * hIndex + marginX;
          item.y = unit.y * vIndex + marginY + (unit.y + pointSize) * 0.5;
          return item;
        })
        .forEach((item, itemIndex) => {
          nextCol.forEach(nextColItem => {
            drawLine(ctx, options, item, nextColItem);
          });
          drawAnnotation(ctx, options, item, dataTable);
          drawPoint(ctx, options, item);
        });
    });
    options.hasShadow && drawShadow(ctx, options, clientRect);
    if (!flattenedDataTable.every(({ done }) => done)) {
      window.requestAnimationFrame(shoot);
    }
  };
  if (flattenedDataTable.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawLine(ctx, options, fromItem, toItem) {
  if (toItem) {
    const { color, colorLine, colorMinor, lineWidth } = options;
    const { x: fromX, y: fromY } = fromItem;
    const { isMinor, x: toX, y: toY } = toItem;
    if (toX && toY) {
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = ctx.strokeStyle = isMinor
        ? colorMinor || color
        : color || colorLine;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    }
  }
}

function drawAnnotation(ctx, options, item, dataTable) {
  const {
    color,
    colorText,
    colorMinor,
    fontSize,
    fontStyle,
    pointSize
  } = options;
  const { title, hIndex, x, y, isMinor } = item;
  const { length } = dataTable;
  const safeMarginX = pointSize;
  const safeMarginY = pointSize;
  const textPosition = ["left", "top", "right"][
    hIndex ? (length - 1 === hIndex ? 2 : 1) : 0
  ];
  const textAlign = { left: "right", top: "center", right: "left" }[
    textPosition
  ];
  const titleX =
    x + { left: -safeMarginX, top: 0, right: safeMarginX }[textPosition];
  const titleY = y + { left: 0, top: -safeMarginY, right: 0 }[textPosition];
  ctx.fillStyle = ctx.strokeStyle = isMinor
    ? colorMinor || color
    : color || colorText;
  ctx.textAlign = textAlign;
  ctx.font = `${fontSize}px ${fontStyle}`;
  ctx.fillText(title, titleX, titleY);
}

function drawPoint(ctx, options, item) {
  const { color, colorPoint, colorMinor, pointSize } = options;
  const { x, y, isMinor } = item;
  ctx.fillStyle = ctx.strokeStyle = isMinor
    ? colorMinor || color
    : color || colorPoint;
  ctx.beginPath();
  ctx.arc(x, y, pointSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
}
