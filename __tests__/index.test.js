import { normalize, denormalize } from '../src'

import denormalizedSingleItem from '../test-data/denormalized/singleItem'
import denormalizedSimpleCollection from '../test-data/denormalized/simpleCollection'
import denormalizedBelongsToCollection from '../test-data/denormalized/belongsToCollection'
import denormalizedBelongsToOwnTypeCollection from '../test-data/denormalized/belongsToOwnTypeCollection'
import denormalizedHasManyCollection from '../test-data/denormalized/hasManyCollection'

import normalizedSingleItem from '../test-data/normalized/singleItem'
import normalizedSimpleCollection from '../test-data/normalized/simpleCollection'
import normalizedBelongsToCollection from '../test-data/normalized/belongsToCollection'
import normalizedBelongsToOwnTypeCollection from '../test-data/normalized/belongsToOwnTypeCollection'
import normalizedHasManyCollection from '../test-data/normalized/hasManyCollection'

describe('normalize()', () => {
  it('normalizes a single object', () => {
    expect(
      normalize(denormalizedSingleItem)
    ).toEqual(normalizedSingleItem)
  })

  it('normalizes a simple collection', () => {
    expect(
      normalize(denormalizedSimpleCollection)
    ).toEqual(normalizedSimpleCollection)
  })

  it('normalizes a collection with a belongs-to relationship', () => {
    expect(
      normalize(denormalizedBelongsToCollection)
    ).toEqual(normalizedBelongsToCollection)
  })

  it('normalizes a collection with references to objects of the same type', () => {
    expect(
      normalize(denormalizedBelongsToOwnTypeCollection)
    ).toEqual(normalizedBelongsToOwnTypeCollection)
  })

  it('normalizes a has-many collection', () => {
    expect(
      normalize(denormalizedHasManyCollection)
    ).toEqual(normalizedHasManyCollection)
  })
})

describe('denormalize()', () => {
  it('denormalizes a single object', () => {
    expect(
      denormalize({ users: '1' }, normalizedSingleItem.entities)
    ).toEqual(denormalizedSingleItem)
  })

  it('denormalizes a simple collection', () => {
    expect(
      denormalize({ articles: ['1'] }, normalizedSimpleCollection.entities)
    ).toEqual(denormalizedSimpleCollection)
  })

  it('denormalizes a collection with a belongs-to relationship', () => {
    expect(
      denormalize({ articles: ['1'] }, normalizedBelongsToCollection.entities)
    ).toEqual(denormalizedBelongsToCollection)
  })

  it('denormalizes a collection with references to objects of the same type', () => {
    expect(
      denormalize({ users: ['1'] }, normalizedBelongsToOwnTypeCollection.entities)
    ).toEqual(denormalizedBelongsToOwnTypeCollection)
  })

  it('denormalizes a has-many collection', () => {
    expect(
      denormalize({ articles: ['1'] }, normalizedHasManyCollection.entities)
    ).toEqual(denormalizedHasManyCollection)
  })
})
