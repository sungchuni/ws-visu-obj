import Base from "../Base";
import draw from "./draw";

import { COLOR, COLOR_MINOR, COLOR_SHADOW, SHADOW_OFFSET } from "../constant";

const DEFAULT_SILK_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  colorMinor: COLOR_MINOR,
  fontSize: 12,
  fontStyle: "serif",
  width: 640,
  height: 240,
  marginX: 96,
  marginY: 64,
  pointSize: 7,
  lineWidth: 1,
  animationDuration: 1500,
  isScrollObserved: true,
  hasShadow: true,
  shadowColor: COLOR_SHADOW,
  shadowSize: (640 - 96 * 2) * 0.9,
  shadowBlur: 12,
  shadowOffset: SHADOW_OFFSET
});

export default class Silk extends Base {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_SILK_OPTIONS, this.props.options);
    this.draw = draw.bind(this);
  }
}
