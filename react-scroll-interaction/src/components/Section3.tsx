import React from 'react'

const Section3 = () => {

    const sectionInfo = {
        color: '#e4e6e6',
        heightRatio: 2,
    }
    const [ scrollHeight, setScrollHeight ] = React.useState(0);


    React.useEffect(() => {
        if (!window) return;

        setScrollHeight(window.innerHeight * sectionInfo.heightRatio);
    }, [])

    return (
        <div
            style={{
                'backgroundColor': sectionInfo.color,
                'height': scrollHeight
            }}
        >
        
        </div>
    )
}

export default Section3
