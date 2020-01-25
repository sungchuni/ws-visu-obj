import { gsap } from "gsap";

export default class Point {
  constructor({ value, title, subtitle, countUp }, { animationDuration }) {
    this.title = title;
    this.subtitle = subtitle || "";
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
    if (countUp) {
      const { start, end, suffix } = countUp;
      this.countUp = {
        start,
        end: start,
        suffix
      };
      gsap.to(this.countUp, duration, {
        ease: "power2.inOut",
        end,
        onUpdate: () =>
          void (this.subtitle = `${Number(
            (this.countUp.end || 0).toFixed(0)
          ).toLocaleString()}${suffix}`)
      });
    }
  }
}
