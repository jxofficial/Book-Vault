const BlogPost = require('../models/blogPost');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const PASSWORD_1 = 'afleckonfleek';
const PASSWORD_2 = 'jazzminion';
let PASSWORD_HASH_1;
let PASSWORD_HASH_2;

(async () => {
  PASSWORD_HASH_1 = await bcrypt.hash(PASSWORD_1, SALT_ROUNDS);
  PASSWORD_HASH_2 = await bcrypt.hash(PASSWORD_2, SALT_ROUNDS);
})();

const loginAndGetToken = async user => {
  const userToBeLoggedIn = {
    username: user.username,
    id: user.id
  };
  const token = await jwt.sign(userToBeLoggedIn, process.env.TOKEN_PRIVATE_KEY);
  return token;
};

const referenceBlogPostsAndUsers = async (posts, users) => {
  const MAX_INDEX_FOR_USERS = users.length - 1;
  let i = 0;
  for (const post of posts) {
    if (i > MAX_INDEX_FOR_USERS) i = 0;
    const user = users[i];
    post.user = user._id;
    await post.save();

    user.blogPosts = user.blogPosts.concat(post._id);
    await user.save();

    i++;
  }
}

const initialPosts = [
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    url: 'https://www.goodreads.com/book/show/170448.Animal_Farm',
    likes: 50702,
    user: undefined
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    url: 'https://www.goodreads.com/book/show/40097951-the-silent-patient',
    likes: 31416,
    user: undefined
  }
]

const initialUsers = [
  {
    username: 'thisisadam',
    passwordHash: PASSWORD_HASH_1,
    name: 'Adam Aflek',
    blogPosts: []
  },
  {
    username: 'jasminetheflower',
    passwordHash: PASSWORD_HASH_2,
    name: 'Jasmine Koh',
    blogPosts: []
  }
]

const getAllPostsFromDB = async () => {
  const documents = await BlogPost.find({});
  return documents.map(doc => doc.toJSON());
};

const getAllUsersFromDB = async () => {
  const documents = await User.find({});
  return documents.map(doc => doc.toJSON());
};

module.exports = {
  initialPosts,
  initialUsers,
  referenceBlogPostsAndUsers,
  loginAndGetToken,
  getAllUsersFromDB,
  getAllPostsFromDB
}