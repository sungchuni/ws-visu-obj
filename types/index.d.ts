import React from "react";

declare namespace Base {
  class Component<P> extends React.Component<P> {}
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

export declare class Leaf extends Base.Component<Leaf.Props> {}
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

export declare class Line extends Base.Component<Line.Props> {}
declare namespace Line {
  interface Props extends Base.Props {
    data: Data[][] | Data[];
    options: Options;
  }
  interface Data {
    value: number;
    title: string;
    subtitle: string;
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

export declare class Silk extends Base.Component<Silk.Props> {}
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
    shadowColor?: number;
    shadowSize?: number;
    shadowBlur?: number;
    shadowOffset?: number;
    isScrollObserved?: boolean;
  }
}

export declare class Sphere extends Base.Component<Sphere.Props> {}
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
    shadowColor?: number;
    shadowSize?: number;
    shadowBlur?: number;
    shadowOffset?: number;
  }
}

export declare class Tree extends Base.Component<Tree.Props> {}
declare namespace Tree {
  interface Props {}
}

export declare class WashingMachine extends Base.Component<WashingMachine.Props> {}
declare namespace WashingMachine {
  interface Props {}
}
