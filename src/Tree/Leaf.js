export default class Leaf {
  constructor({ k, x, y, z, link }) {
    this.k = k;
    this.x = x;
    this.y = y;
    this.z = z;
    this.link = link;
    this.h = 0;
    this.v = 0;
  }
}
