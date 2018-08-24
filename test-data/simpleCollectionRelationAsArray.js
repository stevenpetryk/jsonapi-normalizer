export default {
  jsonapi: {
    data: [{
      type: 'articles',
      id: '1',
      attributes: {
        title: 'title',
        body: 'body'
      }
    }]
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
          body: 'body'
        }
      }
    }
  }
}
