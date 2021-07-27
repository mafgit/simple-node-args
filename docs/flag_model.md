# Models

> Flag model is an object that defines a flag and its details. All the flag models are defined in an array which will later be passed into a function that parses arguments according to the flag models. 

```js
const flag_models = [
  {}, {}, {}
]
// this array will be passed to a parse function later
```

## Flag Details

> Define flag's details such as long and short identifiers, it's description, default value, etc.

### long

- It defines the long flag identifier such as `--name`.
- It is the only required field.

```js
  // example:
  { long: 'name' } // must be without dashes
```

### short

- It defines the short flag identifier such as `-n`.

```js
  // example:
  { ..., short: 'n' } // must be without dashes
```

### description

- Description of a flag, which is used to generate better help message.

```js
  // example:
  { ..., description: 'Specify the name' }
```

### will_have_value

- It is a boolean, which is set to true by default.
- It indicates that the next argument passed after the flag is the value for the flag.
- If set to true, and no argument is passed after the flag, an error will occur.
- It must be set to false if you want a flag like `--git` which would not have a value after it.

### default

- It is used to specify the default value for a flag if the flag is not passed.

### value_title

- It is used in the help message, e.g.,

```js
// example:
{ ..., value_title: 'fullname' }
// the help message will look like:
// -n, --name <fullname>  Fullname of the person
```

### help_flag

- It is of type boolean.
- It must be set to true for the flag, which when passed, help message is shown.

## Flag Events

### on_flag

- `on_flag: () => any` is an event that runs when the flag is encountered.
```js
// example:
{ long: 'git', on_flag: () => { console.log('Initializing Git') } }
```

### on_value

```js
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => any
```
- This is an event that runs when value for the flag is encountered.
- You get the value and a callback in the parameter.
- You can use it to do extra validations with the value, or to modify the value before saving to args object.
- You must pass the callback at the end of the function, with an error and the new value.
```js
// example:
{ ..., on_value: (name, cb) => {
  if (!name.endsWith('n'))
    return cb('Error: name must end with "n"') // a silly error example.
  return cb(null, name.toUpperCase()) // error is null, and name is saved in uppercase.
}}
```

## Flag Validations

### type

- For type checking.
- It accepts the following values: `'integer' | 'float' | 'string' | 'boolean' | 'arr_of_integer' | 'arr_of_float' | 'arr_of_string'`.
- It is set to string by default.
- If it is set to `arr_of_` something, all the args passed after the flag, separated by a space, will be put in an array and set as the value of the flag.

### regex

- It is used to validate strings using a regex pattern.

```js
// example:
{ ..., regex: /^[a-zA-Z]+$/ }
```

### min_length

- It is used for string validation.
- It must be set to an integer.

```js
// example:
{ ..., min_length: 5 }
// If "abcd" is passed, an error would occur.
```

### max_length

- It is used for string validation.
- It must be set to an integer.

```js
// example:
{ ..., max_length: 5 }
// If "abcdef" is passed, an error would occur.
```

### enum

- It is used for string validation.
- It is set to an array of strings, which contain the valid values for the flag. There would be an error if a value is passed that is not in the enum array.

```js
// example:
{ ..., enum: ['male', 'female'] }
```

### min

- It is used for integer and float validation.

```js
// example:
{ ..., min: 18 }
// if 17 is passed, an error would occur
```

### max

- It is used for integer and float validation.

```js
// example:
{ ..., max: 100 }
// if 101 is passed, an error would occur
```

### required

- It is of type boolean.
- It is set to false by default.
- It must be set to true for a flag that you want to make required, without which, an error will occur.

```js
// example:
{ long: 'git', required: true }
// node .       (ran in terminal without the --git flag)
// Error occurs.
```

**Next**: *[Handling Errors](on_error.md)*