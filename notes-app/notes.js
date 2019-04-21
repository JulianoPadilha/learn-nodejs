const fs = require('fs');

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(note => {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);  
    console.log('New note added!');
  } else {
    console.log('Note title taken!');
  }
}

const removeNote = title => {
  const notes = loadNotes();

  const notesToKepp = notes.filter(note => {
    return note.title !== title;
  });

  if(notesToKepp.length > 0) {
    saveNotes(notesToKepp);  
  }
}

const listNotes = () => {
  const notes = loadNotes();

  notes.map(note => {
    console.log(note.title);
  });
}

const readNotes = title => {
    const notes = loadNotes();

    const note = notes.find(note => {
      return note.title === title;
    });

    if(!note) {
      console.log('No notes found!');
    } else {
      console.log(note.title);
      console.log(note.body);
    }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
}