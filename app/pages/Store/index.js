import Page from 'components/Page'

export default class extends Page {
  constructor () {
    super({
      classes: {
        active: 'store--active'
      },
      element: '.store',
      elements: {
        wrapper: '.store__content',
        wrapperX: '.store__items__row__wrapper'
      }
    })
  }

  /**
   * Animations.
   */
  async show (url) {
    this.element.classList.add(this.classes.active)

    return super.show(url)
  }

  async hide (url) {
    this.element.classList.remove(this.classes.active)

    return super.hide(url)
  }
}

// TODO: Find why the scroll current is passing 0 on the pages.
// TODO: PS: It passes the right value at about page.
