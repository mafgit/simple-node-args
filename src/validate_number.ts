import { flag_schema } from './types'

export const validate_number = (
  flag: string,
  value: number,
  flag_schema: flag_schema,
  cb: (err?: string) => any
) => {
  // Checking min, max
  const { min, max } = flag_schema
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
