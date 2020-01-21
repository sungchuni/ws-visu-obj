import * as _ from "lodash-es";
import React from "react";

import Canvas from "../Canvas";

import { RESIZE_WAIT } from "../constant";

export default class Base extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.options = {};
    this.canvas = null;
    this.ctx = null;
    this.draw = null;
    this.intersectionObserver = null;
    this.intersectionCallback = this.intersectionCallback.bind(this);
    this.receiveCanvasCtx = this.receiveCanvasCtx.bind(this);
    this.resizeCallback = _.debounce(
      this.resizeCallback.bind(this),
      RESIZE_WAIT
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCallback);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
  intersectionCallback(entries) {
    entries.forEach(entry => void (entry.isIntersecting && this.draw()));
  }
  receiveCanvasCtx(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    window.addEventListener("resize", this.resizeCallback);
    if (this.options.isScrollObserved) {
      this.intersectionObserver = new window.IntersectionObserver(
        this.intersectionCallback,
        {
          rootMargin: `-${this.options.marginY}px 0px`
        }
      );
      this.intersectionObserver.observe(canvas);
    } else {
      this.draw();
    }
  }
  resizeCallback() {
    this.forceUpdate();
    this.draw();
  }
  render() {
    return <Canvas ref={this.receiveCanvasCtx} options={this.options}></Canvas>;
  }
}
