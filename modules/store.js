export default {
  restaurantList: [],
  lastItemCount: 0,

  updateLastItemCount (count) {
    this.lastItemCount = count
  },
  getItem (restaurantId) {
    return this.restaurantList.find(o => o.id === restaurantId)
  },
  addItem (restaurantId, restaurantRating) {
    this.restaurantList.push({
      id: restaurantId,
      rating: restaurantRating
    })
  }
}
