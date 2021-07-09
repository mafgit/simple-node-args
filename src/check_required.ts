import { flag_options } from './flag_options'

export const check_required = (
  flag_models: flag_options[],
  parsed_args: { [key: string]: any },
  cb: (err: null | string) => void
) => {
  const required_flags = flag_models
    .filter((flag_model) => flag_model.required)
    .map((flag_model) => flag_model.long)
  required_flags.forEach((required_flag) => {
    if (typeof parsed_args[required_flag] === 'undefined') {
      return cb(
        `Validation Error: You did not pass a value for the required flag '${required_flag}'.`
      )
    }
  })
  return cb(null)
}
