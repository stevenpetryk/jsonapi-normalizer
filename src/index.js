import normalize from './normalize'

export default function (...args) {
  console.warn(`
Directly importing 'normalize' is deprecated. Please use the named export:

  import { normalize } from 'json-api-normalizer'
`)

  return normalize(...args)
}

export { normalize }
