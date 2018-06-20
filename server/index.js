const util = require('../utils/util.js')
let baseUrl = 'http://www.jary8.com/static/data/db_config.php'

const sortData = (data) => { // 数据排序
  return data.sort((a, b) => {
    return b.date - a.date
  })
}

const formatDate = (data) => { // 数据排序
  data.map((item) => {
    item.date = util.formatTime(new Date(item.date * 1000)).slice(0, 10)
  })
  return data
}

const getData = (id, callback) => {
  wx.request({
    url: baseUrl + '?id=' + id,
    header: {
      'content-type': 'application/json'
    },
    success: (res) => {
      let data = []
      data = res.data.db_data
      if (id === 'article_data') {
        data = sortData(data)
        data = formatDate(data)
      }
      return typeof callback === 'function' && callback(data)
    },
    fail: (res) => {
      return typeof callback === 'function' && callback(res.data)
    }
  })
}

module.exports = { getData }