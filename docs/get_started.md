# Getting Started

## Installation

```bash
npm i simple-node-args
```

## Initializing

```js
const Program = require('simple-node-args')
const program = new Program({
  name: 'my-node-cli', // required field
  ...
})

// The following will be discussed later In Sha Allah:
const flag_models = [{...}, {...}, {...}] // we will learn how to create models.
program.parse(flag_models, process.argv)
// program.args contains your args now :)
```

## Program Details

> You can pass the following optional fields, alongside `name`, in order to generate better help message, such as:

```js
const program = new Program({
  name: 'my-node-cli',
  description: 'just a demo cli app',
  version: '1.0.0',
  // these will be discussed later In Sha Allah
  contacts: [
    { name: 'gmail', value: 'myemail@gmail.com' },
    { name: 'hotmail', value: 'myemail@hotmail.com' }
  ],
  links: [
    { name: 'github', url: 'https://github.com/me/my-node-cli' },
  ]
})
```

**Next**: *[Flag Model](flag_model.md)*