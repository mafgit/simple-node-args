import { is_num } from './check_type'
import { flag_schema } from './types'

export const might_be_flag = (arg: string) => {
  return arg.startsWith('-') && !is_num(arg)
}

export const check_if_flag = (
  flag_schemas: flag_schema[],
  arg: string,
  cb: (err: string | null, is_flag?: boolean, flag_schema?: flag_schema) => any
) => {
  let flag_schema: undefined | flag_schema
  let is_flag: boolean = false
  // checking if it is a flag or a value
  if (might_be_flag(arg)) {
    // arg must be a flag
    if (arg.startsWith('--')) {
      // the arg must be long
      const arg_sliced: string = arg.slice(2)
      // checking if the flag exists
      flag_schema = flag_schemas.find(({ long }) => arg_sliced === long)
      if (!flag_schema) return cb(`Error: ${arg} is an invalid flag.`)
      is_flag = true
    } else {
      // the arg must be short
      const arg_sliced: string = arg.slice(1)
      flag_schema = flag_schemas.find(
        ({ short }) => short && arg_sliced === short
      )
      if (!flag_schema) return cb(`Error: ${arg} is an invalid flag.`)
      else is_flag = true
    }
  }
  return cb(null, is_flag, flag_schema)
}
