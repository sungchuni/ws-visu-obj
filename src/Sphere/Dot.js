import { gsap } from "gsap";

export default class Point {
  constructor({ phi, theta }, { sphereRadius, animationDuration }) {
    this.phi = phi;
    this.theta = theta;
    this.radius = sphereRadius;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      theta: this.theta + Math.PI * 2,
      ease: "linear",
      repeat: -1
    });
  }
}
