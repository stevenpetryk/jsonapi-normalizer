import normalize from '../src'

import simpleCollection from '../test-collections/simpleCollection'
import belongsToCollection from '../test-collections/belongsToCollection'
import belongsToOwnTypeCollection from '../test-collections/belongsToOwnTypeCollection'
import hasManyCollection from '../test-collections/hasManyCollection'

describe('normalize()', () => {
  it('normalizes a simple collection', () => {
    expect(
      normalize(simpleCollection)
    ).toEqual(
      {
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
    )
  })

  it('normalizes a collection with a belongs-to relationship', () => {
    expect(
      normalize(belongsToCollection)
    ).toEqual(
      {
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
    )
  })

  it('normalizes a collection with references to objects of the same type', () => {
    expect(
      normalize(belongsToOwnTypeCollection)
    ).toEqual(
      {
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
    )
  })

  it('normalizes a has-many collection', () => {
    expect(
      normalize(hasManyCollection)
    ).toEqual({
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
    })
  })
})
