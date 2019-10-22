const publicPath = process.env.VUE_APP_PUBLICPATH
const outputDir = process.env.VUE_APP_OUTPUT_DIR
const assetsDir = process.env.VUE_APP_ASSETS_DIR
module.exports = {
    publicPath,
    outputDir,
    assetsDir,
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].minify = false
            return args
        })
    },
}
