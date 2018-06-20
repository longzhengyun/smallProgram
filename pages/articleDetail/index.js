//获取应用实例
const app = getApp()

Page({
  data: {
    articleId: '',
    articleDetail: {},
    relevantList: []
  },
  onLoad: function (option) {
    this.setData({ articleId: option.id })
    // 获取文章数据
    this.getArticleData()
  },
  getArticleData() {
    this.getContData('articleData', 'article_data', (data) => {
      this.setData({ articleDetail: data })
    })
  },
  initData (data) { // 初始化数据
    let obj = {}
    let array = []
    let category = ''
    let id = this.data.articleId
    data.map((item) => {
      if (item.id === id) {
        item.content = item.content.replace(/\/content\/uploadfile\//gi, 'http:\/\/www.jary8.com\/static\/content\/uploadfile\/')
        item.content = item.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
        obj = item
        category = item.category
      }
    })
    data.map((item) => {
      if (item.category === category && item.hot === 'y' && item.id !== id && array.length < 4) {
        array.push(item)
      }
    })
    this.setData({ relevantList: array })
    return obj
  },
  getContData (key, id, callback) { // 获取数据
    wx.getStorage({
      key,
      success: (res) => {
        if (res.errMsg === 'getStorage:ok') {
          let data = this.initData(res.data)
          callback(data)
        }
      },
      fail: () => {
        app.func.getData(id, (res) => {
          let data = this.initData(res)
          callback(data)
        })
      }
    })
  }
})