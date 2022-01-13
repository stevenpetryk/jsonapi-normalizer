# jsonapi-normalizer

[![CircleCI](https://circleci.com/gh/stevenpetryk/jsonapi-normalizer.svg?style=shield)](https://circleci.com/gh/stevenpetryk/jsonapi-normalizer)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


A tool similar to [normalizr](https://github.com/paularmstrong/normalizr), but which leverages the
self-describing schemas present in [JSONAPI](http://jsonapi.org) to automatically normalize without
hand-written schema definitions.

Unlike the original code, this fork will always render relationships as an array of ids. [See this explication](https://github.com/stevenpetryk/jsonapi-normalizer#caveats)

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
        author: ['42']
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
