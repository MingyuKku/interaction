import React from 'react'
import { disposeEmitNodes } from 'typescript'

const Section2 = () => {

    const sectionElem = React.useRef<HTMLDivElement>(null);

    const [ scrollObj, setScrollObj ] = React.useState<{
        scrollHeight: number;
        heightRatio: number;
    }>({
        scrollHeight: 0,
        heightRatio: 3,
    })

    let intersector: IntersectionObserver | null = null;
    const option: IntersectionObserverInit = {
        root: null,
        threshold: Array.from(Array(101).keys(), n => n / 100), // 0부터 1까지 0.01 단위로 관찰,
    }

    const init = () => {
        if (!sectionElem.current) return;

        setScrollObj({
            ...scrollObj,
            scrollHeight: window.innerHeight * scrollObj.heightRatio,
        })

        const callback: IntersectionObserverCallback = (entrys) => {
            for (const entry of entrys) {
                if (!entry.isIntersecting) return;
                // console.log('호잇2', entry.intersectionRatio)
            }
        }

        intersector = new IntersectionObserver(callback, option);
        intersector.observe(sectionElem.current);
    }

    React.useEffect(() => {
        if (!window) return;
        
        init();
        
        return () => {
            intersector?.disconnect();
        }
    }, [])

    return (
        <div
            ref={ sectionElem }
            style={{
                'height': scrollObj.scrollHeight,
                'backgroundColor': 'revert'
            }}
        >
        
        </div>
    )
}

export default Section2
