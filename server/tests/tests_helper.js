const BlogPost = require('../models/blogPost');

const initialPosts = [
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    url: 'https://www.goodreads.com/book/show/170448.Animal_Farm',
    likes: 50702
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    url: 'https://www.goodreads.com/book/show/40097951-the-silent-patient',
    likes: 31416
  }
]

const getAllPostsFromDB = async () => {
  const documents = await BlogPost.find({});
  return documents.map(doc => doc.toJSON());
};

module.exports = {
  initialPosts, getAllPostsFromDB
}