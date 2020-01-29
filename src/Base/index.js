import "intersection-observer";

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
    this.state = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  }
  componentDidUpdate({ data, options }) {
    Object.assign(this.data, data || []);
    Object.assign(this.options, options || {});
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCallback);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
  intersectionCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.draw();
        if (this.options.isScrollObservedOnce) {
          this.intersectionObserver.disconnect();
        }
      }
    });
  }
  receiveCanvasCtx(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    window.addEventListener("resize", this.resizeCallback);
    if (this.options.isScrollObserved) {
      this.intersectionObserver = new window.IntersectionObserver(
        this.intersectionCallback,
        {
          rootMargin: `-${this.options.marginY ||
            this.options.height * 0.1}px 0px`
        }
      );
      this.intersectionObserver.observe(canvas);
    } else {
      this.draw();
    }
  }
  resizeCallback() {
    const { innerWidth, innerHeight } = window;
    if (this.state.innerWidth !== innerWidth) {
      this.setState({ innerWidth, innerHeight });
      this.draw();
    }
  }
  render() {
    return <Canvas ref={this.receiveCanvasCtx} options={this.options}></Canvas>;
  }
}
