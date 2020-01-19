import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

import { COLOR, COLOR_MINOR } from "../constant";

const DEFAULT_LINE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  colorAxis: COLOR_MINOR,
  colorMinor: COLOR_MINOR,
  title: "",
  titleFontSize: 12,
  annotationTitleFontSize: 12,
  annotationSubtitleFontSize: 10,
  fontStyle: "serif",
  width: 512,
  height: 288,
  marginX: 51.2,
  marginY: 38.4,
  hasAxis: false,
  pointSize: 7,
  lineWidth: 1,
  hasShadow: true,
  shadowSize: 512 * 0.6,
  shadowOffset: 0,
  shadowBlur: 10,
  animationDuration: 1500,
  hasAnimationHorizontal: true,
  isScrollObserved: true
});

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_LINE_OPTIONS, this.props.options);
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
