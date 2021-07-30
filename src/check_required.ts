import { flag_schema } from './types'

export const check_required = (
  flag_schemas: flag_schema[],
  parsed_args: { [key: string]: any },
  cb: (err: null | string) => any
) => {
  const required_flags: string[] = flag_schemas
    .filter((flag_schema) => flag_schema.required)
    .map((flag_schema) => flag_schema.long)

  for (let i = 0; i < required_flags.length; i++) {
    if (typeof parsed_args[required_flags[i]] === 'undefined') {
      return cb(`Error: Required flag '${required_flags[i]}' is not entered.`)
    }
  }
  return cb(null)
}
