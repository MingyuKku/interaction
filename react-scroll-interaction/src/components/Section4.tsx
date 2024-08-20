import React from 'react'

const Section4 = () => {

    const sectionInfo = {
        color: '#dceaa4',
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

export default Section4
