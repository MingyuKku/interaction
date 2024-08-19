(function () {
    var sceneInfo = [
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
    ];
    var setLayout = function () {
        if (!window)
            return;
        var innerHeight = window.innerHeight;
        // 각 스크롤 섹션의 높이를 셋팅
        for (var i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * innerHeight;
            var container = sceneInfo[i].objs.container;
            if (container) {
                container.style.height = "".concat(sceneInfo[i].scrollHeight, "px");
            }
        }
        console.log('호이', sceneInfo);
    };
    var scrollLoop = function () {
        console.log('야야야', window.scrollY);
    };
    window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener(' scroll', function () {
        scrollLoop();
    });
})();
