export default {
  data: {
    type: 'users',
    id: '1',
    attributes: {
      name: 'Steven'
    },
    relationships: {
      articles: {
        data: [
          { id: '1', type: 'articles' }
        ]
      }
    }
  },

  included: [
    {
      type: 'articles',
      id: '1',
      attributes: {
        body: 'This is my article'
      }
    }
  ]
}
