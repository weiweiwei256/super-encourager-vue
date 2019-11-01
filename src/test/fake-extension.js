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
        console.log('extension receive:' + JSON.stringify(value))
        let ret
        if (mock[cmdKey] instanceof Function) {
            ret = mock[cmdKey](value)
        } else if (mock[cmdKey] instanceof Object) {
            ret = mock[cmdKey]
        }
        // 提取msgCode用于前端识别返回值
        ret.msgCode = msgCode
        this.postMessage(ret)
    },
}

export default extension
