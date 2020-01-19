import { gsap } from "gsap";

export default class Point {
  constructor({ title, isMinor, hIndex, vIndex }, { animationDuration }) {
    this.title = title;
    this.isMinor = !!isMinor;
    this.hIndex = hIndex;
    this.vIndex = 0;
    this.x = 0;
    this.y = 0;
    this.done = false;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      ease: "power2.inOut",
      vIndex: vIndex + Math.random() * 0.2,
      onComplete: () => void (this.done = true)
    });
  }
}
