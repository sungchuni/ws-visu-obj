import Point from "./Point";

export default function draw() {
  const { data, options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = data.map(item => new Point(item, options));
  const safeArea = {
    width: clientRect.width - options.marginX * 2,
    height: clientRect.height - options.marginY * 4
  };
  const unit = {
    x: safeArea.width / data.length,
    y:
      (safeArea.height - options.marginY * 2) /
      Math.max(...data.map(({ value }) => Math.abs(value)))
  };
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    drawTitle(ctx, options, clientRect);
    drawAxis(ctx, options, safeArea);
    dataTable
      .map((item, index) => {
        const { marginX, marginY } = options;
        item.x = unit.x * index + unit.x * 0.5 + marginX;
        item.y =
          clientRect.height - (unit.y * Math.abs(item.value) + marginY * 3);
        return item;
      })
      .forEach((item, index) => {
        drawLine(ctx, options, item, dataTable[index + 1]);
        drawSubtitle(ctx, options, safeArea, item);
        drawGrid(ctx, options, safeArea, item);
        drawPoint(ctx, options, item);
      });
    if (options.showTopAnnotation) {
      const rawTopItem = data
        .slice()
        .sort(({ value: aValue }, { value: bValue }) => bValue - aValue)[0];
      const topItem = dataTable[data.indexOf(rawTopItem)];
      drawTopAnnotation(ctx, options, topItem);
    }
    if (!dataTable.every(({ done }) => done)) {
      window.requestAnimationFrame(shoot);
    }
  };
  if (dataTable.length) {
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
    marginY
  } = options;
  const { x, y } = { x: clientRect.width * 0.5, y: marginY };
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
    marginY * 2,
    marginX + width,
    marginY * 2 + height
  ];
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = ctx.strokeStyle = colorAxis || color || colorLine;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function drawLine(ctx, options, fromItem, toItem) {
  if (toItem) {
    const { color, colorLine, lineWidth } = options;
    const { x: fromX, y: fromY } = fromItem;
    const { x: toX, y: toY } = toItem;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = ctx.strokeStyle = color || colorLine;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }
}

function drawSubtitle(ctx, options, safeArea, item) {
  const { color, colorText, subtitleFontSize, fontStyle, marginY } = options;
  const { height } = safeArea;
  const { title, x } = item;
  const y = height + marginY * 3;
  ctx.font = `${subtitleFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillStyle = ctx.strokeStyle = color || colorText;
  ctx.fillText(title, x, y);
}

function drawGrid(ctx, options, safeArea, item) {
  const { color, colorLine, colorGrid, marginY, lineWidth } = options;
  const { height } = safeArea;
  const [fromX, fromY] = [item.x, marginY * 2 + height];
  const { x: toX, y: toY } = item;
  if (toY < fromY) {
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = ctx.strokeStyle = colorGrid || color || colorLine;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }
}

function drawPoint(ctx, options, item) {
  const { color, colorPoint, pointSize } = options;
  const { x, y } = item;
  ctx.fillStyle = ctx.strokeStyle = color || colorPoint;
  ctx.beginPath();
  ctx.arc(x, y, pointSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTopAnnotation(ctx, options, topItem) {
  const {
    color,
    colorText,
    annotationFontSize,
    fontStyle,
    marginY,
    annotationSuffix,
    isPercentage
  } = options;
  const { value, x, y } = topItem;
  const annotationTitle = annotationSuffix
    ? `${Math.round(value)}${annotationSuffix}`
    : isPercentage
    ? `${(value * 100).toFixed(1)}%`
    : value.toFixed(1);
  ctx.font = `${annotationFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillStyle = ctx.strokeStyle = color || colorText;
  ctx.fillText(annotationTitle, x, y - marginY * 0.5);
}
