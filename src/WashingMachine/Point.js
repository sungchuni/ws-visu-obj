import { gsap } from "gsap";

export default class Point {
  constructor(
    { key, title, link, hIndex, vIndex, theta },
    { animationDuration }
  ) {
    this.key = key;
    this.title = title;
    this.link = link;
    this.hIndex = hIndex;
    this.vIndex = vIndex;
    this.theta = theta;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.h = 0;
    this.v = 0;
    this.s = 0;
    const duration = animationDuration / 1000;
    gsap.to(this, duration, {
      theta: theta + Math.PI * (hIndex % 2 ? 4 : 2),
      ease: "linear",
      repeat: -1
    });
  }
}
