# jsonapi-normalizer

[![CircleCI](https://circleci.com/gh/stevenpetryk/jsonapi-normalizer.svg?style=shield)](https://circleci.com/gh/stevenpetryk/jsonapi-normalizer)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


A tool similar to [normalizr](https://github.com/paularmstrong/normalizr), but which leverages the
self-describing schemas present in [JSONAPI](http://jsonapi.org) to automatically normalize without
hand-written schema definitions.

## TL;DR

Turns this:

```js
{
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
```

Into this:

```js
{
  result: {
    articles: ['1']
  },
  entities: {
    articles: {
      '1': {
        id: '1',
        title: 'title',
        body: 'body',
        author: { type: 'users', id: '42' } // see Caveats below!
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
```

## Usage

```js
import normalize from 'jsonapi-normalizer'

normalize(someJsonApiObject)
```

That's all there is to it! No options or schema definitions.

## Caveats

Note that, unlike `normalizr`, this library will *always* point to associations using the format
`{ type: 'users', id: 4 }`. This behavior is intended to prevent the discontinuity present in
`normalizr` where polymorphic associations are referenced differently than regular associations. It
will also help you ensure you're retrieving the correct object when resolving the association.

Similarly, `result` will always have keys that reference the name of the schema. This is also for
the sake of consistency across all responses.

If either of these behaviors significantly hinders app development and you'd prefer `normalizr`'s
behavior, open an issue to discuss. Better yet, submit a PR that allows this behavior as an option.

## Installation

```bash
npm install --save jsonapi-normalizer
```

## Contributing

To run on your own machine, clone the project and install dependencies using [Yarn](https://yarnpkg.com/).

```bash
git clone git@github.com:stevenpetryk/jsonapi-normalizer.git
cd jsonapi-normalizer
yarn install
```

Testing is as simple as:

```bash
yarn test
```

Please ensure that your tests pass before requesting that a pull request is reviewed.
