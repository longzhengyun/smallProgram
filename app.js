//app.js
let { getData } = require('server/index.js')

App({
  onLaunch: function () {
    // 存储文章数据
    getData('article_data', (res) => {
      if (res && res.db_data) {
        wx.setStorage({
          key: 'articleData',
          data: res.db_data
        })
      }
    })
    // 存储网站数据
    getData('site_data', (res) => {
      if (res && res.db_data) {
        wx.setStorage({
          key: 'siteData',
          data: res.db_data
        })
      }
    })
  },
  globalData: {
  },
  func: {
    getData
  }
})