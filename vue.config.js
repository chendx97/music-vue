const scopeName = JSON.stringify(require('./package.json').name)
// 是否为开发模式
const isDevMode = process.env.NODE_ENV === 'development'
// 设置URL
const requestHost = '127.0.0.1:3000'
const serviceUrl = isDevMode
  ? { // so on dev we'll have
    http_base_url: JSON.stringify(`http://${requestHost}`),
    websocket_base_url: JSON.stringify(`ws://${requestHost}`)
  }
  : { // and on build (production):
    http_base_url: '"http://" + location.host',
    websocket_base_url: '"ws://" + location.host'
  }
const compileMode = process.argv[process.argv.length - 1].substr(2) // 编译模式: dev app lib
// 定义全局变量
const envObj = Object.assign(serviceUrl, {
  APP_SCOPE_NAME: scopeName, // app作用域
  VUE_ROUTER_MODE: JSON.stringify('hash'),
  VUE_ROUTER_BASE: JSON.stringify('/'),
  COMPILE_MODE: JSON.stringify(compileMode)
})
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    config.plugin('define').tap(args => {
      const processEnv = args[0]['process.env']
      Object.assign(processEnv, envObj)
      return args
    })
  }
}
