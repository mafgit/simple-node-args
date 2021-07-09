import { flag_options } from './flag_options'
import { check_if_flag } from './check_if_flag'
import { check_required } from './check_required'

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
  for (let i = 0; i < args_passed.length; i++) {
    check_if_flag(
      flag_models,
      args_passed[i],
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
                // for loop for args values array
                let value: any = args_passed[i + 1]
                const { on_value, value_must_not_be_empty, type } = flag_options

                // checking types, default is string, no need to check
                if (
                  (type === 'integer' || type === 'float') &&
                  isNaN(parseFloat(value))
                )
                  throw new Error(`Type Error: Expected ${type}, received NaN`)
                if (type === 'integer') value = parseInt(value)
                else if (type === 'float') value = parseFloat(value)

                if (value_must_not_be_empty && value === '')
                  throw new Error(
                    `Empty Value Error: Value not provided for ${args_passed[i]}`
                  )
                if (on_value) {
                  on_value(value, (err: string | null, new_value: any) => {
                    if (err) throw new Error(err)
                    if (typeof new_value !== 'undefined') value = new_value
                  })
                }
                initial_args[flag_options.long] = value
              } else
                throw new Error(
                  `No Value Error: Value not passed for ${args_passed[i]}`
                )
            } else {
              initial_args[(flag_options as flag_options).long] = true
            }
          } else {
            // console.log(`${args_passed[i]} is a value`)
          }
        }
      }
    )
  }
  return check_required(flag_models, initial_args, (err) => {
    if (err) throw new Error(err)
    return initial_args
  })
}
