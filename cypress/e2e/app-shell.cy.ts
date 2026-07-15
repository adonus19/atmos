describe('Atmos app shell', () => {
  it('navigates across the approved primary routes', () => {
    cy.visit('/');
    cy.contains('h1', 'The atmosphere, explained.').should('be.visible');
    cy.contains('a', 'Layers').click();
    cy.location('pathname').should('equal', '/layers');
    cy.contains('h1', 'Layers').should('be.visible');
  });

  it('synchronizes the atmospheric summary while scrubbing time', () => {
    cy.visit('/home');
    cy.get('[data-cy="timeline-range"]').invoke('val', 18).trigger('input');
    cy.get('[data-cy="timeline-range"]')
      .should('have.value', '18')
      .and('have.attr', 'aria-valuetext')
      .and('contain', 'Storms developing');
    cy.get('[data-cy="timeline-play"]').should('have.attr', 'aria-pressed', 'false').click();
    cy.get('[data-cy="timeline-play"]').should('have.attr', 'aria-pressed', 'true');
  });
});
