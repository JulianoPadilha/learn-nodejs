const validator = require('validator');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
});

yargs.command({
  command: 'list',
  describe: 'List a note!',
  handler() {
    notes.listNotes();
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a note!',
  builder: {
    title: {
      describe: 'Read title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNotes(argv.title);
  }
});

yargs.parse();


