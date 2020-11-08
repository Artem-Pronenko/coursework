import {getGoods} from './firebase'

export const search = (e, form) => {
  e.preventDefault()
  const input = form.querySelector('input')
  const button = form.querySelector('button')
  button.disabled = true
  const searchInputValue = input.value
  getGoods(searchInputValue.toLowerCase().split(' ').filter(i => i).join(' '))
    .then(() => {
      input.value = ''
      button.disabled = false
    })
}
