export class Slider {
  constructor(
    {sliderClass, dotsWrapClass},
    {autoplay, startSlide} = false
  ) {
    // вывод ошибки если обвертка слайдера или обвертка для пагинации не была передана
    if (!sliderClass || !dotsWrapClass) throw Error('Parameters passed incorrectly')

    this.interval = 0
    this.slide = document.querySelectorAll(`.${sliderClass}`)
    this.dotsWrap = document.querySelector(`.${dotsWrapClass}`)
    this.currentSlide = startSlide - 1 || 0 // стартовый слайд
    this.autoplay = autoplay
    if (!autoplay) return
    this.autoplayInterval = autoplay.interval || 2000 // интервал смены слайдов

  }
  // добавление пагинации
  addDots() {
    for (let i = 0; i < this.slide.length; i++) {
      const dot = document.createElement('span')
      dot.classList.add('slider-dot', 'goods-slider__dot', 'c-p')
      this.dotsWrap.appendChild(dot)
      this.dots = document.querySelectorAll(`.goods-slider__dot`)
    }
  }
  // запуск слайдера
  start(_dot = true) {
    _dot && this.addDots() // *костыль

    this.nextSlide(this.slide, this.currentSlide)
    this.prevSlide(this.dots, this.currentSlide, 'slider-dot_active')
    if (!this.autoplay) return
    this.interval = setInterval(this._autoplay.bind(this), this.autoplayInterval)
  }

  stop() {
    clearInterval(this.interval)
  }

  prevSlide(slide, index, className = 'hide') {
    slide[index].classList.add(className)
  }

  nextSlide(slide, index, className = 'hide') {
    slide[index].classList.remove(className)
  }

  _autoplay() {
    this.prevSlide(this.slide, this.currentSlide)
    this.nextSlide(this.dots, this.currentSlide, 'slider-dot_active')
    this.currentSlide++
    if (this.currentSlide >= this.slide.length) this.currentSlide = 0
    this.nextSlide(this.slide, this.currentSlide)
    this.prevSlide(this.dots, this.currentSlide, 'slider-dot_active')
  }
  // переключения слайдов / пагинация
  dotTab({target}) {
    this.prevSlide(this.slide, this.currentSlide)
    this.nextSlide(this.dots, this.currentSlide, 'slider-dot_active')
    if (target.matches('.goods-slider__dot')) {
      this.dots.forEach((dot, index) => {
        if (dot === target) {
          this.currentSlide = index
          this.nextSlide(this.slide, this.currentSlide)
          this.prevSlide(this.dots, this.currentSlide, 'slider-dot_active')
        }
      })
    }
  }

  listener() {
    this.dotsWrap.addEventListener('click', this.dotTab.bind(this))
    this.dotsWrap.addEventListener('mouseover', this.stop.bind(this))
    this.dotsWrap.addEventListener('mouseout', this.start.bind(this, false))
  }

}

// слайдер в функциональном стиле
// export const slider = (autoplayInterval = 2000) => {
//   const slide = document.querySelectorAll('.goods-slide')
//   const dotsWrap = document.querySelector('.goods-slider__dots')
//   const dots = document.querySelectorAll('.goods-slider__dot')
//   let currentSlide = 0, interval
//
//   const start = () => interval = setInterval(autoplay, autoplayInterval)
//   const stop = () => clearInterval(interval)
//
//   const prevSlide = (slide, index, className = 'hide') => slide[index].classList.add(className)
//   const nextSlide = (slide, index, className = 'hide') => slide[index].classList.remove(className)
//
//   nextSlide(slide, currentSlide)
//   prevSlide(dots, currentSlide, 'slider-dot_active')
//
//   const autoplay = () => {
//     prevSlide(slide, currentSlide)
//     nextSlide(dots, currentSlide, 'slider-dot_active')
//     currentSlide++
//     if (currentSlide >= slide.length) currentSlide = 0
//     nextSlide(slide, currentSlide)
//     prevSlide(dots, currentSlide, 'slider-dot_active')
//   }
//
//   const dotTab = ({target}) => {
//     prevSlide(slide, currentSlide)
//     nextSlide(dots, currentSlide, 'slider-dot_active')
//     if (target.matches('.goods-slider__dot')) {
//       dots.forEach((dot, index) => {
//         if (dot === target) {
//           currentSlide = index
//           nextSlide(slide, currentSlide)
//           prevSlide(dots, currentSlide, 'slider-dot_active')
//         }
//       })
//     }
//   }
//
//   start()
//   dotsWrap.addEventListener('click', dotTab)
//   dotsWrap.addEventListener('mouseover', stop)
//   dotsWrap.addEventListener('mouseout', start)
//
// }