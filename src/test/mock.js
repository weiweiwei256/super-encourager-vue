import * as cmds from '@/store/cmd-constant.js'
const defaultImg = require('@/assets/img/石原里美.jpeg')
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
        console.log('发送设置!')
        return {
            config: {
                isGif: false,
                keyword: '迪丽热巴',
                maxImageNum: 5,
                needTip: false,
                timeInterval: 30,
                timeLast: 10,
                type: 'natural-hour',
            },
            extra: {
                rootPath: 'rootPath',
            },
            globalState: {
                encourager: { hitokoto_type: 'c' },
            },
        }
    },
    // encourager page
    [cmds.ENCOURAGER_IMAGE]: {
        imageUrl: defaultImg,
        isCollected: true,
    },
    [cmds.ENCOURAGER_CHANGE_IMAGE_COLLECT]: value => {
        return {
            msg: '改变成功',
        }
    },
    [cmds.STOP_CLOSE]: {
        msg: '终止自动关闭',
    },
    [cmds.BEFORE_CLOSE]: {
        msg: '关闭前数据',
    },
    [cmds.UPDATE_WEB_CONFIG]: arg => {
        let { page, key, value } = arg
        console.log(page)
        console.log(key)
        console.log(value)
        return {
            msg: '更新webconfig',
        }
    },
    [cmds.SAVE_FILE]: ({ fileName }) => {
        return {
            msg: `保存文件${fileName}成功`,
        }
    },
    [cmds.CALL_ENTERAINMENT]: ({ type, name }) => {
        console.log(type)
        console.log(name)
        return {
            msg: '调用娱乐成功',
        }
    },
}
export default mock
