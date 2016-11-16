import { compose } from './utils'

module.exports = function (response) {
  const data = response.data || []
  const included = response.included || []

  const transformer = compose(extractRelationships, flattenResource)

  return {
    entities: mergeEachKey(
      categorizeByType(data, transformer),
      categorizeByType(included, transformer)
    )
  }
}

function mergeEachKey (object1, object2) {
  var result = {}

  const allKeys = Object.keys(object1).concat(Object.keys(object2))

  allKeys.forEach((key) => {
    result[key] = {
      ...object1[key],
      ...object2[key]
    }
  })

  return result
}

function categorizeByType (resources, transformer) {
  var types = {}

  resources.forEach(resource => (
    types[resource.type] = {
      ...types[resource.type],
      [resource.id]: transformer(resource)
    }
  ))

  return types
}

function extractRelationships (resource) {
  if (!resource.relationships) return resource

  var relationships = {}

  Object.keys(resource.relationships).map(type => {
    const theseRelationships = resource.relationships[type].data

    if (Array.isArray(theseRelationships)) {
      relationships[type] = [ ...theseRelationships ]
    } else {
      relationships[type] = { ...theseRelationships }
    }
  })

  return {
    id: resource.id,
    type: resource.type,
    attributes: {
      ...resource.attributes,
      ...relationships
    }
  }
}

function flattenResource (resource) {
  return {
    id: resource.id,
    ...resource.attributes
  }
}
