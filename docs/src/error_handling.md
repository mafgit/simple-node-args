# Error Handling

- When any error occurs, `program.on_error` function is called and an error is passed to it.
- The default function is:

```js
program.on_error = (err: string) => {
  throw new Error(err)
}
```

- You can change the behavior of the function like:

```js
// write this before program.parse
program.on_error = (err) => {
  console.log(err)
}
program.parse(...)
```

**Next**: *[Help Message](src/help_message.md)*