import normalize from '../src/index'

import singleItem from '../test-data/singleItem'
import singleItemRelationAsArray from '../test-data/singleItemRelationAsArray'
import simpleCollection from '../test-data/simpleCollection'
import simpleCollectionRelationAsArray from '../test-data/simpleCollectionRelationAsArray'
import belongsToCollection from '../test-data/belongsToCollection'
import belongsToCollectionRelationAsArray from '../test-data/belongsToCollectionRelationAsArray'
import belongsToOwnTypeCollection from '../test-data/belongsToOwnTypeCollection'
import belongsToOwnTypeCollectionRelationAsArray from '../test-data/belongsToOwnTypeCollectionRelationAsArray'
import hasManyCollectionRelationAsArray from '../test-data/hasManyCollectionRelationAsArray'
import hasManyCollection from '../test-data/hasManyCollection'

describe('normalize()', () => {
  describe('basic function', () => {
    function testNormalizes (payload, message) {
      it(message, () => {
        expect(normalize(payload.jsonapi)).toEqual(payload.normalized)
      })
    }

    testNormalizes(singleItem, 'single object')
    testNormalizes(simpleCollection, 'simple collection')
    testNormalizes(belongsToCollection, 'collection with a belongs-to relationship')
    testNormalizes(belongsToOwnTypeCollection, 'collection with references to objects of the same type')
    testNormalizes(hasManyCollection, 'has-many collection')
  })

  describe('normalize with relations as array', () => {
    function testNormalizesRelationAsArray (payload, message) {
      it(message, () => {
        expect(normalize(payload.jsonapi, true)).toEqual(payload.normalized)
      })
    }

    testNormalizesRelationAsArray(singleItemRelationAsArray, 'single object with relationship as array')
    testNormalizesRelationAsArray(simpleCollectionRelationAsArray, 'simple collection with relationship as array')
    testNormalizesRelationAsArray(belongsToCollectionRelationAsArray, 'collection with a belongs-to relationship with relationship as array')
    testNormalizesRelationAsArray(belongsToOwnTypeCollectionRelationAsArray, 'collection with references to objects of the same type with relationship as array')
    testNormalizesRelationAsArray(hasManyCollectionRelationAsArray, 'has-many collection with relationship as array')
  })
})
