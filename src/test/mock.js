import * as cmds from '@/store/cmd-constant.js'
const defaultImg = require('@/assets/img/石原里美.jpeg')
import utils from '@/global/utils.js'
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
                keyword:
                    '石原里美 刘亦菲 古力娜扎 高圆圆 赵奕欢 江疏影 郑爽 范冰冰 新垣结衣 ⭐我的最爱',
                type: 'natural-hour',
                timeLast: 10,
                timeInterval: 30,
                needTip: false,
                maxImageNum: 10,
                isGif: false,
            },
            extra: {
                rootPath: 'rootPath',
            },
            globalState: {
                common: {
                    hasActiveDriver: true,
                },
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
        let { scope, key, value, sub } = arg
        console.log('scope', scope)
        console.log('key', key)
        console.log('value', value)
        console.log('sub', sub)
        return {
            msg: '更新webconfig',
        }
    },
    [cmds.OPEN_DIALOG]: arg => {
        let { subpath } = arg
        console.log('subpath', subpath)
        return {
            msg: '打开对话框',
        }
    },
    [cmds.SAVE_FILE]: ({ fileName }) => {
        return {
            msg: `保存文件${fileName}成功`,
        }
    },
    [cmds.CALL_ENTERAINMENT]: ({ type, name }) => {
        console.log('type', type)
        console.log('name', name)
        return {
            msg: '调用娱乐成功',
        }
    },
    [cmds.GET_DEFAULT_IMAGE]: async () => {
        let base64 = await utils.convertImgToBase64(defaultImg)
        return {
            base64,
        }
    },
    [cmds.PROXY_COMMUNICATION]: async arg => {
        let result = await window.axios({
            method: arg.method,
            url: arg.url,
            data: arg.params,
        })
        return result.data
    },
}
export default mock
