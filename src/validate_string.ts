import { flag_schema } from './types'

export const validate_string = (
  flag: string,
  value: string,
  flag_schema: flag_schema,
  cb: (err?: string) => any
): any => {
  // Checking min_length, max_length
  const { min_length, max_length, regex, enum: enum_arr } = flag_schema
  if (typeof min_length !== 'undefined') {
    if (value.length < min_length)
      return cb(
        `Error: Value of '${flag}' must contain at least ${min_length} characters.`
      )
  }
  if (typeof max_length !== 'undefined') {
    if (value.length > max_length)
      cb(
        `Error: Value of '${flag}' must not contain more than ${max_length} characters.`
      )
  }
  // x---x Checking min_length, max_length x---x

  // checking enum
  if (typeof enum_arr !== 'undefined') {
    if (!enum_arr.includes(value))
      cb(`Error: Value passed for '${flag}' is invalid.`)
  }
  // x---x checking enum x---x

  // checking regex
  if (typeof regex !== 'undefined') {
    if (!regex.test(value)) cb(`Error: Value passed for '${flag}' is invalid.`)
  }
  // x---x checking regex x---x

  return cb()
}
