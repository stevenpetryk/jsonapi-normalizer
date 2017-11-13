module.exports = {

  normalize: function (response) {
    const data = [].concat(response.data)
    const included = response.included || []

    return [...data, ...included]
      .reduce(({ result, entities }, resource) => ({
        result: {
          ...result,
          [resource.type]: [
            ...(result[resource.type] || []),
            resource.id
          ]
        },
        entities: {
          ...entities,
          [resource.type]: {
            ...(entities[resource.type] || []),
            [resource.id]: {
              id: resource.id,
              ...resource.attributes,
              ...extractRelationships(resource)
            }
          }
        }
      }), { result: {}, entities: {} })
  },

  denormalize: function (input, entities) {
    const includedCache = {}

    const { data, included } = Object.keys(input)
      .reduce(({ data, included }, type) =>
        [].concat(input[type]).reduce(({ data, included }, id) => {
          const entity = entities[type][id]

          const relationships = Object.keys(entity).reduce((acc, key) => {
            if (isRelationshipProp(entity[key])) {
              return [
                ...acc,
                ...[].concat(entity[key])
              ]
            }
            return acc
          }, [])

          const toInclude = relationships.reduce((acc, { type, id }) => {
            includedCache[type] = includedCache[type] || []
            if (includedCache[type].includes(id)) {
              return acc
            }
            includedCache[type] = [ ...includedCache[type], id ]
            if (entities[type] && entities[type][id]) {
              return [
                ...acc,
                entityToResource(type, entities[type][id])
              ]
            }
            return acc
          }, [])

          return {
            data: [
              ...data,
              entityToResource(type, entity)
            ],
            included: [
              ...included,
              ...toInclude
            ]
          }
        }, { data, included }),
      { data: [], included: [] })

    return {
      data: Object.keys(input).length === 1 && !Array.isArray(input[Object.keys(input)[0]])
        ? data[0]
        : data,
      ...(included.length
        ? { included }
        : {})
    }
  }
}

function isRelationshipProp (prop) {
  if ((prop || {}).type) {
    return true
  }
  if (Array.isArray(prop) && (prop[0] || {}).type) {
    return []
  }
  return false
}

function entityToResource (type, entity) {
  const { id, ..._entity } = entity
  const { attributes, relationships } = Object.keys(_entity)
    .reduce(({ attributes, relationships }, key) => {
      const isRelationship = isRelationshipProp(_entity[key])
      if (isRelationship) {
        return {
          attributes,
          relationships: {
            ...relationships,
            [key]: {
              data: _entity[key]
            }
          }
        }
      }
      return {
        attributes: {
          ...attributes,
          [key]: _entity[key]
        },
        relationships
      }
    },
    { attributes: {} })

  return {
    id,
    type,
    attributes,
    ...(relationships ? { relationships } : {})
  }
}

function extractRelationships (resource) {
  if (!resource.relationships) return undefined

  const relationships = Object.keys(resource.relationships).reduce((acc, type) => ({
    ...acc,
    [type]: duplicateRelationships(resource.relationships[type].data)
  }), {})

  return relationships
}

function duplicateRelationships (relationships) {
  if (Array.isArray(relationships)) {
    return [ ...relationships ]
  } else {
    return { ...relationships }
  }
}
