import Driver from 'driver.js'
import { Message } from 'element-ui'
import Vue from 'vue'
import 'driver.js/dist/driver.min.css'
import * as cmds from '@/store/cmd-constant.js'
let vm = null
const driver = new Driver({
    animate: true, // Whether to animate or not
    opacity: 0.5,
    padding: 5,
    stageBackground: '#306b8e',
    allowClose: false,
    showButtons: true, // Do not show control buttons in footer
    doneBtnText: '感谢你的使用', // Text on the last button
    closeBtnText: '关闭', // Text on the close button
    nextBtnText: '下一步', // Next button text
    prevBtnText: '上一步', // Previous button text
    onReset: () => {
        Message('点击右上按钮"使用向导"可再次使用')
        vm.sendMessage(cmds.UPDATE_WEB_CONFIG, {
            scope: 'globalState',
            key: 'hasActiveDriver',
            value: true,
            sub: 'common',
        })
    }, // 关闭回调
})
let steps = [
    {
        element: '#view-nav',
        popover: {
            title: '导航',
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
            <br>ps:为达到更好效果可能需要你先调大显示区域。
            `,
            position: 'right-center',
        },
    },
    {
        element: '#to-common-api',
        popover: {
            title: '常用API页',
            description: `
                提供各种常用API地址，点击即可跳转。另外还会推荐一些方便开发的辅助插件、扩展等。
            `,
            position: 'right-center',
        },
    },
    {
        element: '#to-tools',
        popover: {
            title: '工具页',
            description: `
            提供各种常用工具，让你'足不出户'解决问题。
            <br>目前的工具还很少，会陆续追加。
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
            description: `超级鼓励师会根据关键字检索相关美图展现到鼓励页。
            <br>支持多个关键字同时配置，通过空格或者换行分隔。鼓励师会从多个关键字随机选择后获取美图。<br>'⭐我的最爱'是特殊的关键字，该关键字被选中时会从用户收藏的图片中随机选取一张展示（鼓励页提供收藏美图功能）`,
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
            description: `整点鼓励：在自然时间整点例如12：00自动召唤。<br>
                整半点鼓励：自然时间每半小时自动召唤。<br>
                特定时间间隔鼓励：用户自己指定特定时间间隔召唤。`,
            position: 'bottom-center',
        },
    },
    {
        element: '#timeInterval',
        popover: {
            title: '设置时间间隔',
            description: `当用户设置鼓励方式为：'特定时间间隔鼓励'时，该属性生效。根据用户设置的时间间隔召唤鼓励师`,
            position: 'bottom-center',
        },
    },
    {
        element: '#needTip',
        popover: {
            title: '召唤提示',
            description: `直接召唤：鼓励师被召唤时，直接出现在当前编辑区域的右侧区域。<br>
                消息提示：vscode弹出是否召唤鼓励师的提示，点击确定后才召唤。<br>
                ps：你也可以通过点击编辑器右上礼物图标、下方召唤鼓励师状态栏、右键菜单super.call和快捷键Cmd/Ctrl+F1直接召唤`,
            position: 'bottom-center',
        },
    },
    {
        element: '#isGif',
        popover: {
            title: '是否搜索动图',
            description: `
            开启后，会根据关键字搜索高清动图。但是受搜索引擎能力影响，准确度会有所降低。
        `,
            position: 'top-center',
        },
    },
    {
        element: '#maxImageNum',
        popover: {
            title: '关键字最大图片数量',
            description: `
            每个关键字单独计算。<br>
            超过该数量就不再通过网络获取美图了。
        `,
            position: 'top-center',
        },
    },
    {
        element: '#to-about',
        popover: {
            title: '简要介绍',
            description: `超级鼓励师的定位、架构设计等信息`,
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
            title: '最后',
            description: `开源公益，不易，觉得不错记得回来点颗星并分享给你的好友呀！
            <br>希望超级鼓励师能为努力工作的你带来鼓励和帮助!`,
            position: 'bottom-center',
        },
    },
]
const myDriver = {
    start(vmObj) {
        vm = vmObj
        driver.defineSteps(steps)
        driver.start()
    },
}
export default myDriver
