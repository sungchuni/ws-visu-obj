import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

import { COLOR, COLOR_MINOR } from "../constant";

const DEFAULT_SILK_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  colorMinor: COLOR_MINOR,
  fontSize: 12,
  fontStyle: "serif",
  width: 640,
  height: 240,
  marginX: 96,
  marginY: 64,
  pointSize: 7,
  lineWidth: 1,
  shadowSize: (640 - 96 * 2) * 0.9,
  shadowBlur: 12,
  animationDuration: 1500,
  isScrollObserved: true
});

export default class Silk extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_SILK_OPTIONS, this.props.options);
    this.canvas = null;
    this.ctx = null;
    this.draw = draw;
    this.receiveCanvasCtx = this.receiveCanvasCtx.bind(this);
    if (this.options.isScrollObserved) {
      this.intersectionObserver = new window.IntersectionObserver(
        this.intersectionCallback.bind(this),
        { rootMargin: `-${this.options.marginY}px 0px` }
      );
    }
  }
  receiveCanvasCtx(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.intersectionObserver ? this.observeCanvas(canvas) : this.draw();
  }
  intersectionCallback(entries) {
    entries.forEach(entry => entry.isIntersecting && this.draw());
  }
  observeCanvas(canvas) {
    this.intersectionObserver.observe(canvas);
  }
  render() {
    return <Canvas ref={this.receiveCanvasCtx} options={this.options}></Canvas>;
  }
}
