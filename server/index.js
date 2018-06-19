let baseUrl = 'http://www.jary8.com/static/data/db_config.php'
const getData = (id, callback) => {
  wx.request({
    url: baseUrl + '?id=' + id,
    header: {
      'content-type': 'application/json'
    },
    success: (res) => {
      return typeof callback === 'function' && callback(res.data)
    },
    fail: (res) => {
      return typeof callback === 'function' && callback(res.data)
    }
  })
}

module.exports = { getData }