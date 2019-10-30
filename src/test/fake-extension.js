// 模拟扩展点extension
// 模拟数据
const mock = {
    log: {
        cmd: 'log',
        value: 'aaaa',
    },
}
const extension = {
    // 向前端发送请求
    postMessage: function(arg) {
        window.postMessage(arg)
    },
    // 后端接收到数据
    onDidReceiveMessage: function(arg) {
        let key = arg.key
        let ret = mock[arg.cmd]
        ret.key = key
        this.postMessage(ret)
        console.log('extension的返回值' + ret)
    },
}

export default extension
