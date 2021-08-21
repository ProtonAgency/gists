class Loader {
  $loader
  $app

  constructor() {
    this.$loader = document.querySelector('#loader')
    this.$app = document.querySelector('#app')

    this.init()
  }

  init() {
    window.addEventListener('load', this.show.bind(this))
    window.addEventListener('unload', this.hide.bind(this))

    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('a').forEach(el => {
        el.addEventListener('click', this.hide.bind(this))
      })
    })
  }

  show() {
    this.$loader.style.display = 'none'
    this.$app.style.display = 'block'
  }

  hide() {
    this.$loader.style.display = 'block'
    this.$app.style.display = 'none'
  }
}
