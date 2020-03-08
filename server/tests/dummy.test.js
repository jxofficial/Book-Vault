const listHelper = require('../utils/list_helper');

test('dummy test returns 1', () => {
  const zeroBlogPosts = [];
  const result = listHelper.dummy(zeroBlogPosts);
  expect(result).toBe(1);
})