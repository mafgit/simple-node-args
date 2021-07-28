# Help Message

> You must specify `help_flag: true` in the flag which you want to act as the help flag.

- Program Details can also be provided while creating an instance of the class Program as discussed in [Get Started](src/get_started.md#program-details)

### help_flag

- `help_flag?: boolean`
- It must be set to true for the flag, which when passed, help message is shown. 
- You don't need to set will_have_value to false when you set help_flag to true.

> You can provide the following optional details for the flag to make the help message clearer:

### Flag Description

- `description?: string`
- Description of a flag, which is used to generate better help message.

```js
  // example:
  { ..., description: 'Specify the name' }
```

### value_title

- It is used in the help message, e.g.,

```js
// example:
{ ..., value_title: 'fullname' }
// the help message will look like:
// -n, --name <fullname>  Fullname of the person
// otherwise: there would be <string> instead of <fullname>
```

## Custom Help Message

- There are two ways to do this.
- The first way to run `program.help_message = 'my custom help message'` BEFORE `program.parse(...)`.
- The second way is to use the on_flag event to console.log your custom message when the flag is mentioned.