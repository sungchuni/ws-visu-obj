import Base from "../Base";
import draw from "./draw";

import { COLOR, COLOR_SHADOW, SHADOW_OFFSET } from "../constant";

const DEFAULT_TREE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  fontSize: 12,
  fontStyle: "serif",
  width: 640,
  height: 480,
  dotsQuantity: 16,
  dotSize: 4,
  treeHeight: 320,
  perspective: 0.9,
  animationDuration: 24000,
  hasShadow: true,
  shadowColor: COLOR_SHADOW,
  shadowSize: 120,
  shadowBlur: 16,
  shadowOffset: SHADOW_OFFSET
});

export default class WashingMachine extends Base {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_TREE_OPTIONS, this.props.options);
    this.draw = draw.bind(this);
  }
}
