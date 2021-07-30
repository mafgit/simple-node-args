# Flag Schemas

> A flag schema is an object that defines a flag and its details such as validations, etc. All the flag schemas are put together in an array which is later passed into program.parse function which parses and validates the arguments according to the rules provided in flag schemas.

- NOTE: If you want to accept any argument passed into your program, without any validation, you don't need to pass the flag schemas array to program.parse function.

```js
const flag_schemas = [
  {}, {}, {} // each object is a schema for an individual flag
]
// an example of a flag_schema:
{ long: 'age', short: 'a', type: 'integer', min: 18 }
```

**Next**: *[Flag Details](flag_details.md)*