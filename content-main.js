import API from './modules/api.js'
import Store from './modules/store.js'
import Overlay from './modules/overlay.js'

function getRestaurantList () {
  return document.querySelectorAll('[data-restaurant-id]')
}

async function getRestaurantRatings () {
  let restaurantList = getRestaurantList()
  await Promise.all([...restaurantList].map(async element => {
    let restaurantId = element.dataset.restaurantId
    if (!Store.getItem(restaurantId)) {
      console.log('hi')
      let rating
      try {
        rating = await API.getFoodHygieneRating(restaurantId)
      } catch {
        rating = 'Error'
      }
      await Store.addItem(restaurantId, rating)
    }
    Overlay.addItem(restaurantId)
  }));
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(async () => {
    let itemCount = getRestaurantList().length
    if (itemCount !== Store.lastItemCount) {
      Store.updateLastItemCount(itemCount)
      await getRestaurantRatings()
      Overlay.updatePositionAll()
    }
  })
})

getRestaurantRatings()
Overlay.init()
observer.observe(document.querySelector('[data-search-results-container]'), {
  childList: true,
  subtree: true
})
