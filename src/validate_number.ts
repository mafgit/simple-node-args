import { flag_options } from './types'

export const validate_number = (
  flag: string,
  value: number,
  flag_options: flag_options,
  cb: (err?: string) => any
) => {
  // Checking min, max
  const { min, max } = flag_options
  if (typeof max !== 'undefined') {
    if (value > max)
      return cb(`Error: Value of '${flag}' must not exceed ${max}.`)
  }
  if (typeof min !== 'undefined') {
    if (value < min)
      return cb(`Error: Value of '${flag}' must be at least ${min}.`)
  }
  return cb()
}
// x---x Checking min, max x---x
