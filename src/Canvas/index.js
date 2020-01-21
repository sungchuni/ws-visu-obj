import React from "react";

const DEFAULT_CANVAS_OPTIONS = {
  width: 320,
  height: 240
};

function Canvas(props, forwardCanvasCtx) {
  const { children, options } = props;
  const { width, height } = {
    width: Math.min(
      window.innerWidth,
      options.width || DEFAULT_CANVAS_OPTIONS.width
    ),
    height: options.height || DEFAULT_CANVAS_OPTIONS.height
  };
  function getRef(canvas) {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const scale = window.devicePixelRatio;
      if (scale > 1) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);
      }
      forwardCanvasCtx(canvas, ctx);
    }
  }
  return (
    <canvas ref={getRef} width={width} height={height}>
      {children}
    </canvas>
  );
}

export default React.forwardRef(Canvas);
