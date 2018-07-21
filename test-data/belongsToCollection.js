export default {
  jsonapi: {
    data: [{
      type: 'articles',
      id: '1',
      attributes: {
        title: 'title',
        body: 'body'
      },
      relationships: {
        author: {
          data: {
            id: '42',
            type: 'users'
          }
        }
      }
    }],

    included: [
      {
        type: 'users',
        id: '42',
        attributes: {
          name: 'John'
        }
      }
    ]
  },

  normalized: {
    result: {
      articles: ['1']
    },
    entities: {
      articles: {
        '1': {
          id: '1',
          title: 'title',
          body: 'body',
          author: { type: 'users', id: '42' }
        }
      },
      users: {
        '42': {
          id: '42',
          name: 'John'
        }
      }
    }
  }
}
