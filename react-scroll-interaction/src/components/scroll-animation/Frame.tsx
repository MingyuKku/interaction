import React from 'react';
import Section from '../scroll-animation/Section';
import { type ScrollAnimationFrameType } from '../scroll-animation/_types';

const ScrollAnimationFrame = () => {

    const scrollAnimationFrame: ScrollAnimationFrameType = {
        currentSectionIndex: 0,
        sections: [
            {
                elem: null,
                heightRatio: 2,
                color: 'gainsboro',
                animationFrame: {
                    'opacity_in': [
                        {
                            minMax: [0, 1],
                            startEnd: [0, 1],
                            value: 0,
                        }
                    ]
                }
            },
            {
                elem: null,
                heightRatio: 3,
                color: 'lavenderblush',
            },
            {
                elem: null,
                heightRatio: 4,
                color: 'linen',
            },
            {
                elem: null,
                heightRatio: 3,
                color: 'oldlace',
            },
        ]
    }


    const setSectionRef = React.useCallback((index: number, elem: HTMLElement | null) => {
        scrollAnimationFrame.sections[index].elem = elem;
    }, [])



    const isIntersectSection = (sectionTop: number, sectionHeight: number) => {
        const sectionBottom = sectionTop + sectionHeight;
        const { scrollY, innerHeight } = window;

        if (
            (scrollY + innerHeight) >= sectionTop &&
            scrollY <= sectionBottom
        ) {
            return true;
        }
        return false;
    }


    const setAnimationFrameValue = (viewSectionIndex: number) => {
        const viewSection = scrollAnimationFrame.sections[viewSectionIndex];

        if (!viewSection.animationFrame) return;
        if (!viewSection.elem) return;

        const { animationFrame, elem } = viewSection;

        const { innerHeight, scrollY } = window;

        console.log('인덱스!', viewSectionIndex)
        console.log('스크롤', scrollY)
        if (animationFrame?.opacity_in) {
            animationFrame.opacity_in.forEach((frame,idx) => {
                
                const { offsetTop, scrollHeight } = elem!;
                const elemScrollRange = offsetTop + scrollHeight;
                const scrollRatio = scrollY / elemScrollRange;
                console.log('스크롤 비율', scrollRatio)
                if (frame.startEnd[0] > scrollRatio) frame.value = frame.minMax[0];
                if (frame.startEnd[1] < scrollRatio) frame.value = frame.minMax[1];
            })
        }
    }

    const scrollWindow = () => {
        
        
        scrollAnimationFrame.sections.forEach((section, idx) => {
            if (!section.elem) return;
            if (isIntersectSection(section.elem.offsetTop, section.elem.scrollHeight)) {
                const viewSectionIndex = idx;

                setAnimationFrameValue(viewSectionIndex);
            }
        })
        // console.log('요소들', scrollAnimationFrame)
        
    }


    React.useEffect(() => {
        if (!window) return;

        window.addEventListener('scroll', scrollWindow)
        return () => {
            window.removeEventListener('scroll', scrollWindow)
        }
    }, [])



    return (
        <div>
            {
                scrollAnimationFrame.sections.map((sec,idx) => (
                    <div key={ idx } ref={ (el) => setSectionRef(idx, el) }>
                        <Section
                            sectionInfo={ sec }
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default ScrollAnimationFrame
