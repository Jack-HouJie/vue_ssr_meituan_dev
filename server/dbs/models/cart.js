import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  // 产品ID
  id: {
    type: String,
    require: true
  },
  // 产品细节信息（包括价格、图片等）
  detail: {
    type: Array,
    require: true
  },
  // 购物车ID
  cartNo: {
    type: String,
    require: true
  },
  // 用户信息
  user: {
    type: String,
    require: true
  },
  // 购物车创建时间
  time: {
    type: String,
    require: true
  }
})
export default mongoose.model('Cart', Cart)
