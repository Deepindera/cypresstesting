describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the correct weather icon based on the description', () => {
     // Grab the weather description from the page and verify that it's displayed
     cy.get('td')
     .contains("Description")
     .next()
     .should('exist')
     .then((descriptionElement) => {
      const descriptionText = descriptionElement.text().toLowerCase();
      if (descriptionText.includes('clear') || descriptionText.includes('sunny')) {
        // Check if the sunny icon is displayed (replace with correct selector for your icon)
        cy.get('svg[aria-label="Day Sunny"]').should('exist');
      } else if (descriptionText.includes('cloudy')) {
        // Check if the cloudy icon is displayed (replace with correct selector for your icon)
        cy.get('svg[aria-label="Cloudy"]').should('exist');
      } else if (descriptionText.includes('rain')) {
        // Check if the rainy icon is displayed (replace with correct selector for your icon)
        cy.get('svg[aria-label="Rain"]').should('exist');
      } else {
        // If no match for the description, assert that no icon is displayed
        cy.get('svg').should('not.exist');
      }
     })
  })
})