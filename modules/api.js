export default {
  getFoodHygieneRating (id) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://hygieneratingscdn.je-apis.com/api/uk/restaurants/' + id, true)
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response).rating)
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          })
        }
      }
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        })
      }
      xhr.send()
    })
  }
}
