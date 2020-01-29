import Base from "../Base";
import draw from "./draw";

import { COLOR, COLOR_SHADOW, SHADOW_OFFSET } from "../constant";

const DEFAULT_TREE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  fontSize: 12,
  fontStyle: "serif",
  width: 480,
  height: 360,
  dotsQuantity: 32,
  dotSize: 4,
  treeWidth: 360,
  treeHeight: 320,
  animationDuration: 1500,
  hasShadow: true,
  shadowColor: COLOR_SHADOW,
  shadowSize: 120,
  shadowBlur: 16,
  shadowOffset: SHADOW_OFFSET,
  isScrollObserved: true,
  isScrollObservedOnce: false
});

export default class WashingMachine extends Base {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_TREE_OPTIONS, this.props.options);
    this.draw = draw.bind(this);
  }
}
