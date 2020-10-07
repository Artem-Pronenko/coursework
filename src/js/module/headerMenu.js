export const menu = () => {
  const menuButton = document.getElementById('menu-button')
  const menu = document.getElementById('menu')

  const toggleMenu = () => menu.classList.toggle('show-menu')

  menuButton.addEventListener('click', toggleMenu)
  menu.addEventListener('mouseleave', toggleMenu)
}
