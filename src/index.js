module.exports = function (response) {
  const data = response.data || []
  const included = response.included || []

  var allResources = [...data, ...included]
  var entities = {}

  allResources.forEach(entity => addEntity(entities, entity))

  return { entities }
}

function addEntity (entities, entity) {
  const { type, id, attributes } = entity

  if (!entities[type]) entities[type] = {}

  entities[type][id] = {
    id,
    ...attributes,
    ...extractRelationships(entity)
  }

  return entities
}

function extractRelationships (entity) {
  const { relationships: responseRelationships } = entity

  if (!responseRelationships) return undefined

  var relationships = {}

  Object.keys(responseRelationships).map(type => {
    relationships[type] = duplicateRelationships(responseRelationships[type].data)
  })

  return relationships
}

function duplicateRelationships (relationships) {
  if (Array.isArray(relationships)) {
    return [ ...relationships ]
  } else {
    return { ...relationships }
  }
}
