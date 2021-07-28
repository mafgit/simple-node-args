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

// The following will be discussed later In Sha Allah:
const flag_models = [{...}, {...}, {...}]
// we will learn how to create models, specify validations, etc, later In Sha ALlah.

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

**Next**: *[Defining Flag Models](flag_models.md)*
