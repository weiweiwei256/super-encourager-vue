// 生成随机串
let utils = {}
utils.randomString = (len = 20) => {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' //去掉容易混淆字符
    let charSetLen = chars.length
    let ret = ''
    for (let i = 0; i < len; i++) {
        ret += chars.charAt(Math.floor(Math.random() * charSetLen))
    }
    return ret
}
export default utils
