import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

import { COLOR } from "../constant";

const DEFAULT_SPHERE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  width: 480,
  height: 480,
  dotsQuantity: 112,
  dotSize: 1,
  sphereRadius: 240,
  perspective: 0.8,
  shadowSize: 80,
  shadowOffset: 0,
  shadowBlur: 16,
  animationDuration: 24000
});

export default class Sphere extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign(
      {},
      DEFAULT_SPHERE_OPTIONS,
      this.props.options
    );
    this.canvas = null;
    this.ctx = null;
    this.draw = draw;
    this.receiveCanvasCtx = this.receiveCanvasCtx.bind(this);
  }
  receiveCanvasCtx(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.draw();
  }
  render() {
    return <Canvas ref={this.receiveCanvasCtx} options={this.options}></Canvas>;
  }
}
