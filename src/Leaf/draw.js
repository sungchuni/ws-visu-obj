import Point from "./Point";

export default function draw() {
  const { data, options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = data.map(item => new Point(item, options));
  const { width: cWidth, height: cHeight } = clientRect;
  const safeArea = {
    width: clientRect.width - options.marginX * 2,
    height: clientRect.height - options.marginY * 4
  };
  const { width: sWidth, height: sHeight } = safeArea;
  const unit = {
    x: sWidth / data.length,
    y:
      (sHeight - options.marginY * 2) /
      Math.max(...data.map(({ value }) => value))
  };
  const shoot = () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = options.color;
    ctx.lineWidth = options.lineWidth;
    drawTitle(ctx, options, { x: cWidth * 0.5, y: options.marginY });
    drawAxis(ctx, options, safeArea);
    dataTable
      .map((item, index) => {
        item.x = unit.x * index + unit.x * 0.5 + options.marginX;
        item.y = cHeight - (unit.y * item.value + options.marginY * 3);
        drawSubtitle(ctx, options, safeArea, item);
        drawGrid(ctx, options, safeArea, item);
        drawPoint(ctx, options, item);
        return item;
      })
      .slice(0, -1)
      .map((item, index) => {
        drawLine(ctx, item, dataTable[index + 1]);
        return item;
      });
    if (options.showTopAnnotation) {
      const rawTopItem = data
        .slice()
        .sort(({ value: aValue }, { value: bValue }) => bValue - aValue)[0];
      const topItem = dataTable[data.indexOf(rawTopItem)];
      drawTopAnnotation(ctx, options, topItem);
    }
    if (dataTable.every(({ done }) => !done)) {
      window.requestAnimationFrame(shoot);
    }
  };
  if (dataTable.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawTitle(ctx, options, position) {
  const { titleFontSize, fontStyle, title } = options;
  const { x, y } = position;
  ctx.font = `${titleFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillText(title, x, y);
}

function drawAxis(ctx, options, safeArea) {
  const { marginX, marginY } = options;
  const { width, height } = safeArea;
  const [fromX, fromY, toX, toY] = [
    marginX,
    marginY * 2,
    marginX + width,
    marginY * 2 + height
  ];
  ctx.globalAlpha = options.gridAlpha;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawSubtitle(ctx, options, safeArea, item) {
  const { subtitleFontSize, fontStyle, marginY } = options;
  const { height } = safeArea;
  const { title, x } = item;
  const y = height + marginY * 3;
  ctx.font = `${subtitleFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillText(title, x, y);
}

function drawGrid(ctx, options, safeArea, item) {
  const { marginY } = options;
  const { height } = safeArea;
  const [fromX, fromY] = [item.x, marginY * 2 + height];
  const { x: toX, y: toY } = item;
  if (toY < fromY) {
    ctx.globalAlpha = options.gridAlpha;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawPoint(ctx, options, item) {
  const { x, y } = item;
  ctx.beginPath();
  ctx.arc(x, y, options.pointSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(ctx, fromItem, toItem) {
  const { x: fromX, y: fromY } = fromItem;
  const { x: toX, y: toY } = toItem;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function drawTopAnnotation(ctx, options, topItem) {
  const { annotationFontSize, fontStyle, marginY, isPercentage } = options;
  const { value, x, y } = topItem;
  const annotationTitle = isPercentage
    ? `${(value * 100).toFixed(1)}%`
    : value.toFixed(1);
  ctx.font = `${annotationFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillText(annotationTitle, x, y - marginY * 0.5);
}
