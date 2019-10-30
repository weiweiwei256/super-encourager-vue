import extension from './fake-extension.js'
// 模拟vscode对象
const vscode = {
    postMessage: function(msg) {
        console.log('web test environment send message' + JSON.stringify(msg))
        // 模拟向extension发送数据
        extension.onDidReceiveMessage(msg)
    },
}
export default vscode
