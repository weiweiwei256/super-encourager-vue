import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
const driver = new Driver({
    animate: true, // Whether to animate or not
    opacity: 0.75,
    showButtons: true, // Do not show control buttons in footer
    doneBtnText: '已了解', // Text on the last button
    closeBtnText: '关闭', // Text on the close button
    nextBtnText: '下一条', // Next button text
    prevBtnText: '上一条', // Previous button text
})
let steps = [
    {
        element: '#view-nav',
        popover: {
            title: '这里是分页导航',
            description: '通过这个可以进入:鼓励页,娱乐页,常见API页,常见工具页,设置页和关于页',
            // position can be left, left-center, left-bottom, top,
            // top-center, top-right, right, right-center, right-bottom,
            // bottom, bottom-center, bottom-right, mid-center
            position: 'right-center',
        },
    },
    {
        element: '#to-about',
        popover: {
            title: '这里可了解更多关于超级鼓励师的信息',
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
            title: '这里有详细的功能介绍',
            position: 'bottom-center',
        },
    },
    {
        element: '#view-nav',
        popover: {
            title: '开始你的探索吧',
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
