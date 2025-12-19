describe('Aluguel de equipamento - Caminho Feliz', () => {

  it('Deve configurar localidade, buscar produto e validar detalhes', () => {

    // Ignora erros JS do site
    Cypress.on('uncaught:exception', () => false)

    // 1️⃣ Acessar site
    cy.visit('https://www.casadoconstrutor.com.br/pt-br')

    // 2️⃣ Fechar modal inicial (se aparecer)
    cy.contains('Agora não', { timeout: 15000 })
      .click({ force: true })

    // 3️⃣ Selecionar loja
    cy.contains('Selecionar loja', { timeout: 15000 })
      .click({ force: true })

    cy.get('input[placeholder*="cidade"]', { timeout: 15000 })
      .clear({ force: true })
      .type('Rio Claro', { force: true })

    cy.contains('Rio Claro', { timeout: 15000 })
      .click({ force: true })

    // Aguarda redirecionamento da loja
    cy.url({ timeout: 20000 }).should('contain', '/loja/')

    // 4️⃣ Buscar equipamento
    // Campo de busca real do site
    cy.get('input[type="text"]', { timeout: 20000 })
      .first()
      .clear({ force: true })
      .type('Betoneira{enter}', { force: true })

    // 5️⃣ Garantir que há resultados
    // Produtos usam /equipamentos na URL
    cy.get('a[href*="/equipamentos"]', { timeout: 20000 })
      .first()
      .should('be.visible')

    // 6️⃣ Validação cruzada
    cy.get('a[href*="/equipamentos"]')
      .first()
      .invoke('text')
      .then((nomeProdutoLista) => {

        const nomeProduto = nomeProdutoLista.trim()

        cy.get('a[href*="/equipamentos"]')
          .first()
          .click({ force: true })

        cy.get('h1', { timeout: 15000 })
          .should('contain.text', nomeProduto)
      })

    // 7️⃣ Evidência
    cy.screenshot('aluguel-equipamento-sucesso')

  })

})
