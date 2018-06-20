//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articleList: [],
    siteList: []
  },
  onLoad: function () {
    // 获取文章数据
    this.getContData('articleData', 'article_data', 10, (data) => {
      this.setData({ articleList: data })
    })

    // 获取网站数据
    this.getContData('siteData', 'site_data', 8, (data) => {
      this.setData({ siteList: data })
    })
  },
  initData (data, length) { // 初始化数据
    let array = []
    if (data.length) {
      data.map((item) => {
        if (item.hot === 'y' && array.length < length) {
          array.push(item)
        }
      })
    }
    return array
  },
  getContData (key, id, length, callback) { // 获取数据
    wx.getStorage({
      key,
      success: (res) => {
        if (res.errMsg === 'getStorage:ok') {
          let data = this.initData(res.data, length)
          callback(data)
        }
      },
      fail: () => {
        app.func.getData(id, (res) => {
          let data = this.initData(res, length)
          callback(data)
        })
      }
    })
  }
})