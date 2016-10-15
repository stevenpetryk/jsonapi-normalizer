export default {
  data: [{
    type: 'articles',
    id: '1',
    attributes: {
      title: 'title',
      body: 'body'
    },
    relationships: {
      author: {
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
