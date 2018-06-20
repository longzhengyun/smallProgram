Component({
  properties: {
    listTitle: {
      type: String
    },
    listData: {
      type: Array
    },
    listTarget: {
      type: String
    },
    showMore: {
      type: Boolean
    },
    listCategory: {
      type: String
    }
  },
  methods: {
    goTarget(item) {
      if (item.currentTarget.dataset.category === 'article') {
        wx.navigateTo({
          url: '/pages/articleDetail/index?id=' + item.currentTarget.dataset.item.id
        })
      }
    }
  }
})
