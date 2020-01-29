import Base from "../Base";
import draw from "./draw";

import { COLOR, COLOR_MINOR, COLOR_SHADOW, SHADOW_OFFSET } from "../constant";

const DEFAULT_LINE_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  colorAxis: COLOR_MINOR,
  colorMinor: COLOR_MINOR,
  title: "",
  titleFontSize: 12,
  annotationTitleFontSize: 12,
  annotationSubtitleFontSize: 10,
  fontStyle: "serif",
  width: 512,
  height: 288,
  marginX: 51.2,
  marginY: 38.4,
  hasAxis: false,
  pointSize: 7,
  lineWidth: 1,
  animationDuration: 1500,
  hasAnimationHorizontal: true,
  isScrollObserved: true,
  isScrollObservedOnce: false,
  hasShadow: true,
  shadowColor: COLOR_SHADOW,
  shadowSize: 512 * 0.6,
  shadowBlur: 10,
  shadowOffset: SHADOW_OFFSET
});

export default class Line extends Base {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_LINE_OPTIONS, this.props.options);
    this.draw = draw.bind(this);
  }
}
