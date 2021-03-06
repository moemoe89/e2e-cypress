import Constants from '../support/constant'

describe('Book API Test', function() {
  let authorID
  let bookID

  it('create-author', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 201
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/author`,
      body: {
        'name': name
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Author created successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.name).to.equal(name)
      authorID = response.body.data.id
    })
  })

  it('create', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 201
    const rand = new Date().getTime()
    const name = `Test Name ${rand}`
    const title = `Test Title ${rand}`
    const autID = authorID

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Book created successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.title).to.equal(title)
      bookID = response.body.data.id
    })
  })

  it('create-author-empty', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const title = 'Kariage-Kun'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The author id field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-author-not-integer', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = 'a'
    const title = 'Kariage-Kun'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The author id must be an integer.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-author-not-found', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = 99999
    const title = 'Kariage-Kun'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The selected author id is invalid.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-title-empty', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = authorID
    const title = ''

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.title[0]).to.equal('The title field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('create-title-over-255', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = authorID
    const title = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v1/book`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.title[0]).to.equal('The title may not be greater than 255 characters.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('list', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 200

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/book`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Book retrieved successfully')
      expect(response.body.errors).to.equal(null)
    })
  })

  it('detail', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 200
    const id = bookID
 
    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/book/${id}`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.message).to.equal('Book retrieved successfully')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data.id).to.equal(id)
    })

  })

  it('detail-id-not-int', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 404

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/book/a`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Book not found')
      expect(response.body.errors).to.equal(null)
    })
  })

  it('detail-not-found', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 404

    cy.request({
      method: 'GET',
      url: `${baseURL}/api/v1/book/1000000`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Book not found')
      expect(response.body.errors).to.equal(null)
    })
  })

  it('update', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 200
    const rand = new Date().getTime()
    const title = `Test Title Update ${rand}`
    const autID = authorID
    const id = bookID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/${id}`,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.errors).to.equal(null)
      expect(response.body.message).to.equal('Book updated successfully')
      expect(response.body.data.title).to.equal(title)
    })
  })

  it('update-not-found', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 404
    const title = 'Update title book'
    const autID = authorID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/99999`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Book not found')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-not-integer', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 404
    const title = 'Update title book'
    const autID = authorID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/a`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Book not found')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-author-empty', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const title = 'Kariage-Kun'
    const id = bookID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/${id}`,
      failOnStatusCode: false,
      body: {
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The author id field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-author-not-integer', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = 'a'
    const title = 'Kariage-Kun'
    const id = bookID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/${id}`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The author id must be an integer.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-author-not-found', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = 99999
    const title = 'Kariage-Kun'
    const id = bookID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/${id}`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.author_id[0]).to.equal('The selected author id is invalid.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-title-empty', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = authorID
    const title = ''
    const id = bookID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/${id}`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.title[0]).to.equal('The title field is required.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('update-title-over-255', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 400
    const autID = authorID
    const title = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    const id = bookID

    cy.request({
      method: 'PUT',
      url: `${baseURL}/api/v1/book/${id}`,
      failOnStatusCode: false,
      body: {
        'author_id': autID,
        'title': title
      },
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('There\'s something wrong with your request')
      expect(response.body.errors.title[0]).to.equal('The title may not be greater than 255 characters.')
      expect(response.body.data).to.equal(null)
    })
  })

  it('delete', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 200
    const id = bookID
 
    cy.request({
      method: 'DELETE',
      url: `${baseURL}/api/v1/book/${id}`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.errors).to.equal(null)
    })  
  })

  it('delete-id-not-int', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 404

    cy.request({
      method: 'DELETE',
      url: `${baseURL}/api/v1/book/a`,
      failOnStatusCode: false
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(false)
      expect(response.body.message).to.equal('Book not found')
      expect(response.body.errors).to.equal(null)
      expect(response.body.data).to.equal(null)
    })
  })

  it('delete-author', function() {
    const baseURL = Constants.ApiURL
    const statusCode = 200
    const id = authorID
 
    cy.request({
      method: 'DELETE',
      url: `${baseURL}/api/v1/author/${id}`
    }).then(function(response){
      expect(response.status).to.equal(statusCode)
      expect(response.body.status).to.equal(statusCode)
      expect(response.body.success).to.equal(true)
      expect(response.body.errors).to.equal(null)
    })  
  })
})