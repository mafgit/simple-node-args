# Flag Models

> A flag model is an object that defines a flag and its details such as validations, etc. All the flag models are defined in an array which will later be passed into a function that parses and validates the arguments according to the flag models. 

```js
const flag_models = [
  {}, {}, {} // each object is a model for an individual flag
]
// this array will be passed to a parse function later
// an example of a flag_model:
{ long: 'age', short: 'a', type: 'integer', min: 18 }
```

**Next**: *[Flag Details](flag_details.md)*