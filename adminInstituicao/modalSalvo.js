const modal = document.querySelector('.modal-container')

function openModalSalvo() {
  modal.classList.add('active')
}

function closeModalSalvo() {
  modal.classList.remove('active')
  location.reload()
}