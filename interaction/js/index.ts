(() => {

    interface SceneInfo {
        type: 'sticky' | 'normal';
        heightNum: number;
        scrollHeight: number;
        objs: {
            container: HTMLElement | null;
        }
    }

    const sceneInfo: SceneInfo[] = [
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
            }
        },
        {
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
            }
        },
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
            }
        },
    ]


    const setLayout = () => {
        if (!window) return;

        const { innerHeight } = window;
        // 각 스크롤 섹션의 높이를 셋팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;

            const container = sceneInfo[i].objs.container;
            if (container) {
                container.style.height = `${sceneInfo[i].scrollHeight}px`;
            }
        }

        console.log('호이', sceneInfo)
    }

    const scrollLoop = () => {
        console.log('야야야', window.scrollY)
    }

    window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener(' scroll', () => {
        scrollLoop();
    });
})();