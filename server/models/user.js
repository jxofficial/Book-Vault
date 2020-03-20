const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String, 
  name: String, 
  blogPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost' // references documents from the blogpost collection
    }
  ]
});

userSchema.set('toJSON', {
  transform: (userDocument, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;