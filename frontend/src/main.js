// ----------------------------------------------------------------------------------
// High-level overview
// ----------------------------------------------------------------------------------
// This file powers a tiny ticket → notes app, where each ticket has its own notepad.
// Data is stored in localStorage under two key patterns:
// - ticket:<ticketLabel> (stores the label itself so tickets persist)
// - note:<ticketLabel> (stores an array of note objects for that ticket)
//
// Notes are stored as an array of objects: { text: string, ts: string }
// - text: the saved note body
// - ts: a timestamp string (from nowStamp()) for when it was saved
//
// The UI has 3 main pieces:
// 1) Ticket list on the left (each ticket is a button + delete icon)
// 2) Editor area (textarea + Save button + tag chips)
// 3) Saved-notes list (renders all saved notes for the active ticket)
//
// Accessibility & UX touches:
// - ARIA labels on buttons
// - aria-live regions for save status + saved notes area
// - prevents duplicate tickets (case-insensitive)
// - keeps newest saved notes at the top
// ----------------------------------------------------------------------------------


import "./main.scss";
import "./abstracts/_variables.scss";
import "./components/_tickets.scss"

/**
 * -------------------------------------------------------
 * Ticket Notes
 * -------------------------------------------------------
 */

// -----------------------------
// Constants
// -----------------------------
const TAGS = [
  "Think About Later",
  "Keep Long-Term",
  "Temporary/Delete When Done",
  "References",
  "Tried and Failed",
  "Found/Discovered",
  "Parking Lot",
];

const SELECTORS = {
  tabs: ".tabs .tab",
  activeTab: ".tabs .is-active",
  ticketBtn: "#ticketButton",
  addTicketBtn: "#addTicket",
  ticketInput: ".ticket-input",
  ticketList: "#ticket-item", // <ul>
  editorRoot: "#editorRoot", // notepad section
  emptyState: "#emptyState",
};

// -----------------------------
// Utils
// -----------------------------

/** Build a stable storage key for a given ticket id */
const storageKey = (ticket) => `note:${ticket}`;

// normalise text meaning the process of transforming text into a single canonical form that didn't exist before
/* 
* Accepts raw data pulled from localStorgae,  which may be
* undefined/null
* array<string> (the previous shape)
* array<{text? string, ts: string}>
*/
function normalizeNotes(raw) {
  if (!raw) return [];

  // Already an array? normalize each item into {text, ts}
  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (typeof item === "string") return { text: item, timestamp: "" };
      if (item && typeof item === "object") {
        return {
          text: String(item.text ?? ""),
          timestamp: String(item.timestamp ?? ""),
        };
      }
      return { text: "", timestamp: "" };
    });
  }

  // anything else -> empty
  return [];
}

/** Save note text for a ticket. Returns boolean for UX feedback. */
function saveNote(ticket, text) {
  try {
    // Load existing notes for this ticket 
    const existing = localStorage.getItem(storageKey(ticket));
    const savedNotes = normalizeNotes(existing ? JSON.parse(existing) : []);

    const noteObject = { text: String(text || "").trim(), ts: nowStamp()};
    if (!noteObject.text) return false; // we don't want to store empties

    // Newest at top
    savedNotes.unshift(noteObject);

    //save it back
    localStorage.setItem(storageKey(ticket), JSON.stringify(savedNotes));
    return true;
  } catch (error) {
    console.error("Failed to save note", error);
    return false;
  }
}

/** Load note text for a ticket (or empty string) */
function loadNote(ticket) {
  try {
    const existing = localStorage.getItem(storageKey(ticket));
    return normalizeNotes(existing ? JSON.parse(existing) : []);
  } catch (error) {
    console.error("Failed to load note", error);
    return [];
  }
}

/** timestamp string */
function nowStamp() {
  try {
    return new Date().toLocaleString();
  } catch {
    return "";
  }
}

/** Guard: trim & collapse whitespace */
function cleanTicketValue(raw) {
  return (raw || "").trim().replace(/\s+/g, " ");
}

/** Prevent duplicate ticket labels (case-insensitive) */
function ticketExists(listEl, value) {
  // normalize the incoming ticket label to lowercase
  const norm = value.toLowerCase();

  // grab all the button elements inside the list, each ticket has a .tickets__btn
  return Array.from(listEl.querySelectorAll(".tickets__btn")).some(
    // for each button compare its text
    (btn) => btn.textContent.trim().toLowerCase() === norm
  );
}

// -----------------------------
// Tabs (simple active-state toggle)
// -----------------------------
document.querySelectorAll(SELECTORS.tabs).forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(SELECTORS.activeTab)?.classList.remove("is-active");
    btn.classList.add("is-active");
  });
});

// -----------------------------
// DOM Elements
// -----------------------------
const ticketSelectorButton = document.querySelector(SELECTORS.ticketBtn);
const addTicketButton = document.querySelector(SELECTORS.addTicketBtn);
const ticketInput = document.querySelector(SELECTORS.ticketInput);
const ticketList = document.querySelector(SELECTORS.ticketList);
const editorRoot = document.querySelector(SELECTORS.editorRoot);
const emptyState = document.querySelector(SELECTORS.emptyState);

// -----------------------------
// Ticket Item Factory
// -----------------------------
function createTicketElement(ticketValue) {
  const li = document.createElement("li");
  li.className = "tickets__item";
  li.setAttribute("role", "option");

  // Container around ticket _ delete button
  const wrapper = document.createElement("div");
  wrapper.className = "tickets__controls";

  // Ticket main button
  const ticketButtonItem = document.createElement("button");
  ticketButtonItem.className = "tickets__btn";
  ticketButtonItem.type = "button";
  ticketButtonItem.textContent = ticketValue;
  ticketButtonItem.setAttribute("aria-label", `Open notes for ${ticketValue}`);

  ticketButtonItem.addEventListener("click", () => openNotepad(ticketValue));

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.className = "tickets__delete";
  delBtn.type = "button";
  delBtn.setAttribute("aria-label", `Delete ticket ${ticketValue}`);
  delBtn.innerHTML = "&#x2715;"; // ×

  delBtn.addEventListener("click", () => {
    // If the ticket is currently open, clear editor
    if (editorRoot.dataset.activeTicket === ticketValue) {
      editorRoot.innerHTML = `<p class="empty">No ticket selected</p>`;
      delete editorRoot.dataset.activeTicket;
    }
    li.remove();
  });

    // Put both buttons inside a wrapper
  wrapper.appendChild(ticketButtonItem);
  wrapper.appendChild(delBtn);


  li.appendChild(wrapper);
  return li;
}

//------------------------------
// Render Saved Ticker
//-----------------------------
function renderSavedNotes(container, notes) {
if (!notes.length) {
container.innerHTML = `
<h3 class="saved-note__title">Saved notes</h3>
<div class="saved-note__meta">No saved note yet</div>
`;
return;
}


const list = notes
.map(
(n, i) => `
<article class="saved-note__item" data-index="${i}">
<div class="saved-note__meta">${n.ts || "Unknown time"}</div>
<pre class="saved-note__content">${n.text}</pre>
</article>`
)
.join("");


container.innerHTML = `
<h3 class="saved-note__title">Saved notes</h3>
<div class="saved-note__list" role="list">
${list}
</div>
`;
}

// -----------------------------
// Notepad (per ticket)
// -----------------------------
function openNotepad(ticketValue) {
  editorRoot.dataset.activeTicket = ticketValue;

  // Load existing note
  const existing = loadNote(ticketValue);

  // Render editor UI
  editorRoot.innerHTML = `
    <h2 class="editor-title">Notes for: <span class="ticket-label">${ticketValue}</span></h2>

    <div class="tags-list" role="listbox" aria-label="Quick tags">
      ${TAGS.map(
        (tag) =>
          `<button type="button" class="tag-chip" role="option" aria-label="Insert tag ${tag}">#${tag}</button>`
      ).join("")}
    </div>

    <label class="sr-only" for="note-editor">Note content</label>
    <textarea id="note-editor" class="editor-textarea" placeholder="Write your notes here..." spellcheck="true"></textarea>

    <div class="note-actions">
      <button type="button" class="saveBtn">Save</button>
      <span class="save-status" aria-live="polite" aria-atomic="true"></span>
    </div>

    <section class="saved-note" aria-live="polite">
      <h3 class="saved-note__title">Saved note</h3>
      <div class="saved-note__meta"></div>
      <pre class="saved-note__content"></pre>
    </section>
  `;

  // Grabs
  const textarea = editorRoot.querySelector(".editor-textarea");
  const saveBtn = editorRoot.querySelector(".saveBtn");
  const status = editorRoot.querySelector(".save-status");
  const savedContainer = editorRoot.querySelector(".saved-note");
  // const previewMeta = editorRoot.querySelector(".saved-note__meta");
  // const previewContent = editorRoot.querySelector(".saved-note__content");

  // Init
  renderSavedNotes(savedContainer, existing);
  // textarea.value = existing;
  // previewContent.textContent = existing;
  // previewMeta.textContent = existing ? `Last loaded ${nowStamp()}` : "No saved note yet"; // nowStamp gives us current timestamp

  // Insert tag on click
  editorRoot.querySelectorAll(".tag-chip").forEach((tagBtn) => {
    tagBtn.addEventListener("click", () => {
      const tag = tagBtn.textContent?.trim() || "";
      const needsSpace = textarea.value && !/\s$/.test(textarea.value);
      textarea.value += `${needsSpace ? " " : ""}${tag}`;
      textarea.focus();
    });
  });

  // Save handler
  function doSave() {
    const ok = saveNote(ticketValue, textarea.value);
    status.textContent = ok ? "Saved" : "Save failed";
    if (ok) { 
      textarea.value = ""; // clear editor after save
      const updated = loadNote(ticketValue);
      renderSavedNotes(savedContainer, updated);
      // previewContent.textContent = textarea.value;
      // previewMeta.textContent = `Last saved ${nowStamp()}`;
    }
    setTimeout(() => (status.textContent = ""), 1600);
  }

  // Click to save
  saveBtn.addEventListener("click", doSave);

}

// Tickets as a whole need to be saved 
// And the notes inside them need to be linked to them
// Set multiple to multiple dimension array
// conver the array to a string before assigning
// Can use JSON stringify
// -----------------------------
// Events — Add tickets & focus
// -----------------------------
ticketSelectorButton?.addEventListener("click", () => {
  ticketInput?.focus();
});
  
const storageKeyForTicket = (ticketValue) => `ticket:${ticketValue}`;
function addTicketFromInput() {
  const ticketValue = cleanTicketValue(ticketInput?.value);
  if (!ticketValue) return;

  if (ticketExists(ticketList, ticketValue)) {
    // Soft nudge if duplicate
    ticketInput?.setAttribute("aria-invalid", "true");
    ticketInput?.setAttribute("title", "Ticket already exists");
    return;
  }

  const li = createTicketElement(ticketValue);
  ticketList.appendChild(li);

  // Clear input + a11y reset
  if (ticketInput) {
    ticketInput.value = "";
    ticketInput.removeAttribute("aria-invalid");
    ticketInput.removeAttribute("title");
  }

  // Remove empty state on first ticket
  if (emptyState) emptyState.remove();
  

  localStorage.setItem(storageKeyForTicket(ticketValue), ticketValue);
  // Open editor immediately for faster flow
  openNotepad(ticketValue);
}

// Click to add
addTicketButton?.addEventListener("click", addTicketFromInput);


