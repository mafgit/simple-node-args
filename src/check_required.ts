import { flag_options } from './types'

export const check_required = (
  flag_models: flag_options[],
  parsed_args: { [key: string]: any },
  cb: (err: null | string) => any
) => {
  const required_flags: string[] = flag_models
    .filter((flag_model) => flag_model.required)
    .map((flag_model) => flag_model.long)

  for (let i = 0; i < required_flags.length; i++) {
    if (typeof parsed_args[required_flags[i]] === 'undefined') {
      return cb(`Error: Required flag '${required_flags[i]}' is not entered.`)
    }
  }
  return cb(null)
}
