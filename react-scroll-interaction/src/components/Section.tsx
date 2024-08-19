import React from 'react'
import { SECTION } from '../constants'

interface Props {
    elemRef: React.RefObject<HTMLDivElement>;
    ratio: number;
}

// const Section: React.FC<Props> = ({ scrollElem, scrollHeight, scrollHeightRatio }) => {
const Section: React.FC<Props> = ({ elemRef, ratio }) => {

    
    const [ scrollObj, setScrollObj ] = React.useState<{
        scrollHeight: number;
        heightRatio: number;
    }>({
        scrollHeight: 0,
        heightRatio: 2,
    })


    const init = () => {
        setScrollObj({
            ...scrollObj,
            scrollHeight: window.innerHeight * scrollObj.heightRatio,
        })
    }


    React.useEffect(() => {
        
    }, [ratio])

    const stylePara = React.useMemo<React.CSSProperties>(() => {
        // console.log('호잇', ratio, 50 * ratio)
        return {
            'transform': `translate(-50%, ${ -50 * ratio }%) scale(${ratio + 0.8})`,
            'opacity': ratio > 0.5 ? ratio : 0,
            'transition': ratio <= 0.5 ? `opacity .3s ease-in-out` : undefined,
        }
    }, [ratio])


    React.useEffect(() => {
        if (!window || !elemRef.current) return;
        
        init();
        

        return () => {

        }
    }, [])

    return (
        <div
            ref={ elemRef }
            style={{
                'height': scrollObj.scrollHeight
            }}
            className='section'
        >
            {/* <p
                className='text-p'
                style={ stylePara }
            >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe vero atque sed modi quisquam sunt dignissimos cupiditate animi! Libero qui reprehenderit minima veniam! Libero quidem laborum eaque quos alias qui.
            </p> */}
        </div>
    )
}

export default Section
