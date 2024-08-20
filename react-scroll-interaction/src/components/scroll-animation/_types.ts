export interface ScrollAnimationFrameType {
    currentSectionIndex: number;
    sections: SectionType[];
    globalAnimationFrame?: {
        sectionStartEnd: number[];
        animationFrame: AnimationFrameValue;
    }[];
}

export interface SectionType {
    elem: HTMLElement | null;
    heightRatio: number;
    color?: string;
    animationFrame?: AnimationFrameValue;
}

export interface AnimationFrameValue {
    opacity_in?: FrameValue[];
    opacity_out?: FrameValue[];
    translateX_in?: FrameValue[];
    translateX_out?: FrameValue[];
    translateY_in?: FrameValue[];
    translateY_out?: FrameValue[];
    rotate_in?: FrameValue[];
    rotate_out?: FrameValue[];
}


interface FrameValue {
    minMax: number[];
    startEnd: number[];
    value: number;
}

export interface SectionInfo {
    color: string;
    heightRatio: number;
    opacity?: FrameInfo;
    translate?: FrameInfo;
}

export interface FrameInfo {
    in: AnimationInfo;
    out?: AnimationInfo;
}
interface AnimationInfo {
    min: number;
    max: number;
    start: number;
    end: number;
}