# jsonapi-normalizer

A tool similar to [normalizr](https://github.com/paularmstrong/normalizr), but which leverages the
self-describing schemas present in [JSONAPI](http://jsonapi.org) to automatically normalize without
schema definitions.

## TL;DR

Turns this:

```json
{
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "title",
      "body": "body"
    }
  }]
}
```

Into this:

```js
{
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
```

## Usage

```js
import normalize from 'jsonapi-normalizer'

normalize(someJsonApiObject)
```

That's all there is to it! No crazy options or schema definitions.

## Installation

```bash
npm install --save jsonapi-normalizr
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
