import React from "react";

import Canvas from "../Canvas";
import draw from "./draw";

import { COLOR, COLOR_SHADOW, SHADOW_OFFSET } from "../constant";

const DEFAULT_WASHING_MACHINE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  fontSize: 12,
  fontStyle: "serif",
  width: 640,
  height: 240,
  marginX: 96,
  marginY: 64,
  pointSize: 4,
  lineWidth: 1,
  perspective: 0.9,
  animationDuration: 24000,
  hasShadow: true,
  shadowColor: COLOR_SHADOW,
  shadowSize: (640 - 96 * 2) * 0.9,
  shadowBlur: 12,
  shadowOffset: SHADOW_OFFSET
});

export default class WashingMachine extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign(
      {},
      DEFAULT_WASHING_MACHINE_OPTIONS,
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
