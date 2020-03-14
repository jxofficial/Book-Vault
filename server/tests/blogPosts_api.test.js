const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const BlogPost = require('../models/blogPost');

const api = supertest(app);

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

beforeEach(async () => {
  await BlogPost.deleteMany({});

  const postDocuments = initialPosts.map(post => new BlogPost(post));
  const promiseArr = postDocuments.map(doc => doc.save());
  await Promise.all(promiseArr);
});

test('get request returns correct number of posts', async () => {
  const result = await api
    .get('/api/blogposts')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(result.body).toHaveLength(initialPosts.length);
});

test('post request adds correct post successfully', async () => {
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

  const updatedPosts = await BlogPost.find({});
  const titles = updatedPosts.map(post => post.title);
  expect(updatedPosts).toHaveLength(initialPosts.length + 1);
  expect(titles).toContain(postToAdd.title);
});

afterAll(() => mongoose.connection.close());