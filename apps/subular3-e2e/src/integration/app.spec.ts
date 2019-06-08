import { getGreeting } from '../support/app.po';

describe('subular3', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to subular3!');
  });
});
