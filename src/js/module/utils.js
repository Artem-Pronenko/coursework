export const sliceEmail = email => {
  return email.replace(/@.+/, '')
}

export const authDisplayName = name => {
  document.getElementById('auth-user').textContent = name
}

export const renderInDocument = el => {
  document.body.insertAdjacentHTML('beforeend', el)
}

export const destroyEl = $el => $el.remove()
