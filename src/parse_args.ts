import { flag_options } from './flag_options'
import { check_if_flag } from './check_if_flag'

export const initialize_args = (flag_models: flag_options[]) => {
  const initial_args: { [key: string]: any } = {}
  flag_models.forEach(({ default_value, long }) => {
    if (typeof default_value !== 'undefined') initial_args[long] = default_value
    else initial_args[long] = undefined
  })
  return initial_args
}

export const parse_args = (flag_models: flag_options[]) => {
  const args_passed: string[] = process.argv.slice(2)
  const initial_args = initialize_args(flag_models)
  args_passed.forEach((arg, i) => {
    return check_if_flag(
      flag_models,
      arg,
      (
        err: string | null,
        is_flag: boolean,
        flag_options: undefined | flag_options
      ) => {
        if (err) throw new Error(err)
        else {
          if (is_flag) {
            if (flag_options?.will_have_value) {
              if (typeof args_passed[i + 1] !== 'undefined') {
                const value = args_passed[i + 1]
                const { on_value } = flag_options
                if (on_value) {
                  on_value(value, (err: string | null) => {
                    if (err) throw new Error(err)
                  })
                }
                initial_args[flag_options.long] = value
              } else throw new Error(`Value not passed for ${arg}`)
            } else {
              initial_args[(flag_options as flag_options).long] = true
            }
          } else {
            // console.log(`${arg} is a value`)
          }
        }
      }
    )
  })
  return initial_args
}
