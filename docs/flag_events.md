# Flag Events

> These are functions which are run at specific times, and you can take advantage of them.

## on_flag

- `on_flag: () => any` is an event that runs when the flag is encountered.

```js
// example:
{ long: 'git', on_flag: () => { console.log('Initializing Git') } }
```

## on_value

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

**Next**: *[Error Handling](error_handling.md)*
