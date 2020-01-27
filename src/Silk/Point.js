import { gsap } from "gsap";

export default class Point {
  constructor({ title, isMinor, hIndex, vIndex, cols }, { animationDuration }) {
    this.title = title;
    this.isMinor = !!isMinor;
    this.hIndex = hIndex;
    this.vIndex = 0;
    this.x = 0;
    this.y = 0;
    this.done = false;
    const maxV = Math.max(...cols.map(({ length }) => length)) - 1;
    const currentMaxV = cols[hIndex].length - 1;
    const duration = animationDuration / 1000;
    gsap.to(this, {
      duration,
      ease: "power2.inOut",
      vIndex,
      onComplete: () => {
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { duration, ease: "power2.inOut" }
        });
        tl.to(this, { vIndex: currentMaxV });
        tl.to(this, { vIndex: maxV - vIndex });
        tl.to(this, { vIndex: maxV - currentMaxV });
        tl.to(this, { vIndex });
      }
    });
  }
}
