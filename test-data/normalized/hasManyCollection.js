export default {
  result: {
    articles: ['1'],
    tags: ['1', '2']
  },
  entities: {
    articles: {
      '1': {
        id: '1',
        title: 'title',
        body: 'body',
        tags: [
          { type: 'tags', id: '1' },
          { type: 'tags', id: '2' }
        ]
      }
    },

    tags: {
      '1': { id: '1', name: 'cloud' },
      '2': { id: '2', name: 'synergy' }
    }
  }
}
