module.exports = async (ctx, next) => {
  ctx.state.data = {
    msg: 'hello, 小程序测试后台'
  }
}