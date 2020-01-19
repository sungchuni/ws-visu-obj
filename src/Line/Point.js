import { gsap } from "gsap";

export default class Point {
  constructor({ title, subtitle, value }, { animationDuration }) {
    this.title = title;
    this.subtitle = subtitle;
    this.value = 0;
    this.x = 0;
    this.y = 0;
    this.isMinor = false;
    this.done = false;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      ease: "power2.inOut",
      value,
      onComplete: () => void (this.done = true)
    });
  }
}
