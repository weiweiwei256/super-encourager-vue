import Driver from 'driver.js'
import { Message } from 'element-ui'
import 'driver.js/dist/driver.min.css'
const driver = new Driver({
    animate: true, // Whether to animate or not
    opacity: 0.5,
    padding: 5,
    allowClose: false,
    showButtons: true, // Do not show control buttons in footer
    doneBtnText: '感谢你的使用', // Text on the last button
    closeBtnText: '关闭', // Text on the close button
    nextBtnText: '下一步', // Next button text
    prevBtnText: '上一步', // Previous button text
    onReset: () => {
        Message('点击右上按钮"使用向导"可再次使用')
    }, // 关闭回调
})
let steps = [
    {
        element: '#view-nav',
        popover: {
            title: '分页导航',
            description: '点击可以进入:鼓励页,娱乐页,常用API页,工具页,设置页和关于页',
            // position can be left, left-center, left-bottom, top,
            // top-center, top-right, right, right-center, right-bottom,
            // bottom, bottom-center, bottom-right, mid-center
            position: 'right-center',
        },
    },
    {
        element: '#to-encourager',
        popover: {
            title: '鼓励页',
            description: `
            一言鼓励：根据用户指定类型随机获取一句话。
            <br>美图鼓励: 根据用户指定的关键字从百度获取高清图片，支持多个关键字。快来把女神，男神，爱酱，老婆，老公一网打尽吧！`,
            position: 'right-center',
        },
    },
    {
        element: '#to-entertainment',
        popover: {
            title: '娱乐页',
            description: `
            娱乐页提供各种让你放松的娱乐项目，希望有你喜欢的。
            <br>游戏类(鼠标或者键盘完成操作): 有推箱子，过马路， 翻卡片。
            <br>发泄类(以鼠标为主): 释放你破坏欲好地方. 
            <br>发呆类: 这里有炫丽的效果，发发呆，放空大脑.
            <br>为达到更好效果可能需要你先调大显示区域。
            `,
            position: 'right-center',
        },
    },
    {
        element: '#to-common-api',
        popover: {
            title: '常用API页',
            description: `
                提供各种工作过程中常用API地址点击即可跳转。
               <br>还推荐一些方便开发的辅助插件、扩展等。
            `,
            position: 'right-center',
        },
    },
    {
        element: '#to-tools',
        popover: {
            title: '工具页',
            description: `
            提供各种工作过程中常用工具，让你足不出户解决问题。
            <br>目前的工具还很少，陆续会不断追加。
            `,
            position: 'right-center',
        },
    },

    {
        element: '#to-setting',
        popover: {
            title: '设置页',
            description: '开始你对于超级鼓励师的各种定制吧！',
            position: 'right-center',
        },
        onNext: () => {
            // 模拟点击行为
            document.getElementById('to-setting').dispatchEvent(new MouseEvent('click'))
            driver.preventMove()
            setTimeout(() => {
                driver.moveNext()
            }, 100)
        },
    },
    {
        element: '#keyword',
        popover: {
            title: '关键字设置',
            description: `超级鼓励师会根据关键字检索相关美图展现到鼓励页。<br>支持多个关键字同时配置，请通过空格或者换行分隔。鼓励师会从多个关键字随机选择后获取美图。<br>'⭐我的最爱'是特殊的关键字，该关键字被选中时会从用户收藏的图片中随机选取一张展示（鼓励页提供收藏美图功能）`,
            position: 'bottom-center',
        },
    },
    {
        element: '#timeLast',
        popover: {
            title: '鼓励时间设置',
            description:
                '当鼓励师显示后，根据用户设置的时间进行倒计时，计时结束后将会自动关闭。<br>当用户产生任何点击操作后，计时会终止，需用户手动关闭。<br>当设置持续时间为0秒时，不再计时，需手动关闭。',
            position: 'bottom-center',
        },
    },
    {
        element: '#type',
        popover: {
            title: '鼓励方式设置',
            description: `整点鼓励：即在自然时间整点例如12：00自动召唤。<br>
                整半点鼓励：即自然时间每半小时自动召唤。<br>
                特定时间间隔鼓励：即用户自己指定特定时间间隔召唤。`,
            position: 'bottom-center',
        },
    },
    {
        element: '#timeInterval',
        popover: {
            title: '设置时间间隔',
            description:
                '当用户设置鼓励方式为：特定时间间隔鼓励时，该属性生效。根据用户设置的时间间隔召唤鼓励师',
            position: 'bottom-center',
        },
    },

    {
        element: '#to-about',
        popover: {
            title: '超级鼓励师的简介',
            position: 'right-center',
        },
        onNext: () => {
            // 模拟点击行为
            document.getElementById('to-about').dispatchEvent(new MouseEvent('click'))
            driver.preventMove()
            setTimeout(() => {
                driver.moveNext()
            }, 100)
        },
    },
    {
        element: '#about',
        popover: {
            title: '开源公益，不易，觉得不错记得回来点颗星哈！',
            position: 'bottom-center',
        },
    },
    {
        element: '#view-nav',
        popover: {
            title: '最后',
            description: '希望能为努力工作的你带来鼓励和帮助!',
            position: 'right-center',
        },
    },
]
const myDriver = {
    start() {
        driver.defineSteps(steps)
        driver.start()
    },
}
export default myDriver
