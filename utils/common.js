
// 生成一窜随机订单
const RandomNumber = function RandomNumber () {
  const now = new Date()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 89 + 100)).toString()
}

// 对象深拷贝 待提取工具类
const DeepCopy = function deepCopy (obj) {
  var newObj = obj.constructor === Array ? [] : {}
  newObj.constructor = obj.constructor
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    // 若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
    newObj = JSON.parse(JSON.stringify(obj))
  } else {
    for (var prop in obj) {
      if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
        newObj[prop] = obj[prop]
      } else if (typeof obj[prop] === 'object') {
        // 递归
        newObj[prop] = deepCopy(obj[prop])
      } else {
        newObj[prop] = obj[prop]
      }
    }
  }
  return newObj
}
export default {
  RandomNumber: RandomNumber,
  DeepCopy: DeepCopy
}
