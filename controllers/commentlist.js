const {
  mysql
} = require('../qcloud')

module.exports = async ctx => {
  const {
    bookid,
    openid
  } = ctx.request.query
  const mysqlSelect = mysql('comments').select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
  let comments
  if (bookid) {
    comments = await mysqlSelect.where('bookid', bookid)
  } else if (openid) {
    comments = await mysqlSelect.where('openid', openid)
  }

  ctx.state.data = {
    list: comments.map(comment => {
      const info = JSON.parse(comment.user_info)
      return Object.assign({}, comment, {
        user_info: {
          title: info.nickName,
          image: info.avatarUrl
        }
      })
    })
  }
}
