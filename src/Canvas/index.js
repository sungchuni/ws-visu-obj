import React from "react";

const DEFAULT_CANVAS_OPTIONS = {
  width: 320,
  height: 240
};

function Canvas(props, ref) {
  const { children, options } = props;
  const attributes = {
    width: options.width || DEFAULT_CANVAS_OPTIONS.width,
    height: options.height || DEFAULT_CANVAS_OPTIONS.height
  };
  return (
    <canvas ref={ref} {...attributes}>
      {children}
    </canvas>
  );
}

export default React.forwardRef(Canvas);
