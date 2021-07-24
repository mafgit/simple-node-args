import { flag_options } from './types'

export const validate_string = (
  flag: string,
  value: string,
  flag_options: flag_options,
  cb: (err?: string) => any
): any => {
  // Checking min_length, max_length
  const { min_length, max_length, regex, enum: enum_arr } = flag_options
  if (typeof min_length !== 'undefined') {
    if (value.length < min_length)
      return cb(
        `Validation Error: Length of the value of ${flag}, ${value.length}, is smaller than the min_length, ${min_length}.`
      )
  }
  if (typeof max_length !== 'undefined') {
    if (value.length > max_length)
      cb(
        `Validation Error: Length of the value of ${flag}, ${value.length}, is greater than the max_length, ${max_length}.`
      )
  }
  // x---x Checking min_length, max_length x---x

  // checking enum
  if (typeof enum_arr !== 'undefined') {
    if (!enum_arr.includes(value))
      cb(`Validation Error: The value for ${flag} does not pass the enum test.`)
  }
  // x---x checking enum x---x

  // checking regex
  if (typeof regex !== 'undefined') {
    if (!regex.test(value))
      cb(
        `Validation Error: The value for ${flag} does not pass the regex test.`
      )
  }
  // x---x checking regex x---x

  return cb()
}
