const mongoose = require('mongoose');
const TokenData = new mongoose.Schema({
  Token: {
    type: String,
    required: true,
  },
});

mongoose.model('TokenData', TokenData);
