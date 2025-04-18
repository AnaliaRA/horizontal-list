describe('Horizontal List Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://acc01.titanos.tv/v1/genres/14/contents*', {
      fixture: 'movies.json'
    }).as('getMovies')
    
    cy.visit('http://localhost:5173')
    cy.wait('@getMovies')
    
    cy.get('[data-testid="list-container"]').should('be.visible')
  })

  it('loads and displays multiple items correctly', () => {
    cy.get('[data-testid="list-container"]').should('be.visible')
    
    cy.get('[data-testid="list-item"]').should('have.length.at.least', 10)
    
    cy.contains('The Shawshank Redemption').should('be.visible')
    
    cy.get('body').type('{rightarrow}')
    cy.wait(500)
    cy.contains('The Godfather').should('be.visible')
    
    cy.get('body').type('{rightarrow}')
    cy.wait(500)
    cy.contains('The Dark Knight').should('be.visible')
  })

  it('shows spinner during initial loading', () => {
    // Override the intercept to include a delay and ensure spinner is visible
    cy.intercept('GET', 'https://acc01.titanos.tv/v1/genres/14/contents*', {
      fixture: 'movies.json',
      delay: 1000
    }).as('getMoviesDelayed')
    
    cy.visit('http://localhost:5173')
    
    cy.get('[role="status"]').should('be.visible')
    
    cy.wait('@getMoviesDelayed')
    
    cy.get('[role="status"]').should('not.exist')
    cy.get('[data-testid="list-container"]').should('be.visible')
  })

  it('displays error message when API fails', () => {
    cy.intercept('GET', 'https://acc01.titanos.tv/v1/genres/14/contents*', {
      statusCode: 500,
      body: { message: 'Server error' }
    }).as('getMoviesError')
    
    cy.visit('http://localhost:5173')
    cy.wait('@getMoviesError')
    
    cy.get('[data-testid="error-message"]').should('exist')
    cy.get('[data-testid="error-message"]')
      .contains('Error loading content', { timeout: 6000 })
      .should('exist')
    
    cy.get('[data-testid="error-message"]', { timeout: 6000 })
      .should('have.text', 'Error loading content: Server error')
  })

  it('displays "No content available" when API returns empty content', () => {
    cy.intercept('GET', 'https://acc01.titanos.tv/v1/genres/14/contents*', {
      body: {
        collection: [],
        pagination: {
          current_page: 1,
          total_pages: 1,
          total_count: 0,
          per_page: 20
        }
      }
    }).as('getEmptyMovies')
    
    cy.visit('http://localhost:5173')
    cy.wait('@getEmptyMovies')
    
    cy.contains('No content available', { timeout: 10000 }).should('exist')
  })

  it('loads and displays images correctly', () => {
    cy.get('[data-testid="list-item"] img').should('be.visible')
    
    cy.get('[data-testid="list-item"] img').first()
      .should('have.attr', 'src', 'https://example.com/movies/shawshank-portrait.jpg')
    
    cy.get('[data-testid="list-item"] img').first()
      .should('have.attr', 'alt', 'The Shawshank Redemption')
  })

  it('navigates between items using keyboard arrow keys', () => {
    cy.contains('The Shawshank Redemption').should('be.visible')
    
    cy.get('body').type('{rightarrow}')
    cy.wait(500)
    cy.contains('The Godfather').should('be.visible')
    
    cy.get('body').type('{rightarrow}')
    cy.wait(500) 
    cy.contains('The Dark Knight').should('be.visible')
    
    cy.get('body').type('{leftarrow}')
    cy.wait(500)
    cy.contains('The Godfather').should('be.visible')
  })

  it('highlights and shows title for focused item', () => {
    cy.get('[data-testid="list-item"]').first()
      .should('contain', 'The Shawshank Redemption')
    
    cy.get('body').type('{rightarrow}')
    cy.wait(500)
    
    cy.get('[data-testid="list-item"]').eq(1)
      .should('contain', 'The Godfather')
  })
})
