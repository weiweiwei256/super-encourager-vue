// 生成随机串
let canvas
let utils = {
    initCanvas: function() {
        if (!canvas) {
            canvas = document.createElement('canvas')
        }
        return canvas
    },
    loadImg: async function(src) {
        let img = new Image()
        img.src = src
        return new Promise((resolve, reject) => {
            img.onload = function() {
                resolve(img)
            }
            img.onerror = function(error) {
                reject(error)
            }
        })
    },
    toBase64: function(img, outputFormat) {
        let ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        return canvas.toDataURL(outputFormat || 'image/jpg')
    },
    convertImgToBase64: async function(url, outputFormat) {
        this.initCanvas()
        if (!canvas.toDataURL || typeof canvas.toDataURL !== 'function') {
            throw new Error('method not supported')
        }
        const img = await this.loadImg(url, 'Anonymous')
        return this.toBase64(img, outputFormat)
    },
    randomString: (len = 20) => {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' //去掉容易混淆字符
        let charSetLen = chars.length
        let ret = ''
        for (let i = 0; i < len; i++) {
            ret += chars.charAt(Math.floor(Math.random() * charSetLen))
        }
        return ret
    },
}

export default utils
