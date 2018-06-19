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
    data.map((item, key) => {
      item.date = new Date(item.date * 1000).toString().slice(4, 15)
    })
    let array = []
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
  sortData (data) { // 初始化数据
    return data.sort((a, b) => {
      return b.date - a.date
    })
  },
  getContData (key, id, keyword, callback) { // 获取数据
    wx.getStorage({
      key,
      success: (res) => {
        if (res.errMsg === 'getStorage:ok') {
          let data = this.initData(res.data, keyword)
          data = this.sortData(data)
          callback(data)
        }
      },
      fail: (res) => {
        app.func.getData(id, (res) => {
          let data = this.initData(res.db_data, keyword)
          data = this.sortData(data)
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