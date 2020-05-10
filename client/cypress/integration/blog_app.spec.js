import constants from '../support/constants';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset');
    cy.request('POST', 'http://localhost:3003/api/users', constants.USER_1);
    cy.request('POST', 'http://localhost:3003/api/users', constants.USER_2);
    cy.visit('http://localhost:3000');
  });

  it('displays the login page by default', function () {
    cy.contains('Blog Login');
    cy.get('input[name=username]')
      .should('exist');
    cy.get('input[name=password]')
      .should('exist');
    cy.get('button').should('contain', 'Login');
  });

  describe('Login', function () {
    it('succeeds with the correct credentials', function () {
      cy.get('input[name=username]')
        .type(constants.USERNAME_1);
      cy.get('input[name=password]')
        .type(constants.PASSWORD_1);
      cy.get('button')
        .click();

      cy.contains(`Welcome to ${constants.NAME_1}'s blog`);
    });

    it('fails with the wrong credentials', function () {
      cy.get('input[name=username]')
        .type(constants.USERNAME_1);
      cy.get('input[name=password]')
        .type(constants.WRONG_PASSWORD);
      cy.get('button')
        .click();

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'border', '2px solid rgb(255, 0, 0)');
    });

    describe('when USER_1 is logged in', function () {
      beforeEach(function () {
        cy.login(constants.USERNAME_1, constants.PASSWORD_1);
      });

      it('USER_1 can create a blog post', function () {
        cy.get('html')
          .should('not.contain', `${constants.TITLE_2} by ${constants.AUTHOR_2}`);

        cy.contains('New Post')
          .click();
        cy.get('input[name=title]')
          .type(constants.TITLE_2);
        cy.get('input[name=author]')
          .type(constants.AUTHOR_2);
        cy.get('input[name=url]')
          .type(constants.URL_2);
        cy.contains('button', 'Create')
          .click();

        cy.contains(`${constants.TITLE_2} by ${constants.AUTHOR_2}`);
      });

      describe('when a default post exists', function () {
        beforeEach(function () {
          cy.createPost(constants.POST_1);
          cy.contains('The Silent Patient by Alex Michaelides')
            .as('post');
        });

        it('USER_1 can like the post', function () {
          cy.get('@post')
            .contains('button', 'View details')
            .click();

          cy.get('@post')
            .should('contain', '9999');

          cy.get('@post')
            .contains('button', 'Like')
            .click();

          cy.get('@post')
            .should('contain', '10000');
        });

        it('USER_1 can delete post', function () {
          cy.get('@post')
            .contains('button', 'View details')
            .click();

          cy.get('@post')
            .contains('button', 'Delete')
            .click();

          cy.get('html')
            .should('not.contain', 'The Silent Patient by Alex Michaelides');
        });

        it('USER_2 cannot delete USER_1\'s post', function () {
          cy.contains('button', 'Logout')
            .click();
          cy.login(constants.USERNAME_2, constants.PASSWORD_2);

          cy.contains(`Welcome to ${constants.NAME_2}'s blog`);

          cy.contains('button', 'View details')
            .click();

          cy.contains('button', 'Delete')
            .click();

          cy.get('.error')
            .should('contain', 'Only user who posted the post can delete the post')
            .and('have.css', 'border', '2px solid rgb(255, 0, 0)');

          cy.contains('The Silent Patient by Alex Michaelides');
        });
      });

      describe('when there is more than 1 post', function () {
        beforeEach(function () {
          cy.login(constants.USERNAME_1, constants.PASSWORD_1);
          cy.createPost(constants.POST_1);
          cy.createPost(constants.POST_2);
        });

        it('posts can be sorted by likes', function () {
          const intialLikes = [9999, 5000];
          const finalLikes = [5000, 9999];
          cy.get('.content')
            .then(queryResults => queryResults.toArray())
            .then(postsDivArr => {

              Array.prototype.forEach.call(postsDivArr, ($postDiv, i) => {
                cy.wrap($postDiv)
                  .contains('button', 'View details').click();
                cy.wrap($postDiv)
                  .contains(intialLikes[i]);
              });
            });
          cy.contains('button', 'Sort').click();

          cy.get('.content')
            .then(queryResults => queryResults.toArray())
            .then(postsDivArr => {

              Array.prototype.forEach.call(postsDivArr, ($postDiv, i) => {
                cy.wrap($postDiv)
                  .contains(finalLikes[i]);
              });
            });
        });
      });
    });
  });
});
