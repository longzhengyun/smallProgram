//获取应用实例
const app = getApp()

Page({
  data: {
    subMenuData: ['全部', '技术', '工具', '其他'],
    siteList: [],
    siteTarget: '全部'
  },
  onLoad: function () {
    // 获取网站数据
    this.getSiteData(this.data.siteTarget)
  },
  getSiteData(siteTarget) {
    this.getContData('siteData', 'site_data', siteTarget, (data) => {
      this.setData({ siteList: data })
      // 修改subMenu的值
      this.setData({ siteTarget })
    })
  },
  initData (data, keyword) { // 初始化数据
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
    // 更新网站数据
    this.getSiteData(item.detail)
  }
})