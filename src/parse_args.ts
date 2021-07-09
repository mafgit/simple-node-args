import { flag_options } from './flag_options'
import { check_if_flag } from './check_if_flag'
import { check_required } from './check_required'
import { initialize_args } from './initialize_args'
import { check_type } from './check_type'

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
                let is_arr: boolean = false
                let arr_value: any[] = []
                const { on_value, must_not_be_empty } = flag_options
                let { type } = flag_options

                if (must_not_be_empty && value === '')
                  throw new Error(
                    `Empty Value Error: Value not provided for ${args_passed[i]}`
                  )

                // checking types
                if (type) {
                  if (!type.startsWith('arr_of_'))
                    check_type(
                      type as 'string' | 'integer' | 'float',
                      value,
                      args_passed[i],
                      (err, parsed_value) => {
                        if (err) throw new Error(err)
                        value = parsed_value
                      }
                    )
                  else {
                    // values are of an array
                    for (let j = i + 1; j < args_passed.length; j++) {
                      if (args_passed[j].startsWith('-')) break
                      else {
                        is_arr = true
                        let val_type = type.replace('arr_of_', '')
                        check_type(
                          val_type as 'string' | 'integer' | 'float',
                          args_passed[j],
                          args_passed[i],
                          (err, parsed_value) => {
                            if (err) throw err
                            arr_value.push(parsed_value)
                          }
                        )
                      }
                    }
                  }
                } else type = 'string'
                // --x--

                if (type === 'string') {
                  // Checking minLength, maxLength
                  const { minLength, maxLength } = flag_options
                  if (typeof minLength !== 'undefined') {
                    if (value.length < minLength)
                      throw new Error(
                        `Validation Error: Length of the value of ${args_passed[i]}, ${value.length}, is smaller than the minLength, ${minLength}.`
                      )
                  }
                  if (typeof maxLength !== 'undefined') {
                    if (value.length > maxLength)
                      throw new Error(
                        `Validation Error: Length of the value of ${args_passed[i]}, ${value.length}, is greater than the maxLength, ${maxLength}.`
                      )
                  }
                  const enum_arr: string[] | undefined = flag_options.enum
                  if (typeof enum_arr !== 'undefined') {
                    if (!enum_arr.includes(value))
                      throw new Error(
                        `Validation Error: The value for ${args_passed[i]} does not pass the enum test.`
                      )
                  }
                } else if (type === 'float' || type === 'integer') {
                  // Checking min, max
                  const { min, max } = flag_options
                  if (typeof max !== 'undefined') {
                    if (value > max)
                      throw new Error(
                        `Validation Error: Expected the value of ${args_passed[i]} to not exceed ${max}.`
                      )
                  }
                  if (typeof min !== 'undefined') {
                    if (value < min)
                      throw new Error(
                        `Validation Error: Expected the value of ${args_passed[i]} to be at least ${min}.`
                      )
                  }
                }
                // --x--

                // Checking min, max

                // --x--

                if (on_value) {
                  on_value(value, (err: string | null, new_value: any) => {
                    if (err) throw new Error(err)
                    if (typeof new_value !== 'undefined') value = new_value
                  })
                }

                if (is_arr) initial_args[flag_options.long] = arr_value
                else initial_args[flag_options.long] = value
              } else
                throw new Error(
                  `Validation Error: Value not passed for ${args_passed[i]}`
                )
            } else {
              initial_args[(flag_options as flag_options).long] = true
            }
          }
          // else {
          //   console.log(`${args_passed[i]} is a value`)
          // }
        }
      }
    )
  }
  return check_required(flag_models, initial_args, (err) => {
    if (err) throw new Error(err)
    return initial_args
  })
}
