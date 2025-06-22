// cypress/e2e/login.cy.ts

describe('Login', () => {
  const email = 'cypress@teste.com';
  const senha = 'senha123';

  it('deve fazer login com sucesso', () => {
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type(email, { force: true });
    cy.get('input[formControlName="senha"]').type(senha, { force: true });
    cy.get('button[color="primary"]').contains('Login').click({ force: true });
    cy.url({ timeout: 10000 }).should('include', '/anuncios');
  });
});
