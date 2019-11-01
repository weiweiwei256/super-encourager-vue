import extension from './fake-extension.js'
// 模拟vscode对象
const vscode = {
    postMessage: function(msg) {
        // 前端统一记录向后端发送的数据
        console.log('sending message' + JSON.stringify(msg))
        // 模拟向extension发送数据,由extension决定如何处理
        extension.onDidReceiveMessage(msg)
    },
}
export default vscode
