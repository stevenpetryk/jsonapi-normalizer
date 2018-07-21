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
        tags: {
          data: [
            { id: '1', type: 'tags' },
            { id: '2', type: 'tags' }
          ]
        }
      }
    }],

    included: [
      {
        type: 'tags',
        id: '1',
        attributes: {
          name: 'cloud'
        }
      },
      {
        type: 'tags',
        id: '2',
        attributes: {
          name: 'synergy'
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
}
