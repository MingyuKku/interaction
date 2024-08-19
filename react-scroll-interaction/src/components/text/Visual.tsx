import React from 'react'

interface Props {
    ratio: number;
}

const Visual: React.FC<Props> = ({ ratio }) => {

    const ratioController = {
        minMax: [0, 1],
        points: [0.4, 0.8]
    }

    const injectionStyle = React.useMemo<React.CSSProperties>(() => {
        // console.log('레티오', ratio)
        return {
            'opacity': ratio
        }
    }, [ratio])

    return (
        <div
            style={ injectionStyle }
            className='visual-text'
        >
            <p>Scroll Text</p>
        </div>
    )
}

export default Visual
