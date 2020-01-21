import { gsap } from "gsap";

export default class Leaf {
  constructor({ theta, phi, r }, { animationDuration }) {
    this.theta = theta;
    this.phi = phi;
    this.r = r;
    this.leaves = [];
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.h = 0;
    this.v = 0;
    this.s = 0;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      phi: this.phi + Math.PI * 2 /* * (Math.random() > 0.5 ? 1 : -1) */,
      ease: "linear",
      repeat: -1
    });
    gsap.to(this, duration * 0.5, {
      theta: this.theta * (1 + (Math.random() - 0.5) * 0.2),
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  }
}
