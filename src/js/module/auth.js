import firebase from 'firebase/app'
import 'firebase/auth'
import {RenderModal} from './RenderModal'
import {addGoodsForm} from './addGoodsForm'
import {authDisplayName, destroyEl, renderInDocument, sliceEmail} from './utils'

// авторизация
export const authModalShow = () => {

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const {email} = user
        authDisplayName(sliceEmail(email))
        modalAdmin(sliceEmail(email))
        const mAuth = document.getElementById('modal-auth')
        mAuth && destroyEl(mAuth)
        console.log('вошел')
      } else {
        authDisplayName('anonymous')
        const mAuth = document.getElementById('modal-auth')
        mAuth && setTimeout(destroyEl(mAuth), 2000)
        modalAuth()
        console.log('вышел')
      }
    })
  }

  const toggleModal = modalWrapper => modalWrapper.classList.toggle('open')

  const modalAuth = () => {
    renderInDocument(RenderModal.renderAutModal(null))
    const authButton = document.getElementById('authButton')
    const authClose = document.getElementById('modal-auth-close')
    const modalWrapper = document.querySelector('#modal-auth > .auth-modal-wrapper')
    const authForm = document.getElementById('auth-form')

    authForm.addEventListener('submit', authEmailAndPassword)
    authButton.addEventListener('click', toggleModal.bind(this, modalWrapper))
    authClose.addEventListener('click', toggleModal.bind(this, modalWrapper))

  }


  const modalAdmin = email => {
    renderInDocument(RenderModal.renderAutModal(email))
    const authButton = document.getElementById('authButton')
    const authClose = document.getElementById('modal-admin-close')
    const modalWrapper = document.querySelector('#modal-admin > .auth-modal-wrapper')
    const logOutButton = document.getElementById('log-out')
    const addedGoods = document.getElementById('added-goods')

    addedGoods.addEventListener('click', () => {
      renderInDocument(RenderModal.renderModalEddGoods())
      addGoodsForm()
      toggleModal(modalWrapper)
    })
    logOutButton.addEventListener('click', logOut)
    authButton.addEventListener('click', toggleModal.bind(this, modalWrapper))
    authClose.addEventListener('click', toggleModal.bind(this, modalWrapper))

  }

  const authEmailAndPassword = async e => {
    e.preventDefault()
    try {
      const authEmail = document.getElementById('auth-email').value
      const authPassword = document.getElementById('auth-password').value

      const result = await firebase.auth().signInWithEmailAndPassword(authEmail, authPassword)

      document.querySelector('.auth-modal-title')
        .textContent = `Добро пожаловать! ${sliceEmail(result.user.email)}`
      renderInDocument(RenderModal.renderModalEddGoods())
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

  const logOut = async () => {
    try {
      await firebase.auth().signOut()
      destroyEl(document.getElementById('modal-admin'))
    } catch (error) {
      throw new Error(error)
    }
  }

  window.addEventListener('DOMContentLoaded', authListener)

}
