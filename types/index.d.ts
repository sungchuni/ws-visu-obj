import React from "react";

export declare class Base<P> extends React.Component<P> {}
declare namespace Base {
  interface Props {
    data: object[];
    options: Options;
  }
  interface Options {
    color?: string;
    width?: number;
    height?: number;
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
  interface Options {
    color?: string;
    colorPoint?: string;
    colorLine?: string;
    colorText?: string;
    title?: string;
    titleFontSize?: number;
    subtitleFontSize?: number;
    annotationFontSize?: number;
    fontStyle?: string;
    width?: number;
    height?: number;
    marginX?: number;
    marginY?: number;
    gridAlpha?: number;
    pointSize?: number;
    lineWidth?: number;
    showTopAnnotation?: boolean;
    isPercentage?: boolean;
    animationDuration?: number;
    isScrollObserved?: boolean;
  }
}

export declare class Line extends Base<Line.Props> {}
declare namespace Line {
  interface Props {}
}

export declare class Silk extends Base<Silk.Props> {}
declare namespace Silk {
  interface Props {}
}

export declare class Sphere extends Base<Sphere.Props> {}
declare namespace Sphere {
  interface Props {}
}

export declare class Tree extends Base<Tree.Props> {}
declare namespace Tree {
  interface Props {}
}

export declare class WashingMachine extends Base<WashingMachine.Props> {}
declare namespace WashingMachine {
  interface Props {}
}
