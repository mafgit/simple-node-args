# Flag Details

> Define flag's details such as long and short identifiers, etc.

## Long Identifier

- `long: string`
- It defines the long flag identifier such as `--name`.
- It must not be a number like `'123'`
- It is the only required field.

```js
  // example:
  { long: 'name' } // must be without dashes
```

## Short Identifier

- `short?: string`
- It defines the short flag identifier such as `-n`.
- It must not be a number like `'123'`

```js
  // example:
  { ..., short: 'n' } // must be without dashes
```

## Will Have Value

- `will_have_value?: boolean`
- It is set to true by default.
- It indicates that the next argument passed after the flag is the value for the flag.
- If set to true, and no argument is passed after the flag, an error will occur.
- It must be set to false if you want a flag like `--git` which would not have a value after it.

## Default Value

- `default?: any`
- It is used to specify the default value for a flag if the flag is not passed.

**Next**: *[Flag Validations](flag_validations.md)*
