import { gsap } from "gsap";

export default class Point {
  constructor({ phi, theta, link }, { sphereRadius, animationDuration }) {
    this.phi = phi;
    this.theta = theta;
    this.link = link;
    this.radius = sphereRadius;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.h = 0;
    this.v = 0;
    this.s = 0;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      phi: this.phi + Math.PI * 2,
      ease: "linear",
      repeat: -1
    });
  }
}
