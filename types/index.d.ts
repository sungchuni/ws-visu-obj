import React from "react";

export declare class Base<P> extends React.Component<P> {}
declare namespace Base {
  interface Props {
    options: Options;
  }
  interface Options {
    color?: string;
    width?: number;
    height?: number;
    animationDuration?: number;
  }
}

declare namespace Shadow {
  interface Options {
    hasShadow?: boolean;
    shadowColor?: number;
    shadowSize?: number;
    shadowBlur?: number;
    shadowOffset?: number;
  }
}

export declare class Leaf extends Base<Leaf.Props> {}
declare namespace Leaf {
  interface Props extends Base.Props {
    data: Data[];
    options: Options;
  }
  interface Data {
    value: number;
    title: string;
  }
  interface Options extends Base.Options {
    colorPoint?: string;
    colorLine?: string;
    colorText?: string;
    colorAxis?: string;
    colorGrid?: string;
    title?: string;
    titleFontSize?: number;
    subtitleFontSize?: number;
    annotationFontSize?: number;
    fontStyle?: string;
    marginX?: number;
    marginY?: number;
    pointSize?: number;
    lineWidth?: number;
    showTopAnnotation?: boolean;
    isPercentage?: boolean;
    isScrollObserved?: boolean;
  }
}

export declare class Line extends Base<Line.Props> {}
declare namespace Line {
  interface Props extends Base.Props {
    data: Data[][] | Data[];
    options: Options;
  }
  interface Data {
    value: number;
    title: string;
    subtitle?: string;
    countUp?: CountUp;
  }
  interface CountUp {
    start: number;
    end: number;
    suffix: string;
  }
  interface Options extends Base.Options {
    colorPoint?: string;
    colorLine?: string;
    colorText?: string;
    colorAxis?: string;
    colorMinor?: string;
    title?: string;
    titleFontSize?: number;
    annotationTitleFontSize?: number;
    annotationSubtitleFontSize?: number;
    fontStyle?: string;
    marginX?: number;
    marginY?: number;
    hasAxis?: boolean;
    pointSize?: number;
    lineWidth?: number;
    hasAnimationHorizontal?: boolean;
    isScrollObserved?: boolean;
  }
  interface Options extends Shadow.Options {}
}

export declare class Silk extends Base<Silk.Props> {}
declare namespace Silk {
  interface Props extends Base.Props {
    data: Data[][];
    options: Options;
  }
  interface Data {
    title: string;
    isMinor?: boolean;
  }
  interface Options extends Base.Options {
    colorPoint?: string;
    colorLine?: string;
    colorText?: string;
    colorMinor?: string;
    fontSize?: string;
    fontStyle?: string;
    marginX?: number;
    marginY?: number;
    pointSize?: number;
    lineWidth?: number;
    isScrollObserved?: boolean;
  }
  interface Options extends Shadow.Options {}
}

export declare class Sphere extends Base<Sphere.Props> {}
declare namespace Sphere {
  interface Props extends Base.Props {
    options: Options;
  }
  interface Options extends Base.Options {
    colorPoint?: string;
    colorLine?: string;
    dotsQuantity?: number;
    dotSize?: number;
    sphereRadius?: number;
    perspective?: number;
  }
  interface Options extends Shadow.Options {}
}

export declare class Tree extends Base<Tree.Props> {}
declare namespace Tree {
  interface Props extends Base.Props {
    options: Options;
  }
  interface Options extends Base.Options {
    colorPoint?: string;
    colorLine?: string;
    dotsQuantity?: number;
    dotSize?: number;
    treeHeight?: number;
    perspective?: number;
  }
  interface Options extends Shadow.Options {}
}

export declare class WashingMachine extends Base<WashingMachine.Props> {}
declare namespace WashingMachine {
  interface Props extends Base.Props {
    data: Data[][];
    options: Options;
  }
  interface Data {
    key: number;
    title: string;
    link?: number[];
  }
  interface Options extends Base.Options {
    colorPoint?: string;
    colorLine?: string;
    colorText?: string;
    fontSize?: string;
    fontStyle?: string;
    marginX?: number;
    marginY?: number;
    pointSize?: number;
    lineWidth?: number;
    perspective?: number;
    alphaWeight?: number;
  }
  interface Options extends Shadow.Options {}
}
