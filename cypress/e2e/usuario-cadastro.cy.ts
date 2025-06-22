describe('Tela de Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visit('/cadastroUsuario');
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
  });

  it('deve preencher e enviar o formulário com sucesso', () => {
    // Gera um e-mail aleatório usando timestamp
    const emailAleatorio = `cypress${Date.now()}@email.com`;

    cy.get('input[formControlName="nomeUsuario"]').type('Cypress usuario teste', { force: true });
    cy.get('input[formControlName="email"]').type(emailAleatorio, { force: true });
    cy.get('input[formControlName="nickname"]').type('cypress', { force: true });
    cy.get('input[formControlName="cep"]').type('06709530', { force: true });
    cy.get('input[formControlName="cidade"]').type('Cotia', { force: true });
    cy.get('input[formControlName="uf"]').type('SP', { force: true });
    cy.get('input[formControlName="senha"]').type('senha123', { force: true });
    cy.get('input[formControlName="dataNascimento"]').type('2000-01-01', { force: true });

    cy.get('button[color="primary"]').should('not.be.disabled').click({ force: true });

    cy.get('@alert').should('have.been.called');
    cy.get('@alert').should('have.been.calledWith', 'Cadastro efetuado com sucesso');
  });
});
