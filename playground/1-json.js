const fs = require('fs');
const yargs = require('yargs');

// const book = {
//   title: 'Fight Club',
//   author: 'Chuck'
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);

// console.log(data.title);

// CHALLENGE

yargs.command({
  command: 'refreshNote',
  describe: 'Atualiza name e age',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string'
    },
    age: {
      describe: 'Age',
      demandOption: true,
      type: 'number'
    }
  },
  handler(argv) {
    const dataBuffer = fs.readFileSync('1-json.json');
    const dataJSON = dataBuffer.toString();
    const user = JSON.parse(dataJSON);

    user.name = argv.name
    user.age = argv.age;

    const userJSON = JSON.stringify(user);
    fs.writeFileSync('1-json.json', userJSON);
  }
});

yargs.parse();
