/// <reference types="Cypress" />

const { functionsIn } = require("cypress/types/lodash")

// Localizando, digitando e clicando em elementos
describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    const longText = 'Teste, teste, teste'
    cy.get('#firstName').type('Andressa')
    cy.get('#lastName').type('Rocha')
    cy.get('#email').type('andressarocha@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro quando preenchemos o e-mail com formatação incorreta', function () {
    const longText = 'Teste, teste, teste'
    cy.get('#firstName').type('Andressa')
    cy.get('#lastName').type('Rocha')
    cy.get('#email').type('andressarocha@exemplo,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', function () {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando preenchemos o e-mail com formatação incorreta', function () {
    const longText = 'Teste, teste, teste'
    cy.get('#firstName').type('Andressa')
    cy.get('#lastName').type('Rocha')
    cy.get('#email').type('andressarocha@exemplo.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, e-mail, telefone', function () {
    cy.get('#firstName')
      .type('Andressa')
      .should('have.value', 'Andressa')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Rocha')
      .should('have.value', 'Rocha')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('andressancr@gmail.com')
      .should('have.value', 'andressancr@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  //Selecionando opções em campos de seleção suspensa
  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  //Marcando inputs do tipo radio 
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //Fazer upload de aquivos
  it('seleciona arquivos na pasta fixtures', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      }) 
  })  
})
  //Lidando com links que abrem em outra aba
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de clique', function () {
    cy.get('privacy a').should('have.attr', 'target', '_blank')
})

