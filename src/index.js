module.exports = function (response, relationAsArray = false) {
  let data

  if (Array.isArray(response.data)) {
    data = response.data
  } else {
    data = [ response.data ]
  }

  const included = response.included || []

  let result = {}
  let entities = {}

  data.forEach(entity => {
    addResult(result, entity)
    addEntity(entities, entity, relationAsArray)
  })

  included.forEach(entity => {
    addEntity(entities, entity, relationAsArray)
  })

  return {
    result,
    entities
  }
}

function addResult (result, entity) {
  const { type, id } = entity

  if (!result[type]) result[type] = []

  result[type].push(id)
}

function addEntity (entities, entity, relationAsArray) {
  const { type, id, attributes } = entity

  if (!entities[type]) entities[type] = {}

  entities[type][id] = {
    id,
    ...attributes,
    ...extractRelationships(entity, relationAsArray)
  }

  return entities
}

function extractRelationships (entity, relationAsArray) {
  const { relationships: responseRelationships } = entity

  if (!responseRelationships) return undefined

  let relationships = {}

  Object.keys(responseRelationships).map(type => {
    relationships[type] = duplicateRelationships(responseRelationships[type].data, relationAsArray)
  })

  return relationships
}

function duplicateRelationshipsAsArray (relationships) {
  if (Array.isArray(relationships)) {
    return relationships.map(obj => {
      return obj.id
    })
  } else {
    return relationships.id
  }
}

function duplicateRelationships (relationships, relationAsArray) {
  if (relationAsArray) {
    return duplicateRelationshipsAsArray(relationships)
  }

  if (Array.isArray(relationships)) {
    return [ ...relationships ]
  } else {
    return { ...relationships }
  }
}
