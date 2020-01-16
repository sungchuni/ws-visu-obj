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
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const scale = window.devicePixelRatio;
      if (scale > 1) {
        canvas.style.width = `${options.width}px`;
        canvas.style.height = `${options.height}px`;
        // 렌더링 될 때 간헐적으로 작게 표시되는 문제가 재현되어, width값 직접 지정 
        canvas.width = options.width * scale;
        canvas.height = options.height * scale;
        ctx.scale(scale, scale);
      }
      forwardCanvasCtx(canvas, ctx);
    }
  }
  return (
    <canvas ref={getRef} {...attributes}>
      {children}
    </canvas>
  );
}

export default React.forwardRef(Canvas);
