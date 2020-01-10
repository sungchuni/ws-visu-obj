import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

const DEFAULT_LEAF_OPTIONS = Object.freeze({
  title: "",
  titleFontSize: 16,
  subtitleFontSize: 14,
  annotationFontSize: 12,
  fontStyle: "serif",
  width: 240,
  height: 192,
  marginX: 24,
  marginY: 19.2,
  color: "#000000",
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
    this.getCanvas = this.getCanvas.bind(this);
    if (this.options.isScrollObserved) {
      this.intersectionObserver = new window.IntersectionObserver(
        this.intersectionCallback.bind(this),
        { rootMargin: `-${this.options.marginY}px 0px` }
      );
    }
  }
  getCanvas(canvas) {
    if (canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
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
    return <Canvas ref={this.getCanvas} options={this.options}></Canvas>;
  }
}
