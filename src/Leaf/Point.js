import { gsap } from "gsap";

export default class Point {
  constructor({ title, value }, { animationDuration }) {
    this.title = title;
    this.value = 0;
    this.x = 0;
    this.y = 0;
    this.done = false;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      value,
      onComplete: () => (this.done = true)
    });
  }
}
