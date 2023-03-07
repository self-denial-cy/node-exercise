const express = require('express');
const User = require('./db/model/user');

const app = express();

app.get('/api/user/add', (req, res) => {
  const user = new User({});
  user
    .save()
    .then((res) => {
      console.log(res);
      user.findPets((err, pets) => {
        if (err) return console.log(err);
        console.log(pets);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8091, () => {
  console.log('server running at http://127.0.0.1:8091');
});
