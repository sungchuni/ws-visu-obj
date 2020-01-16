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
      Math.max(...data.map(({ value }) => value))
  };
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    ctx.lineWidth = options.lineWidth;
    drawTitle(ctx, options, { x: clientRect.width * 0.5, y: options.marginY });
    drawAxis(ctx, options, safeArea);
    dataTable.forEach((item, index) => {
      item.x = unit.x * index + unit.x * 0.5 + options.marginX;
      item.y = clientRect.height - (unit.y * item.value + options.marginY * 3);
    });
    dataTable.slice(0, -1).forEach((item, index) => {
      drawLine(ctx, options, item, dataTable[index + 1]);
    });
    dataTable.map((item, index) => {
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
  ctx.fillStyle = ctx.strokeStyle = options.color || options.colorText;
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
  ctx.fillStyle = ctx.strokeStyle = options.color || options.colorLine;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(fromX, toY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawLine(ctx, options, fromItem, toItem) {
  const { x: fromX, y: fromY } = fromItem;
  const { x: toX, y: toY } = toItem;
  ctx.fillStyle = ctx.strokeStyle = options.color || options.colorLine;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function drawSubtitle(ctx, options, safeArea, item) {
  const { subtitleFontSize, fontStyle, marginY } = options;
  const { height } = safeArea;
  const { title, x } = item;
  const y = height + marginY * 3;
  ctx.font = `${subtitleFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillStyle = ctx.strokeStyle = options.color || options.colorText;
  ctx.fillText(title, x, y);
}

function drawGrid(ctx, options, safeArea, item) {
  const { marginY } = options;
  const { height } = safeArea;
  const [fromX, fromY] = [item.x, marginY * 2 + height];
  const { x: toX, y: toY } = item;
  if (toY < fromY) {
    ctx.globalAlpha = options.gridAlpha;
    ctx.fillStyle = ctx.strokeStyle = options.color || options.colorLine;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawPoint(ctx, options, item) {
  const { x, y } = item;
  ctx.fillStyle = ctx.strokeStyle = options.color || options.colorPoint;
  ctx.beginPath();
  ctx.arc(x, y, options.pointSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTopAnnotation(ctx, options, topItem) {
  const { annotationFontSize, fontStyle, marginY, isPercentage } = options;
  const { value, x, y } = topItem;
  const annotationTitle = isPercentage
    ? `${(value * 100).toFixed(1)}%`
    : value.toFixed(1);
  ctx.font = `${annotationFontSize}px ${fontStyle}`;
  ctx.textAlign = "center";
  ctx.fillStyle = ctx.strokeStyle = options.color || options.colorText;
  ctx.fillText(annotationTitle, x, y - marginY * 0.5);
}
