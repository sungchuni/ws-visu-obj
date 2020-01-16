import React from "react";

const DEFAULT_CANVAS_OPTIONS = {
  width: 320,
  height: 240
};

function Canvas(props, forwardCanvasCtx) {
  const { children, options } = props;
  const attributes = {
    width: options.width || DEFAULT_CANVAS_OPTIONS.width,
    height: options.height || DEFAULT_CANVAS_OPTIONS.height
  };
  function getRef(canvas) {
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio;
    if (scale > 1) {
      canvas.style.width = `${options.width}px`;
      canvas.style.height = `${options.height}px`;
      canvas.width *= scale;
      canvas.height *= scale;
      ctx.scale(scale, scale);
    }
    forwardCanvasCtx(canvas, ctx);
  }
  return (
    <canvas ref={getRef} {...attributes}>
      {children}
    </canvas>
  );
}

export default React.forwardRef(Canvas);
