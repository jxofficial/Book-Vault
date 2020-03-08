const dummyFunction = blogPosts => 1;

const calculateTotalLikes = blogPosts => {
  if (blogPosts.length === 0) return 0;
  return blogPosts.map(post => post.likes).reduce((acc, cur) => acc + cur, 0);
}

module.exports = {
  dummyFunction,
  calculateTotalLikes
}