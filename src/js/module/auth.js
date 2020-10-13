import firebase from 'firebase/app'
import 'firebase/auth'
import {RenderModal} from './RenderModal'
import {addGoodsForm} from './addGoodsForm'

// авторизация
export const authModalShow = () => {
  const authButton = document.getElementById('authButton')
  const authClose = document.getElementById('auth-modal-close')
  const modalWrapper = document.querySelector('.auth-modal-wrapper')
  const authForm = document.getElementById('auth-form')

  const toggleModal = () => modalWrapper.classList.toggle('open')

  const authEmailAndPassword = async e => {
    e.preventDefault()
    try {
      const authEmail = document.getElementById('auth-email').value
      const authPassword = document.getElementById('auth-password').value

      const result = await firebase.auth().signInWithEmailAndPassword(authEmail, authPassword)

      document.querySelector('.auth-modal-title').textContent += result.user.email
      document.body.insertAdjacentHTML('beforeend', RenderModal.renderModalEddGoods())
      addGoodsForm()
    } catch (err) {
      const {code, message} = err
      if (code === 'auth/wrong-password') {
        alert('Wrong password.')
      }
      console.error('Error message', message)
      console.error(err)
    }

  }

  authButton.addEventListener('click', toggleModal)
  authClose.addEventListener('click', toggleModal)
  authForm.addEventListener('submit', authEmailAndPassword)

}
