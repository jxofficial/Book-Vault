const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const BlogPost = require('../models/blogPost');
const helper = require('./tests_helper');


const api = supertest(app);

beforeEach(async () => {
  await BlogPost.deleteMany({});

  const postDocuments = helper.initialPosts.map(post => new BlogPost(post));
  const promiseArr = postDocuments.map(doc => doc.save());
  await Promise.all(promiseArr);
});

test('get request returns all posts', async () => {
  const result = await api
    .get('/api/blogposts')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(result.body).toHaveLength(helper.initialPosts.length);
});

test('post request adds correct post with status 201', async () => {
  const postToAdd = new BlogPost({
    title: 'The Killing Kind',
    author: 'Chris Holm',
    url: 'https://www.goodreads.com/book/show/24396847-the-killing-kind',
    likes: 1317
  });

  await api
    .post('/api/blog')
    .send(postToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const updatedPosts = await helper.getAllPostsFromDB();
  const titles = updatedPosts.map(post => post.title);
  expect(updatedPosts).toHaveLength(helper.initialPosts.length + 1);
  expect(titles).toContain(postToAdd.title);
});

test('returns 204 status code for successful delete request', async () => {
  const posts = await helper.getAllPostsFromDB();
  const postToBeDeleted = posts[0];

  await api
    .delete(`/api/blogposts/${postToBeDeleted.id}`)
    .expect(204);

  const updatedPosts = await helper.getAllPostsFromDB();
  const titlesOfUpdatedPosts = updatedPosts.map(post => post.title);

  expect(updatedPosts).toHaveLength(helper.initialPosts.length - 1);
  expect(titlesOfUpdatedPosts).not.toContain(postToBeDeleted.title)
});

test('successful update of likes returns 200 status code', async () => {
  const posts = await helper.getAllPostsFromDB();
  const postToBeUpdated = posts[0];
  const NEW_LIKES = 999999;

  const updatedPost = { postToBeUpdated, likes: NEW_LIKES }

  await api
    .put(`/api/blogposts/${postToBeUpdated.id}`)
    .send(updatedPost)
    .expect(200);

  const updatedPostsFromDB = await helper.getAllPostsFromDB();
  const updatedLikesOfPost = updatedPostsFromDB.map(post => post.likes)[0];
  expect(updatedLikesOfPost).toBe(NEW_LIKES);
});


afterAll(() => mongoose.connection.close());