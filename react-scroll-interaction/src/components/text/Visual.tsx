import React from 'react'

interface Props {
    ratio: number;
}

const Visual: React.FC<Props> = ({ ratio }) => {

    const injectionStyle = React.useMemo<React.CSSProperties>(() => {
        console.log('레티오', ratio)
        return {
            'opacity': ratio,
            'transition': ratio === 0 ? 'opacity .25s ease-in-out' : undefined
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
