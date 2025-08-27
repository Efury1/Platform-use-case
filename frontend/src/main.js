// src/main.js
import './styles/main.scss'

// (optional) tiny behavior example:
document.querySelectorAll('.tabs .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.tabs .is-active')?.classList.remove('is-active')
    btn.classList.add('is-active')
  })
})


let ticketSelectorButton = document.getElementById("ticketButton");

ticketSelectorButton.addEventListener("click", () => {
  alert("Button clicked");
});