import * as firebase from 'firebase';

export const authModalShow = () => {
  const authButton = document.getElementById('authButton')
  const authClose = document.getElementById('auth-modal-close')
  const modalWrapper = document.querySelector('.auth-modal-wrapper')

  const toggleModal = async () => {
    modalWrapper.classList.toggle('open')
  }

  authButton.addEventListener('click', toggleModal)
  authClose.addEventListener('click', toggleModal)

  const authForm = document.getElementById('auth-form')

  authForm.addEventListener('submit', e => {
    e.preventDefault()
    const authEmail = document.getElementById('auth-email').value
    const authPassword = document.getElementById('auth-password').value

    firebase.auth().signInWithEmailAndPassword(authEmail, authPassword)
      .then(result => {
        document.querySelector('.auth-modal-title').textContent += result.user.email
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
        }
        console.error('Error message', errorMessage)
        console.error(error)

      });
  })

}
