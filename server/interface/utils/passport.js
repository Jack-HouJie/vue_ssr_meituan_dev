// 中间件安装包：koa2对passport权限认证的封装
import passport from 'koa-passport'
// 本地验证策略
import LocalStrategy from 'passport-local'
// 导入本地数据库
import UserModel from '../../dbs/models/users'

// 使用方法基于passport官方文档
// 提交数据（策略）
passport.use(new LocalStrategy(async function (username, password, done) {
  // 查询条件
  let where = {
    username
  }
  // 从本地数据库查找，判断是否存在该用户
  let result = await UserModel.findOne(where)
  if (result != null) {
    // 找到之后匹配密码
    if (result.password === password) {
      // 使用done回调函数返回用户实例
      return done(null, result)
    } else {
      // 返回false及提示
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

/** 
* 序列化API(固定格式)，让用户每次进入时候，通过session验证
* 验证成功后把用户数据序列化存入session
* 从session中反序列化得到用户数据
**/ 
// 序列化
passport.serializeUser(function (user, done) {
  done(null, user)
})
// 反序列化
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

//导出
export default passport
