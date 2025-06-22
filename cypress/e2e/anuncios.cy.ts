// cypress/e2e/anuncios.cy.ts

describe('Página de Anúncios', () => {
  beforeEach(() => {
    cy.visit('/anuncios');
  });

  it('deve exibir a lista de anúncios', () => {
    // Aguarda o carregamento dos anúncios
    cy.get('.container .card').should('exist');

    // Verifica se os campos principais estão visíveis
    cy.get('.card').first().within(() => {
      cy.get('mat-card-title').should('be.visible');
      cy.get('.autor').should('be.visible');
      cy.get('.genero').should('be.visible');
      cy.get('.isbn').should('be.visible');
      cy.get('.descricao').should('be.visible');
      cy.get('.anunciante').should('be.visible');
      cy.get('img[mat-card-image]').should('be.visible');
    });
  });

  it('deve permitir pesquisar anúncios', () => {
    cy.get('input[matinput]').type('livro', { force: true });
    cy.get('button[aria-label="Search"]').click();
    cy.get('.container .card').should('exist');
  });

  it('deve limpar a pesquisa', () => {
    cy.get('input[matinput]').type('livro', { force: true });
    cy.get('button[aria-label="Clear"]').click();
    cy.get('input[matinput]').should('have.value', '');
  });
});
