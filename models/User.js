const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.methods.comparePassword = function (candidatePassword) {
//   const user = this;
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }
//       if (!isMatch) {
//         return reject(err);
//       }
//       resolve(true);
//     });
//   });
// };
mongoose.model('User', userSchema);
