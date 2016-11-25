export default {
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
}
