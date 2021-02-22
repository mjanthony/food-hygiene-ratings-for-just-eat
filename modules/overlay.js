import Store from './store.js'
export default {
  init () {
    const body = document.body
    const element = document.createElement('div')
    element.id = 'fhr-overlay'
    body.insertBefore(element, body.firstChild)
    window.addEventListener('resize', () => {
      this.updatePositionAll()
    });
  },
  addItem (restaurantId) {
    let rating = Store.getItem(restaurantId).rating
    const container = document.getElementById('fhr-overlay')
    const target = document.querySelector('[data-restaurant-id=\"' + restaurantId + '\"]')
    if (target) {
      const element = document.createElement('div')
      element.className = 'fhr-rating'
      element.dataset.fhrRestaurantId = restaurantId
      switch (rating) {
        case 'Pass':
          element.classList.add('fhr-rating--pass')
          element.innerHTML = '&check;'
          break;
        case 'Improvement Required':
          element.classList.add('fhr-rating--fail')
          element.innerHTML = '&cross;'
          break;
        default:
          element.classList.add('fhr-rating--' + rating)
          element.innerHTML = rating || 'N/A'
          break;
      }
      container.appendChild(element)
      this.updatePosition(restaurantId)
    }
  },
  updatePosition (restaurantId) {
    const element = document.querySelector('[data-fhr-restaurant-id=\"' + restaurantId + '\"]')
    const target = document.querySelector('[data-restaurant-id=\"' + restaurantId + '\"]')
    const offset = document.documentElement.scrollTop
    if (element && target) {
      let frame = target.getBoundingClientRect()
      element.style.display = 'block'
      element.style.top = (frame.y + offset) + 'px'
      element.style.left = (frame.x + frame.width - 32) + 'px'
    } else if (element) {
      element.style.display = 'none'
    }
  },
  updatePositionAll () {
    const items = document.querySelectorAll('[data-fhr-restaurant-id]')
    items.forEach(element => {
      this.updatePosition(element.dataset.fhrRestaurantId)
    })
  }
}
