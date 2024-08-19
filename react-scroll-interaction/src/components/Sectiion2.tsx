import React from 'react'
import { SECTION } from '../constants'

interface Props {
    elemRef: React.RefObject<HTMLDivElement>;
}

// const Section: React.FC<Props> = ({ scrollElem, scrollHeight, scrollHeightRatio }) => {
const Section2: React.FC<Props> = ({ elemRef }) => {

    
    const [ scrollObj, setScrollObj ] = React.useState<{
        scrollHeight: number;
        heightRatio: number;
    }>({
        scrollHeight: 0,
        heightRatio: 3,
    })


    const init = () => {
        setScrollObj({
            ...scrollObj,
            scrollHeight: window.innerHeight * scrollObj.heightRatio,
        })
    }

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
            className='section section2'
        >
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe vero atque sed modi quisquam sunt dignissimos cupiditate animi! Libero qui reprehenderit minima veniam! Libero quidem laborum eaque quos alias qui.
            </p>
        </div>
    )
}

export default Section2
