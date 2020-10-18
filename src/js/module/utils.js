export const sliceEmail = email => {
  return email.replace(/@.+/, '')
}

export const authDisplayName = name => {
  document.getElementById('auth-user').textContent = name
}

export const renderInDocument = el => {
  document.body.insertAdjacentHTML('beforeend', el)
}

export const destroyEl = ($el, ...arrEl) => {
  $el.remove()
  if (arrEl) {
    for (let i = 0; i < arrEl.length; i++) {
      arrEl[i].remove()
    }
  }
}
