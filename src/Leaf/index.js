import Base from "../Base";
import draw from "./draw";

import { COLOR, COLOR_MINOR } from "../constant";

const DEFAULT_LEAF_OPTIONS = Object.freeze({
  colorPoint: COLOR,
  colorLine: COLOR,
  colorText: COLOR,
  colorAxis: COLOR_MINOR,
  colorGrid: COLOR_MINOR,
  title: "",
  titleFontSize: 12,
  subtitleFontSize: 12,
  annotationFontSize: 10,
  fontStyle: "serif",
  width: 240,
  height: 192,
  marginX: 24,
  marginY: 19.2,
  pointSize: 7,
  lineWidth: 1,
  showTopAnnotation: false,
  annotationSuffix: "",
  isPercentage: false,
  animationDuration: 1500,
  isScrollObserved: true
});

export default class Leaf extends Base {
  constructor(props) {
    super(props);
    this.data = this.props.data || [];
    this.options = Object.assign({}, DEFAULT_LEAF_OPTIONS, this.props.options);
    this.draw = draw.bind(this);
  }
}
