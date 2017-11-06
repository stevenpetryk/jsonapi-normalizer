export default {
  result: {
    users: ['1'],
    articles: ['1']
  },
  entities: {
    users: {
      '1': {
        id: '1',
        name: 'Steven',
        articles: [
          { id: '1', type: 'articles' }
        ]
      }
    },
    articles: {
      '1': {
        id: '1',
        body: 'This is my article'
      }
    }
  }
}
