const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const BlogPost = require('../models/blogPost');
const User = require('../models/user');
const helper = require('./tests_helper');
const jwt = require('jsonwebtoken');

const api = supertest(app);

beforeEach(async () => {
  await BlogPost.deleteMany({});
  const postDocuments = helper.initialPosts.map(post => new BlogPost(post));
  const blogPostsPromises = postDocuments.map(post => post.save());
  const savedBlogPostDocuments = await Promise.all(blogPostsPromises)

  await User.deleteMany({});
  const userDocuments = helper.initialUsers.map(user => new User(user));
  const usersPromises = userDocuments.map(user => user.save());
  const savedUserDocuments = await Promise.all(usersPromises)

  await helper.referenceBlogPostsAndUsers(savedBlogPostDocuments, savedUserDocuments);
});

test('get request returns all posts', async () => {
  const result = await api
    .get('/api/blogposts')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(result.body).toHaveLength(helper.initialPosts.length);
});

describe('post request', () => {
  test('adds post correctly with status 201 when user is authenticated', async () => {
    const users = await helper.getAllUsersFromDB({});
    const userToBeLoggedIn = users[0];
    const token = await helper.loginAndGetToken(userToBeLoggedIn);

    const postToAdd = new BlogPost({
      title: 'The Killing Kind',
      author: 'Chris Holm',
      url: 'https://www.goodreads.com/book/show/24396847-the-killing-kind',
      likes: 1317,
      user: userToBeLoggedIn
    });

    await api
      .post('/api/blog')
      .set('Authorization', `Bearer ${token}`)
      .send(postToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const updatedPosts = await helper.getAllPostsFromDB();
    const titles = updatedPosts.map(post => post.title);
    expect(updatedPosts).toHaveLength(helper.initialPosts.length + 1);
    expect(titles).toContain(postToAdd.title);
  });

  test('returns 401 status code when token does not exist', async () => {
    const users = await helper.getAllUsersFromDB({});
    const userToBeLoggedIn = users[0];
    const token = '';

    const postToAdd = new BlogPost({
      title: 'The Killing Kind',
      author: 'Chris Holm',
      url: 'https://www.goodreads.com/book/show/24396847-the-killing-kind',
      likes: 1317,
      user: userToBeLoggedIn
    });

    const result = await api
      .post('/api/blog')
      .set('Authorization', token)
      .send(postToAdd)
      .expect(401)

    expect(result.body.error).toBe('Token missing');
  });
});

describe('delete request', () => {
  test('returns 204 status code for delete request with proper authorization', async () => {
    const users = await helper.getAllUsersFromDB({});
    const userToBeLoggedIn = users[0];
    const token = await helper.loginAndGetToken(userToBeLoggedIn);

    const posts = await helper.getAllPostsFromDB();
    const postToBeDeleted = posts[0];

    await api
      .delete(`/api/blogposts/${postToBeDeleted.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const updatedPosts = await helper.getAllPostsFromDB();
    const titlesOfUpdatedPosts = updatedPosts.map(post => post.title);

    expect(updatedPosts).toHaveLength(helper.initialPosts.length - 1);
    expect(titlesOfUpdatedPosts).not.toContain(postToBeDeleted.title);
  });

  test('returns 401 status code when token is missing', async () => {
    const token = '';

    const posts = await helper.getAllPostsFromDB();
    const postToBeDeleted = posts[0];

    const result = await api
      .delete(`/api/blogposts/${postToBeDeleted.id}`)
      .set('Authorization', token)
      .expect(401);

    expect(result.body.error).toBe('Token missing');
  });
})


test('successful update of likes returns 200 status code', async () => {
  const posts = await helper.getAllPostsFromDB();
  const postToBeUpdated = posts[0];
  const NEW_LIKES = 999999;

  const updatedPost = { ...postToBeUpdated, likes: NEW_LIKES }

  await api
    .put(`/api/blogposts/${postToBeUpdated.id}`)
    .send(updatedPost)
    .expect(200);

  const updatedPostsFromDB = await helper.getAllPostsFromDB();
  const updatedLikesOfPost = updatedPostsFromDB.map(post => post.likes)[0];
  expect(updatedLikesOfPost).toBe(NEW_LIKES);
});


afterAll(() => mongoose.connection.close());