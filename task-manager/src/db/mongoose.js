const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    } 
  },  
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password must not be iqual to password');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
});

// const me = new User({
//   name: 'Juliano   ',
//   email: 'ME@test.com',
//   password: 'juliano1992  '
// });

// me.save().then(me => {
//   console.log(me);
// }).catch(error => {
//   console.log(error);
// });

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

const task = new Tasks({
  description: 'This is a new task',
  completed: true
});

task.save().then(task => {
  console.log(task);
}).catch(error => {
  console.log(error);
});