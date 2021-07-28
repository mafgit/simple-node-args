# Flag Validations

> You can take advantage of the following validations.

## Type Checking

- `type?: 'integer' | 'float' | 'string' | 'boolean' | 'integer[]' | 'float[]' | 'string[]'`
- It accepts the value mentioned above.
- It is set to string by default.

### Arrays

- You can set type to `'integer[]'`, `'float[]'` or `'string[]'`
- The arguments passed after the flag (until an argument that starts with `-`, and is not a number, is encountered) will be set as the value for the flag in an array.

## Regex Pattern

- `regex?: RegExp`
- It is used to validate strings using a regex pattern.

```js
// example:
{ ..., regex: /^[a-zA-Z]+$/ }
```

## Minimum Length Check

- `min_length?: number`
- It is used for string validation.

```js
// example:
{ ..., min_length: 5 }
// If "abcd" is passed, an error would occur.
```

## Maximum Length Check

- `max_length?: number`
- It is used for string validation.

```js
// example:
{ ..., max_length: 5 }
// If "abcdef" is passed, an error would occur.
```

## Enums

- `enum?: string[]`
- It is used for string validation.
- It is set to an array of strings, which contains the valid values for the flag.
- There would be an error if the value passed is not in the enum.

```js
// example:
{ ..., enum: ['male', 'female'] }
// the only two accepted value are now 'male' and 'female'.
```

## Minimum Value Check

- It is used for integer and float validation.

```js
// example:
{ ..., min: 18 }
// if 17 is passed, an error would occur
```

## Maximum Value Check

- It is used for integer and float validation.

```js
// example:
{ ..., max: 100 }
// if 101 is passed, an error would occur
```

## Required Flag Check

- `required?: boolean`
- It is set to false by default.
- It must be set to true for a flag that you want to make required, without which, an error will occur.

```js
// example:
{ long: 'git', required: true }
// node .       (ran in terminal without the --git flag)
// Error occurs.
```

**Next**: *[Flag Events](flag_events.md)*