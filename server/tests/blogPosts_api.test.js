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

afterAll(() => mongoose.connection.close());