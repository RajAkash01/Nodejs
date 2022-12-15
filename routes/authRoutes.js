const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
  console.log(req.body);

  //   const { email, password } = req.body;
  //   res.send('hello');
  //   const user = new User({ email, password });
  //   user.save();
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.send('posted successfully');
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
  try {
    User.find({ email: email }, function (error, data) {
      if (error) {
        console.log(error);
      } else {
        if (data[0].password === password) {
          console.log('Success');
          res.send('Logged in successfully');
        } else {
          console.log('Failed');
          res.send('Failed to signin');
        }
      }
    });
  } catch (err) {
    return res.status(422).send({ error: 'must provide email or password' });
  }
});

module.exports = router;
