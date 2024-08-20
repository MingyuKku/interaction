import React from 'react'
import Section from './components/Section'
import Section2 from './components/Sectiion2';
import Section3 from './components/Section3';
import TextVisual from './components/text/Visual';
import IntersectSection from './components/intersect/Section';
import IntersectSection2 from './components/intersect/Section2';
import ScrollAnimationFrame from './components/scroll-animation/Frame';

const App = () => {

    const section1Elem = React.useRef<HTMLDivElement>(null);
    const section2Elem = React.useRef<HTMLDivElement>(null);
    const section3Elem = React.useRef<HTMLDivElement>(null);

    const section1RatioController = {
        minMax: [0, 1],
        points: [0.35, 1]
    }
    const [ section1Ratio, setSection1Ratio ] = React.useState(0);

    const section2RatioController = {
        minMax: [0, 1],
        points: [0, 1]
    }

    React.useEffect(() => {
        if (!window) return;

        const scrollWindow = (e?: Event) => {
            if (!window || !section1Elem.current || !section2Elem.current || !section3Elem.current) return;

            
            const { offsetTop: section1ElemTop, offsetHeight: section1ElemHeight } = section1Elem.current;
            const { offsetTop: section2ElemTop, offsetHeight: section2ElemHeight } = section2Elem.current;
            const { offsetTop: section3ElemTop, offsetHeight: section3ElemHeight } = section3Elem.current;


            const clearAllRatio = () => {
                setSection1Ratio(0);
            }

            const isIntersectSection = (sectionTop: number, sectionHeight: number) => {
                const sectionBottom = sectionTop + sectionHeight;
                const { scrollY, innerHeight } = window;

                if (
                    (scrollY + innerHeight) >= sectionTop &&
                    scrollY <= sectionBottom
                ) {
                    return true;
                }
                return false;
            }

            const calculateRatio = (sectionTop: number, sectionHeight: number, minMax: number[], points: number[], text?: string) => {
                // const sectionBottom = sectionTop + sectionHeight;
                const { scrollY, innerHeight } = window;
                const offsetScrollY = (scrollY+innerHeight) - sectionTop;

                let ratio = offsetScrollY / sectionHeight;
                const timeRatio = offsetScrollY / (sectionHeight + innerHeight); // 애니메이션 프레임을 0~1사이의 값으로
                if (timeRatio < points[0]) ratio = minMax[0]; // points[0]은 프레임 시작 지점 => 시작 지점 전에는 ratio값을 min으로
                if (timeRatio > points[1]) ratio = minMax[1]; // points[1]은 프레임 종료 지점 => 종료 지점 후에는 ratio값을 max으로
                // console.log('비율', text, ratio * (minMax[1] - minMax[0]))

                return ratio * (minMax[1] - minMax[0]);
            }
            

            if (isIntersectSection(section1ElemTop, section1ElemHeight)) {
                // console.log('섹션 1 ratio', calculateRatio(section1ElemTop, section1ElemHeight))
                setSection1Ratio(calculateRatio(section1ElemTop, section1ElemHeight, section1RatioController.minMax, section1RatioController.points, '섹션1'));
                return;
            }


            if (isIntersectSection(section2ElemTop, section2ElemHeight)) {
                // calculateRatio(section2ElemTop, section2ElemHeight, section2RatioController.minMax, section2RatioController.points, '섹션2')
                // console.log('섹션 2 ratio', calculateRatio(section2ElemTop, section2ElemHeight))
            }

            if (isIntersectSection(section3ElemTop, section3ElemHeight)) {
                // console.log('섹션 3 ratio', calculateRatio(section3ElemTop, section3ElemHeight))
            }
            
            // clearAllRatio();
        }

        // scrollWindow();
        window.addEventListener('scroll', scrollWindow);

        return () => {
            window.removeEventListener('scroll', scrollWindow);
        }
    }, [])

    return (
        <div>
            <ScrollAnimationFrame />
            {/* <div className="visual">
                <div className='image'>
                    <img src="https://cdn.pixabay.com/photo/2016/10/22/01/54/wood-1759566_1280.jpg" alt="bg" />
                </div>
            </div>
            <Section
                elemRef={ section1Elem }
                ratio={ section1Ratio }
            />
            <Section2
                elemRef={ section2Elem }
            />
            <Section3
                elemRef={ section3Elem }
            />
            <TextVisual ratio={ section1Ratio } /> */}
        </div>
    )
}

export default App
