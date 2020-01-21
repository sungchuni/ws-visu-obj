import * as _ from "lodash-es";
import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

import { COLOR, COLOR_MINOR } from "../constant";

const DEFAULT_LEAF_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  colorAxis: COLOR_MINOR,
  colorGrid: COLOR_MINOR,
  title: "",
  titleFontSize: 12,
  subtitleFontSize: 12,
  annotationFontSize: 10,
  fontStyle: "serif",
  width: 240,
  height: 192,
  marginX: 24,
  marginY: 19.2,
  pointSize: 7,
  lineWidth: 1,
  showTopAnnotation: false,
  isPercentage: false,
  animationDuration: 1500,
  isScrollObserved: true
});

export default class Leaf extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_LEAF_OPTIONS, this.props.options);
    this.canvas = null;
    this.ctx = null;
    this.draw = draw;
    this.handleResize = _.debounce(this.handleResize.bind(this), 400);
    this.receiveCanvasCtx = this.receiveCanvasCtx.bind(this);
    if (this.options.isScrollObserved) {
      this.intersectionObserver = new window.IntersectionObserver(
        this.intersectionCallback.bind(this),
        { rootMargin: `-${this.options.marginY}px 0px` }
      );
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.forceUpdate();
    this.draw();
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
