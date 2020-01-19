import Point from "./Point";
import { drawShadow } from "../trait";

export default function draw() {
  const { data, options, canvas, ctx } = this;
  const clientRect = canvas.getBoundingClientRect();
  const dataTable = data.map((row, hIndex) => {
    const { length } = row;
    return row.map((item, vIndex) => {
      const theta = (vIndex / length) * Math.PI * 2;
      return new Point(
        Object.assign({}, item, { hIndex, vIndex, theta }),
        options
      );
    });
  });
  const flattenedDataTable = [].concat(...dataTable);
  const safeArea = {
    width: clientRect.width - options.marginX * 2,
    height: clientRect.height - options.marginY * 2
  };
  const unit = {
    x: safeArea.width / (data.length - 1),
    r: (safeArea.height * 0.5) / Math.max(...data.map(({ length }) => length))
  };
  const shoot = () => {
    ctx.clearRect(0, 0, clientRect.width, clientRect.height);
    dataTable.forEach((col, colIndex) => {
      const { length } = col;
      const nextCol = dataTable[colIndex + 1] || [];
      col
        .map(item => {
          const { marginX, perspective } = options;
          const { hIndex, theta } = item;
          const r = unit.r * length;
          const x = (item.x = unit.x * hIndex + marginX);
          const y = (item.y = r * Math.cos(theta));
          const z = (item.z = r * Math.sin(theta) + r);
          const s = (item.s =
            (safeArea.width * perspective) /
            (safeArea.width * perspective + z));
          item.h =
            x -
            safeArea.width *
              (Math.sin(theta) * 0.05) *
              ((x - safeArea.width * 0.4) / safeArea.width);
          item.v = y * s + safeArea.height * 0.5 + options.marginY;
          return item;
        })
        .forEach(item => {
          nextCol.forEach(nextColItem => {
            const { link = [] } = item;
            const { key } = nextColItem;
            link.includes(key) &&
              drawLine(ctx, options, safeArea, item, nextColItem);
          });
          drawAnnotation(ctx, options, safeArea, item, dataTable);
          drawPoint(ctx, options, safeArea, item);
        });
    });
    options.hasShadow && drawShadow(ctx, options, clientRect);
    window.requestAnimationFrame(shoot);
  };
  if (flattenedDataTable.length) {
    window.requestAnimationFrame(shoot);
  }
}

function drawLine(ctx, options, safeArea, fromItem, toItem) {
  if (toItem) {
    const { color, colorLine, lineWidth } = options;
    const { z: fromZ, h: fromH, v: fromV } = fromItem;
    const { z: toZ, h: toH, v: toV } = toItem;
    if (toZ && toH && toV) {
      const meanZ = (fromZ + toZ + (fromZ < toZ ? toZ : fromZ)) * 0.5;
      ctx.globalAlpha = Math.abs(1 - meanZ / safeArea.width);
      console.log(ctx.globalAlpha);
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = ctx.strokeStyle = color || colorLine;
      ctx.beginPath();
      ctx.moveTo(fromH, fromV);
      ctx.lineTo(toH, toV);
      ctx.stroke();
    }
  }
}

function drawAnnotation(ctx, options, safeArea, item, dataTable) {
  const { color, colorText, fontSize, fontStyle, pointSize } = options;
  const { title, hIndex, z, h, v, s } = item;
  const { length } = dataTable;
  const safeMarginX = pointSize * 2;
  const safeMarginY = pointSize * 3;
  const textPosition = ["left", "top", "right"][
    hIndex ? (length - 1 === hIndex ? 2 : 1) : 0
  ];
  const textAlign = { left: "right", top: "center", right: "left" }[
    textPosition
  ];
  const computedFontSize = fontSize * Math.sqrt(s);
  const titleH =
    h + { left: -safeMarginX, top: 0, right: safeMarginX }[textPosition];
  const titleV =
    v +
    {
      left: computedFontSize * 0.33,
      top: -safeMarginY,
      right: computedFontSize * 0.33
    }[textPosition];
  ctx.globalAlpha = Math.abs(1 - z / safeArea.width);
  ctx.fillStyle = ctx.strokeStyle = color || colorText;
  ctx.textAlign = textAlign;
  ctx.font = `${computedFontSize}px ${fontStyle}`;
  ctx.fillText(title, titleH, titleV);
}

function drawPoint(ctx, options, safeArea, item) {
  const { color, colorPoint, pointSize } = options;
  const { z, h, v, s } = item;
  ctx.globalAlpha = Math.abs(1 - z / safeArea.width);
  ctx.fillStyle = ctx.strokeStyle = color || colorPoint;
  ctx.beginPath();
  ctx.arc(h, v, pointSize * s, 0, Math.PI * 2);
  ctx.fill();
}
