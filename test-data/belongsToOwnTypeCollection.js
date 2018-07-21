export default {
  jsonapi: {
    data: [{
      type: 'users',
      id: '1',
      attributes: {
        name: 'Steve'
      },
      relationships: {
        manager: {
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
      users: ['1']
    },
    entities: {
      users: {
        '1': {
          id: '1',
          name: 'Steve',
          manager: { type: 'users', id: '42' }
        },
        '42': {
          id: '42',
          name: 'John'
        }
      }
    }
  }
}
