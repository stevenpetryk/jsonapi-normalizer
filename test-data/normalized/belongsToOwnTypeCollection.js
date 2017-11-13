export default {
  result: {
    users: ['1', '42']
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
