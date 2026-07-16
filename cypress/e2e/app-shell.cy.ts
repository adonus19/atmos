describe('Atmos app shell', () => {
  it('navigates across the approved primary routes', () => {
    cy.visit('/');
    cy.contains('h1', 'Calm and slowly drying').should('be.visible');
    cy.contains('a', 'Layers').click();
    cy.location('pathname').should('equal', '/layers');
    cy.contains('h1', 'Layers').should('be.visible');
  });

  it('proves calm weather remains useful and restrained', () => {
    cy.visit('/home');
    cy.get('[data-cy="calm-insight"]')
      .should('contain', 'A drier window is developing')
      .and('contain', 'Synthetic scenario');
    cy.get('[data-cy="atmospheric-scene"]').should('have.attr', 'data-activity', 'calm');
    cy.get('[data-layer="environment"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('contain', '/assets/scenes/home/environment/calm-dawn.webp');
    cy.get('[data-layer="environment-avif"]')
      .should('have.attr', 'srcset')
      .and('contain', '/assets/scenes/home/environment/calm-dawn.avif');
    cy.get('[data-layer="cloud"]').should('have.length', 2);
    cy.get('[data-layer="foreground"]').should('be.visible');
    cy.get('[data-cy="atmospheric-interpretation"]').should('not.have.class', 'hazard');
    cy.document().then((document) => {
      const style = document.createElement('style');
      style.textContent =
        '*, *::before, *::after { animation: none !important; transition: none !important; }';
      document.head.append(style);
    });
    cy.screenshot('calm-home-mobile', { capture: 'viewport', overwrite: true });
    cy.get('[data-cy="atmospheric-scene"]').scrollIntoView().screenshot('calm-scene-mobile', {
      overwrite: true,
    });
  });

  it('synchronizes the atmospheric summary while scrubbing time', () => {
    cy.visit('/home');
    cy.get('[data-cy="timeline-range"]').invoke('val', 18).trigger('input');
    cy.get('[data-cy="timeline-range"]')
      .should('have.value', '18')
      .and('have.attr', 'aria-valuetext')
      .and('contain', 'Storms developing');
    cy.get('[data-cy="atmospheric-scene"]')
      .should('have.attr', 'aria-label')
      .and('contain', 'light precipitation');
    cy.get('[data-layer="environment"]')
      .should('have.attr', 'src')
      .and('contain', '/assets/scenes/home/environment/calm-night.webp');
    cy.get('[data-cy="atmospheric-interpretation"]')
      .should('contain', 'Storms developing')
      .and('contain', 'Jul 16, 12:00 AM EDT');
    cy.get('[data-cy="atmospheric-conditions"]')
      .should('contain', '1.2 mm/h')
      .and('contain', '6 m/s from 190°');
    cy.get('[data-cy="timeline-play"]').should('have.attr', 'aria-pressed', 'false').click();
    cy.get('[data-cy="timeline-play"]').should('have.attr', 'aria-pressed', 'true');
  });
});
