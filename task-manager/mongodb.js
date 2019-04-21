// CRUD - create, read, update and delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017'; 
const databaseName = 'task-manager';

const id = new ObjectID();

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }

  const db = client.db(databaseName);

  // db.collection('users').findOne({
  //   _id: new ObjectID('5cae5a79e1373ede975e9944')
  // }, (error, user) => {
  //   console.log(user);
  // });

  // db.collection('users').find({
  //   age: 26
  // }).toArray((error, users) => {
  //   console.log(users);
  // });

  // db.collection('users').find({
  //   age: 26
  // }).count((error, count) => {
  //   console.log(count);
  // });

  // db.collection('tasks').findOne({
  //   _id: new ObjectID('5cafcd72de3d3ff495785d5c')
  // }, (error, task) => {
  //   console.log(task);
  // });

  // db.collection('tasks').find().toArray((error, tasks) => {
  //   console.log(tasks);
  // });

  // db.collection('users').updateOne({
  //   _id: new ObjectID('5cafcbabd1ffa7f481a0dfe9'),
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });
  
  // db.collection('tasks').updateMany ({
  //   completed: true
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  // db.collection('users').deleteMany({
  //   age: 26
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // })

  db.collection('tasks').deleteOne({
    _id: new ObjectID('5cafcd72de3d3ff495785d5c')
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  })
});

