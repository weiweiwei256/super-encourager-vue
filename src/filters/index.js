const utils = {
    leftpad(num) {
        return num < 10 ? '0' + num : '' + num
    },
    dateFormatter(ts, tpl = 'Y-M-D H:m:s') {
        if (typeof ts === 'string') {
            ts = parseInt(ts)
        }
        const date = new Date(ts)
        const dateObj = {
            Y: date.getFullYear(),
            M: utils.leftpad(date.getMonth() + 1),
            D: utils.leftpad(date.getDate()),
            H: utils.leftpad(date.getHours()),
            m: utils.leftpad(date.getMinutes()),
            s: utils.leftpad(date.getSeconds()),
        }
        for (let key in dateObj) {
            tpl = tpl.replace(key, dateObj[key])
        }
        return tpl
    },
}
export default utils
