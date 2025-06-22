// cypress/e2e/anuncios-cadastro.cy.ts

describe('Cadastro de Anúncio', () => {
  const email = 'cypress@teste.com'; // Use a valid user email
  const senha = 'senha123'; // Use the correct password

  beforeEach(() => {
    // Realiza login antes de cada teste
    cy.visit('/login');
    cy.get('input[formControlName="email"]').type(email, { force: true });
    cy.get('input[formControlName="senha"]').type(senha, { force: true });
    cy.get('button[color="primary"]').contains('Login').click({ force: true });
    cy.url({ timeout: 10000 }).should('include', '/anuncios');

    // Agora acessa a página de cadastro de anúncio
    cy.visit('/anuncios/novo');
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
  });

  it('deve cadastrar um anúncio com sucesso', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/livro.jpg', { force: true });
    cy.get('input[formControlName="isbn"]').type('978-3-16-148410-0', { force: true });
    cy.get('input[formControlName="nomeLivro"]').type('Livro de Teste', { force: true });
    cy.get('input[formControlName="autor"]').type('Autor Teste', { force: true });
    cy.get('mat-select[formControlName="condicao"]').click();
    cy.get('mat-option').contains('Novo').click();
    cy.get('input[formControlName="categoria"]').type('Ficção', { force: true });
    cy.get('textarea[formControlName="descricao"]').type('Descrição do livro de teste.', { force: true });

    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.get('@alert').should('have.been.calledWith', 'Livro cadastrado com sucesso');
    cy.url().should('include', '/anuncios');
  });
});
