// src/main.js
import './main.scss' 

// TODO Build out Knowledge tab
document.querySelectorAll('.tabs .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.tabs .is-active')?.classList.remove('is-active')
    btn.classList.add('is-active')
  })
})


let ticketSelectorButton = document.getElementById("ticketButton");

ticketSelectorButton.addEventListener("click", () => {
  document.getElementsByClassName('ticket-input')[0].focus();
});

let addButtonSelector = document.getElementById("addTicket");
let ticketSelectorInput = document.getElementsByClassName('ticket-input')[0];

addButtonSelector.addEventListener("click", () => {
  if (ticketSelectorInput.value) {
    console.log("has value");
  }
  else{
    console.log("No value");
  }
});
// Add Event listen to the +
// If input has a value
// then add ticket number underneath 
// else have red focus color with error message

