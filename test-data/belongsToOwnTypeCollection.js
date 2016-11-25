export default {
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
}
