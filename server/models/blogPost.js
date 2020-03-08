const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: String, 
  author: String,
  url: String, 
  likes: Number
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