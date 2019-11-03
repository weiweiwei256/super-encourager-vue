// 模拟扩展点extension
// 模拟数据
import mock from './mock.js'
const extension = {
    // 模拟extension向前端发送请求
    postMessage: function(arg) {
        window.postMessage(arg)
    },
    // 后端接收到数据
    onDidReceiveMessage: function({ msgCode, cmdKey, value }) {
        console.log('extension接收到数据:' + JSON.stringify(value))
        let result
        if (mock[cmdKey] instanceof Function) {
            result = mock[cmdKey](value)
        } else if (mock[cmdKey] instanceof Object) {
            result = mock[cmdKey]
        } else if (!mock[cmdKey]) {
            console.error('请增加命令:' + cmdKey + '的模拟数据')
            return
        }
        let sendPkg = {
            cmdKey,
            msgCode,
            result,
        }
        this.postMessage(sendPkg)
    },
}

export default extension
