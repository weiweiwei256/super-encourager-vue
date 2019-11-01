const publicPath = process.env.VUE_APP_PUBLICPATH
const outputDir = process.env.VUE_APP_OUTPUT_DIR
const assetsDir = process.env.VUE_APP_ASSETS_DIR
const webpack = require('webpack')
module.exports = {
    publicPath,
    outputDir,
    assetsDir,
    devServer: {
        host: 'localhost',
        port: 8080,
    },
    productionSourceMap: false,
    configureWebpack: config => {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
            }),
        )
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].minify = false
            return args
        })
    },
    lintOnSave: false,
}
