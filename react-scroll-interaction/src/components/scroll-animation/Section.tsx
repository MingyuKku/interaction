import React from 'react';
import { SectionType } from './_types';


interface Props {
    sectionInfo: SectionType;
}
const Section: React.FC<Props> = ({ sectionInfo }) => {

    const [ scrollHeight, setScrollHeight ] = React.useState(0);

    React.useEffect(() => {
        if (!window || !sectionInfo.elem) return;

        const ratioScrollHeight = window.innerHeight * sectionInfo.heightRatio;
        setScrollHeight(ratioScrollHeight);
    }, [])
    
    
    return (
        <section
            style={{
                'backgroundColor': sectionInfo.color,
                'height': scrollHeight,
            }}
        >
            <p
                className='center-h'
                style={ sectionInfo.animationFrame ? {
                    'opacity': sectionInfo.animationFrame.opacity_in?.[0].value
                } : undefined}
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </section>
    )
}

export default Section
