//获取应用实例
const app = getApp()

Page({
  data: {
    subMenuData: ['全部', 'HTML', 'CSS', 'JavaScript', '杂谈'],
    articleList: [],
    articleTarget: '全部'
  },
  onLoad: function () {
    // 获取文章数据
    this.getArticleData(this.data.articleTarget)
  },
  getArticleData(articleTarget) {
    this.getContData('articleData', 'article_data', articleTarget, (data) => {
      this.setData({ articleList: data })
      // 修改subMenu的值
      this.setData({ articleTarget })
    })
  },
  initData (data, keyword) { // 初始化数据
    let array = []
    data.map((item, key) => {
      item.description = item.description.replace(/\/content\/uploadfile\//gi, 'http:\/\/www.jary8.com\/static\/content\/uploadfile\/')
      item.description = item.description.replace(/\<img/gi, '<img style="display:block;max-width:100%;height:auto" ')
    })
    if (keyword === '全部') {
      array = data
    } else {
      data.map((item, key) => {
        if (item.category === keyword) {
          array.push(item)
        }
      })
    }
    return array
  },
  getContData (key, id, keyword, callback) { // 获取数据
    wx.getStorage({
      key,
      success: (res) => {
        if (res.errMsg === 'getStorage:ok') {
          let data = this.initData(res.data, keyword)
          callback(data)
        }
      },
      fail: () => {
        app.func.getData(id, (res) => {
          let data = this.initData(res, keyword)
          callback(data)
        })
      }
    })
  },
  changeData (item) {
    // 更新文章数据
    this.getArticleData(item.detail)
  }
})