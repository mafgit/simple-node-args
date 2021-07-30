# Getting Started

## Installation

```bash
npm i simple-node-args
```

## Usage

```js
const Program = require('simple-node-args') // importing class

// creating instance
const program = new Program({
  name: 'my-node-cli', // required field
  // more fields can be passed (discussed later)
})

// this is a schema-less approach:
program.parse(process.argv) // passing 2nd parameter (schemas) will be discussed later In sha Allah.
// program.args contains your args now :)
```

## Program Details

> You can pass the following optional fields, alongside `name`, in order to generate better help message, such as:

```js
const program = new Program({
  name: 'my-node-cli',
  description: 'just a demo cli app',
  version: '1.0.0',
  contacts: [
    { name: 'gmail', value: 'myemail@gmail.com' },
    { name: 'hotmail', value: 'myemail@hotmail.com' }
  ],
  links: [
    { name: 'github', value: 'https://github.com/me/my-node-cli' },
  ]
})
```

- Check [Help Message](help_message.md) for more info on help message.

**Next**: *[Flag Schemas](flag_schemas.md)*
