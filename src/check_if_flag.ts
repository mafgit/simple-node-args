import { flag_options } from './types'

export const check_if_flag = (
  flag_models: flag_options[],
  arg: string,
  cb: (
    err: string | null,
    is_flag?: boolean,
    flag_options?: flag_options
  ) => any
) => {
  let flag_options: undefined | flag_options
  let is_flag: boolean = false
  // checking if it is a flag or a value
  if (arg.startsWith('-')) {
    // arg must be a flag
    if (arg.startsWith('--')) {
      // the arg must be long
      const arg_sliced: string = arg.slice(2)
      // checking if the flag exists
      flag_options = flag_models.find(({ long }) => arg_sliced === long)
      if (!flag_options) return cb(`Flag Error: ${arg} is an invalid flag.`)
      is_flag = true
    } else {
      // the arg must be short
      const arg_sliced: string = arg.slice(1)
      flag_options = flag_models.find(
        ({ short }) => short && arg_sliced === short
      )
      if (!flag_options) return cb(`Flag Error: ${arg} is an invalid flag.`)
      else is_flag = true
    }
  }
  return cb(null, is_flag, flag_options)
}
