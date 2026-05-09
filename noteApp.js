let noteTitle = document.getElementById('floatingInputGroup1');
let noteContent = document.getElementById('floatingTextarea2');
let noteCount = document.getElementById('note-count');
card_ihtml = "";

// always show the cards that are in local storage when the page is loaded
let notes = JSON.parse(localStorage.getItem('notes')) || [];
notes.forEach((note, i) => {
    card_ihtml += `
        <div class="card " style="width: 100%; ">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <div style="display: flex; gap: 5px; position: relative; bottom: 0;left:0; height: 3vw; width: 100%; justify-content: end;">
                <button title="Edit Note" class="btn btn-primary" onclick="editNote(${i})">edit</button>
                <button title="Remove Note" class="btn btn-primary" onclick="removeNote(${i})">remove</button>
                </div>
            </div>
        </div>
        `;
});
document.getElementById('note-card').innerHTML = card_ihtml;
noteCount.innerText = notes.length;


// add notes
const addToCard = () => {
    if (noteTitle.value === "") {
        alert("Please enter a title for your note!");
        return;
    }
    // store notes in local storage
    let note = {
        title: noteTitle.value,
        content: noteContent.value
    };
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    // add to card
    card_ihtml = "";
    notes.forEach((note, i) => {
        card_ihtml += `
        <div class="card " style="width: 100%; height:auto">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <div style="display: flex; gap: 5px; position: relative; bottom: 0;left:0; height: 3vw; width: 100%; justify-content: end;">
                <button title="Edit Note" class="btn btn-primary" onclick="editNote(${i})">edit</button>
                <button title="Remove Note" class="btn btn-primary" onclick="removeNote(${i})">remove</button>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById('note-card').innerHTML = card_ihtml;
    noteCount.innerText = notes.length;
    // clear the input fields
    noteTitle.value = "";
    noteContent.value = "";
};




//remove notes
const removeNote = (index) => {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    // update the card
    card_ihtml = "";
    notes.forEach((note, i) => {
        card_ihtml += `
        <div class="card " style="width: 100%; ">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <div style="display: flex; gap: 5px; position: relative; bottom: 0;left:0; height: 3vw; width: 100%; justify-content: end;">
                <button title="Edit Note" class="btn btn-primary" onclick="editNote(${i})">edit</button>
                <button title="Remove Note" class="btn btn-primary" onclick="removeNote(${i})">remove</button>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById('note-card').innerHTML = card_ihtml;
    noteCount.innerText = notes.length;
}

// edit notes
const editNote = (index) => {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let note = notes[index];
    let newNote = prompt("New Title: ", note.title);
    let newContent = prompt("New Content: ", note.content);
    // delete the old note
    delete note.title;
    delete note.content;
    //update the note with the new title and content
    note.title = newNote;
    note.content = newContent;
    //update the local storage
    localStorage.setItem('notes', JSON.stringify(notes));
    // add the updated notes to the card
    card_ihtml = "";
    notes.forEach((note, i) => {
        card_ihtml += `
        <div class="card " style="width: 100%; ">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <div style="display: flex; gap: 5px; position: relative; bottom: 0;left:0; height: 3vw; width: 100%; justify-content: end;">
                <button title="Edit Note" class="btn btn-primary" onclick="editNote(${i})">edit</button>
                <button title="Remove Note" class="btn btn-primary" onclick="removeNote(${i})">remove</button>
                </div>
            </div>
        </div>
        `;
    });
    document.getElementById('note-card').innerHTML = card_ihtml;
    noteCount.innerText = notes.length;
}
