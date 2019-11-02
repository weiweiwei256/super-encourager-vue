import * as cmds from '@/store/cmd-constant.js'
// 模拟vscode对象
const mock = {
    [cmds.LOG]: ({ msg }) => {
        console.info('extension收到数据:' + msg)
        return {
            value: 'seceive message',
        }
    },
    [cmds.TEST]: () => {
        console.info('extension收到测试命令')
        return {}
    },
    [cmds.INIT]: () => {
        return {
            config: {
                isGif: false,
                keyword: '迪丽热巴',
                maxImageNum: 5,
                needTip: false,
                timeInterval: 30,
                timeLast: 0,
                type: 'natural-hour',
            },
            globalState: { hitokoto_type: 'a' },
        }
    },
}
export default mock
