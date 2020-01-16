import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

const DEFAULT_LEAF_OPTIONS = Object.freeze({
  colorPoint: "#000000",
  colorLine: "#000000",
  colorText: "#000000",
  title: "",
  titleFontSize: 16,
  subtitleFontSize: 14,
  annotationFontSize: 12,
  fontStyle: "serif",
  width: 240,
  height: 192,
  marginX: 24,
  marginY: 19.2,
  gridAlpha: 0.2,
  pointSize: 4,
  lineWidth: 1,
  showTopAnnotation: false,
  isPercentage: false,
  animationDuration: 1500,
  isScrollObserved: false
});

export default class Leaf extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_LEAF_OPTIONS, this.props.options);
    this.canvas = null;
    this.ctx = null;
    this.draw = draw;
    this.getCanvasCtx = this.getCanvasCtx.bind(this);
    if (this.options.isScrollObserved) {
      this.intersectionObserver = new window.IntersectionObserver(
        this.intersectionCallback.bind(this),
        { rootMargin: `-${this.options.marginY}px 0px` }
      );
    }
  }
  getCanvasCtx(canvas, ctx) {
    if (canvas) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.intersectionObserver ? this.observeCanvas(canvas) : this.draw();
    }
  }
  intersectionCallback(entries) {
    entries.forEach(entry => entry.isIntersecting && this.draw());
  }
  observeCanvas(canvas) {
    this.intersectionObserver.observe(canvas);
  }
  render() {
    return <Canvas ref={this.getCanvasCtx} options={this.options}></Canvas>;
  }
}
