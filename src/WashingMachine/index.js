import Base from "../Base";
import draw from "./draw";

import { COLOR, COLOR_SHADOW, SHADOW_OFFSET } from "../constant";

const DEFAULT_WASHING_MACHINE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  fontSize: 12,
  fontStyle: "serif",
  width: 640,
  height: 320,
  marginX: 96,
  marginY: 64,
  pointSize: 4,
  lineWidth: 1,
  perspective: 0.9,
  alphaWeight: 2,
  animationDuration: 30000,
  hasShadow: true,
  shadowColor: COLOR_SHADOW,
  shadowSize: (640 - 96 * 2) * 0.9,
  shadowBlur: 12,
  shadowOffset: SHADOW_OFFSET
});

export default class WashingMachine extends Base {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign(
      {},
      DEFAULT_WASHING_MACHINE_OPTIONS,
      this.props.options
    );
    this.draw = draw.bind(this);
  }
}
