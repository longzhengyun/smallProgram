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
    this.getContData('articleData', 'article_data', (data) => {
      this.setData({ articleList: data })
    })

    // 获取网站数据
    this.getContData('siteData', 'site_data', (data) => {
      this.setData({ siteList: data })
    })
  },
  initData (data) { // 初始化数据
    let array = []
    if (data.length) {
      data.map((item, key) => {
        if (key < 10) {
          array.push(item)
        }
      })
    }
    return array
  },
  sortData (data) { // 初始化数据
    data.sort((a, b) => {
      return b.date - a.date
    })
    return data
  },
  getContData (key, id, callback) { // 获取数据
    wx.getStorage({
      key,
      success: (res) => {
        if (res.errMsg === 'getStorage:ok') {
          let data = this.initData(res.data)
          this.sortData(data)
          callback(data)
        }
      },
      fail: (res) => {
        app.func.getData(id, (res) => {
          let data = this.initData(res.db_data)
          this.sortData(data)
          callback(data)
        })
      }
    })
  }
})