describe('Atmos app shell', () => {
  it('navigates across the approved primary routes', () => {
    cy.visit('/');
    cy.contains('h1', 'The atmosphere, explained.').should('be.visible');
    cy.contains('a', 'Layers').click();
    cy.location('pathname').should('equal', '/layers');
    cy.contains('h1', 'Layers').should('be.visible');
  });
});
