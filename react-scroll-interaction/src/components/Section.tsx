import React from 'react'
import { FrameInfo, SectionInfo } from './scroll-animation/_types';

const Section = () => {

    const sectionInfo: SectionInfo = {
        color: '#45616c',
        heightRatio: 2,
        opacity: {
            in: {
                min: 0,
                max: 1,
                start: 0,
                end: 0.5,
            },
            out: {
                min: 1,
                max: 0,
                start: 0.5,
                end: 1,
            }
        }
    }
    const elem = React.useRef<HTMLDivElement>(null);
    const intersector = React.useRef<IntersectionObserver | null>(null); 
    const [ scrollHeight, setScrollHeight ] = React.useState(0);
    const [ opacity, setOpacity ] = React.useState(0);


    const intersectOption: IntersectionObserverInit = {
        root: null,
        threshold: 0,
    }


    const calcRatio = (start: number, end: number, min: number, max: number, setRatio: React.Dispatch<React.SetStateAction<number>>,) => {
        if (!window) return;
        if (!elem.current) return;

        const { scrollY } = window;
        const { scrollHeight, offsetTop } = elem.current;
        const sectionStart = offsetTop + (scrollHeight * start);
        const sectionEnd = offsetTop + (scrollHeight * end);
        
        const scrollRatio = (scrollY - sectionStart) / (sectionEnd - sectionStart);
        setRatio(min + scrollRatio * (max - min));
    }


    const calcAnimationFrame = (frameInfo: FrameInfo ,setRatio: React.Dispatch<React.SetStateAction<number>>) => {
        if (!window) return;
        if (!elem.current) return;

        const { scrollY } = window;
        const { scrollHeight, offsetTop } = elem.current;

        const sectionScrollRatio = scrollY / (offsetTop + scrollHeight);
        // console.log('호잇', sectionScrollRatio)
        const { start: inStart, end: inEnd, max: inMax, min: inMin } = frameInfo.in;
        // const { start: outStart, end: outEnd, max: outMax, min: outMin } = sectionInfo.opacity.out;
        
        calcRatio(
            inStart,
            inEnd,
            inMin,
            inMax,
            setRatio,
        );

        if (!frameInfo.out) return;

        const { start: outStart, end: outEnd, max: outMax, min: outMin } = frameInfo.out;
        if (sectionScrollRatio >= outStart) {
            calcRatio(
                outStart,
                outEnd,
                outMin,
                outMax,
                setRatio,
            );
        }
        
    }


    const scrollWindow = () => {
        
        if (sectionInfo.opacity) {
            calcAnimationFrame(sectionInfo.opacity, setOpacity);
        }

    }


    const intersectionCallback: IntersectionObserverCallback = (entries) => {
        for (const entrie of entries) {
            if (entrie.isIntersecting) {
                window.addEventListener('scroll', scrollWindow)
            } else {
                window.removeEventListener('scroll', scrollWindow)
            }
        }
    }

    React.useEffect(() => {
        if (!window || !elem.current) return;

        setScrollHeight(window.innerHeight * sectionInfo.heightRatio);

        intersector.current = new IntersectionObserver(intersectionCallback, intersectOption);
        intersector.current.observe(elem.current);
        return () => {
            intersector.current?.disconnect();
            window.removeEventListener('scroll', scrollWindow)
        }
    }, [])

    return (
        <div
            ref={ elem }
            style={{
                'backgroundColor': sectionInfo.color,
                'height': scrollHeight
            }}
        >
            <p
                className='center-h'
                style={{
                    'opacity': opacity
                }}
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
    )
}

export default Section
