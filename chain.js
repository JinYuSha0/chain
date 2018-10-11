/**
 * @author JinYu Shao
 * @date 2018/9/30
 * @fileName chain.js
 * @Description:
*/

function chain(constructor, protoList, returnThis, setInFunc) {
  if (returnThis || setInFunc) {
    protoList.forEach(function (p) {
      for (var i in p) {
        (function () {
          if (setInFunc && !returnThis) {
            constructor[i] = p[i]
          }
          if (returnThis) {
            var applyMethod = p[i]
            p[i] = function () {
              var res = applyMethod.apply(this, arguments)
              return res == null ? this : res
            }
            if (setInFunc) {
              constructor[i] = p[i]
            }
          }
        })()
      }
    })
  }
  protoList.reverse()
  return protoList.reduce(function (ctr, prototype) {
    var prev = ctr
    if (protoList.indexOf(prototype) === protoList.length - 1) {
      ctr = constructor
    } else {
      ctr = new Function
    }
    if (prev) {
      prev.prototype.constructor = constructor
      ctr.prototype = Object.create(prev.prototype)
    }
    Object.assign(ctr.prototype, prototype)
    return ctr
  }, null)
}
