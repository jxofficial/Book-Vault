Cypress.Commands.add('login', function (username, password) {
  cy
    .request('POST', 'http://localhost:3003/api/login', {
      username,
      password
    })
    .then(resp => {
      const user = resp.body;
      // once local storage is set, upon first render, page will be logged in
      // blog service authorization string will be set by the front end useEffect code
      localStorage.setItem('user', JSON.stringify(user));
      cy.visit('http://localhost:3000');
    });
});

Cypress.Commands.add('createPost', function (post) {
  const TOKEN = JSON.parse(localStorage.getItem('user')).token;
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:3003/api/blog',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: post
    })
    .then(() => cy.visit('http://localhost:3000'));
});
