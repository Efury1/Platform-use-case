// src/main.js
import './main.scss'
import './abstracts/_variables.scss'

// Tags for notes
const TAGS = [ 
  "Think About Later",
  "Keep Long-Term",
  "Temporary/Delete WHen Done",
  "References",
  "Tried and Failed",
  "Found/Discovered",
  "Parking Lot"
]


// -----------------------------
// Tabs
// -----------------------------
document.querySelectorAll('.tabs .tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.tabs .is-active')?.classList.remove('is-active')
    btn.classList.add('is-active')
  })
})

// -----------------------------
// DOM Elements
// -----------------------------
const ticketSelectorButton = document.getElementById("ticketButton");
const addButtonSelector = document.getElementById("addTicket");
const ticketSelectorInput = document.getElementsByClassName("ticket-input")[0];
const ticketList = document.getElementById("ticket-item"); // UL
const editorRoot = document.getElementById("editorRoot"); // Notepad section
const emptyState = document.getElementById("emptyState");

// -----------------------------
// Helpers
// -----------------------------
function createTicketElement(ticketValue) {
  const li = document.createElement("li");
  li.className = "tickets__item"; 
  li.setAttribute("role", "option"); 

  // Ticket main button
  const ticketButtonItem = document.createElement("button");
  ticketButtonItem.className = "tickets__btn";
  ticketButtonItem.textContent = ticketValue;

  // When clicked → open notepad for that ticket
  ticketButtonItem.addEventListener("click", () => {
    openNotepad(ticketValue);
  });

  // Delete Button
  const delBtn = document.createElement("button");
  delBtn.className = "tickets__delete";
  delBtn.type = "button";
  delBtn.setAttribute("aria-label", `Delete ticket ${ticketValue}`);
  delBtn.innerHTML = "&#x2715;"; // ×

  delBtn.addEventListener("click", () => {
    li.remove();
    // clear notepad if the deleted ticket was open
    if (editorRoot.dataset.activeTicket === ticketValue) {
      editorRoot.innerHTML = "<p class='empty'>No ticket selected</p>";
      delete editorRoot.dataset.activeTicket;
    }
  });

  // Assemble
  li.appendChild(ticketButtonItem);
  li.appendChild(delBtn);

  return li;
}

// Have save for notepad notes

function openNotepad(ticketValue) {
  editorRoot.dataset.activeTicket = ticketValue;
  editorRoot.innerHTML = `
    <h2>Notes for: ${ticketValue}</h2>
    <div class="tags-list">
      ${TAGS.map(tag => `<span class="tag-chip">${tag}</span>`).join("")}
    </div>
    <textarea class="editor-textarea" placeholder="Write your notes here..."></textarea>
  `;
}

// -----------------------------
// Event Listeners
// -----------------------------
ticketSelectorButton.addEventListener("click", () => {
  ticketSelectorInput.focus();
});

addButtonSelector.addEventListener("click", () => {
  const ticketValue = ticketSelectorInput.value.trim();
  if (!ticketValue) {
    console.log("No value");
    return;
  }

  // Create + append
  const li = createTicketElement(ticketValue);
  ticketList.appendChild(li);

  // Clear input
  ticketSelectorInput.value = "";

  //Hide/remomve empty state when first ticket is added
  if (emptyState) {
    emptyState.remove();
  }
});
