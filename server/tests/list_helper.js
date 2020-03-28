const dummyFunction = blogPosts => 1;

const calculateTotalLikes = blogPosts => {
  if (blogPosts.length === 0) return 0;
  return blogPosts.map(post => post.likes).reduce((acc, cur) => acc + cur, 0);
}

const getFavouritePosts = blogPosts => {
  if (blogPosts.length === 0) return [];
  const postLikesList = blogPosts.map(post => post.likes);
  const maxNumLikes = Math.max(...postLikesList);
  return blogPosts.filter(post => post.likes === maxNumLikes);
}

module.exports = {
  dummyFunction,
  calculateTotalLikes,
  getFavouritePosts
}