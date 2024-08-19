import React from 'react'

const Section = () => {

    const sectionElem = React.useRef<HTMLDivElement>(null);

    const [ scrollObj, setScrollObj ] = React.useState<{
        scrollHeight: number;
        heightRatio: number;
    }>({
        scrollHeight: 0,
        heightRatio: 2,
    })

    let intersector: IntersectionObserver | null = null;
    const option: IntersectionObserverInit = {
        root: null,
        threshold: Array.from(Array(1001).keys(), n => n / 1000), // 0부터 1까지 0.01 단위로 관찰,
        // threshold: Array.from({ length: 501 }, (_, i) => 0.5 + i * 0.001), // 0.5부터 1까지 0.001 간격으로 값들을 생성하기 위해 필요한 배열,
        // rootMargin: '-25% 0px', // 뷰포트의 상하단을 50% 줄여서 중앙에 초점을 맞춤
    }

    const [ ratio, setRatio ] = React.useState(0);

    const init = () => {
        if (!sectionElem.current) return;

        setScrollObj({
            ...scrollObj,
            scrollHeight: window.innerHeight * scrollObj.heightRatio,
        })

        const callback: IntersectionObserverCallback = (entrys) => {
            for (const entry of entrys) {
                if (!entry.isIntersecting) return;
                console.log('호잇', entry.intersectionRatio)
                setRatio(entry.intersectionRatio)
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



    const stylePara = React.useMemo<React.CSSProperties>(() => {
        return {
            'transform': `translate(-50%, ${ -50 * ratio }%) scale(${ratio + 0.8})`,
            'opacity': ratio > 0 ? 1 : 0,
            'transition': `opacity .3s ease-in-out`,
        }
    }, [ratio])

    return (
        <div
            ref={ sectionElem }
            style={{
                'height': scrollObj.scrollHeight,
                'backgroundColor': 'blanchedalmond'
            }}
        >
            {/* <p
                className='text-p'
                style={ stylePara }
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eligendi culpa ratione nemo, et possimus adipisci itaque consequuntur repellat, aut voluptatum, vel sapiente magnam eos! Eveniet, inventore. Temporibus, eius doloremque!</p> */}
        </div>
    )
}

export default Section
