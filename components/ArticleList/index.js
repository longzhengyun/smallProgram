Component({
  properties: {
    listData: {
      type: Array
    },
    target: {
      type: String
    }
  },
  methods: {
    goTarget(item) {
      wx.navigateTo({
        url: '/pages/articleDetail/index?id=' + item.currentTarget.dataset.item.id
      })
    }
  }
})
