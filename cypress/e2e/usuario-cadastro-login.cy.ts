describe('Fluxo completo de cadastro e login', () => {
  it('deve cadastrar e fazer login com sucesso', () => {
    const emailAleatorio = `cypress${Date.now()}@email.com`;
    const senha = 'senha123';

    // Cadastro
    cy.visit('/cadastroUsuario');
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
    cy.get('input[formControlName="nomeUsuario"]').type('Cypress usuario teste', { force: true });
    cy.get('input[formControlName="email"]').type(emailAleatorio, { force: true });
    cy.get('input[formControlName="nickname"]').type('cypress', { force: true });
    cy.get('input[formControlName="cep"]').type('06709530', { force: true });
    cy.get('input[formControlName="cidade"]').type('Cotia', { force: true });
    cy.get('input[formControlName="uf"]').type('SP', { force: true });
    cy.get('input[formControlName="senha"]').type(senha, { force: true });
    cy.get('input[formControlName="dataNascimento"]').type('2000-01-01', { force: true });
    cy.get('button[color="primary"]').should('not.be.disabled').click({ force: true });
    cy.get('@alert').should('have.been.calledWith', 'Cadastro efetuado com sucesso');

    // Login
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type(emailAleatorio, { force: true });
    cy.get('input[formControlName="senha"]').type(senha, { force: true });
    cy.get('button[color="primary"]').contains('Login').should('not.be.disabled').click({ force: true });
  });
});
