import React from 'react'

const Section2 = () => {

    const sectionInfo = {
        color: '#9fc4d6',
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

export default Section2
