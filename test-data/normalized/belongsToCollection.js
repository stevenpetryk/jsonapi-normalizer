export default {
  result: {
    articles: ['1'],
    users: ['42']
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
