import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  screenshotsFolder: 'cypress/visual-baselines',
  viewportWidth: 390,
  viewportHeight: 844,
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: false,
  },
  video: false,
});
