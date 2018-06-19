Component({
  properties: {
    subMenuData: {
      type: Array
    },
    target: {
      type: String
    }
  },
  methods: {
    changeSubMenu: function (item) {
      if (item.currentTarget.dataset.item !== this.properties.target) {
        this.triggerEvent('changeData', item.currentTarget.dataset.item)
      }
    }
  }
})
