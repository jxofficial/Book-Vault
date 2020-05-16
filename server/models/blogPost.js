const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: String, 
  author: String,
  url: String, 
  likes: Number, 
  description: String,
  bookImageUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // references documents from the user collection
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

blogPostSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

module.exports = BlogPost; 