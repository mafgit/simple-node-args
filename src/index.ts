import { contact, flag_options, link, program_details } from './types'
import { check_if_flag } from './check_if_flag'
import { check_required } from './check_required'
import { initialize_args } from './initialize_args'
import { check_type } from './check_type'
import { validate_string } from './validate_string'
import { validate_number } from './validate_number'
import { gen_help_message } from './gen_help_message'

class Program {
  name: string
  description?: string
  version?: string
  args: { [key: string]: any }
  help_message: string
  links?: link[]
  contacts?: contact[]
  on_error: (err: string) => any

  constructor(details: program_details) {
    const { name, description, version, links, contacts } = details
    this.name = name
    this.description = description
    this.version = version
    this.links = links || []
    this.contacts = contacts || []
    this.help_message = ''
    this.args = {}
    this.on_error = (err: string) => {
      throw new Error(err)
    }
  }

  parse(flag_models: flag_options[], args_passed: string[]) {
    args_passed = args_passed.slice(2)
    const initial_args = initialize_args(flag_models)
    for (let i = 0; i < args_passed.length; i++) {
      check_if_flag(
        flag_models,
        args_passed[i],
        (
          err: string | null,
          is_flag: boolean | undefined,
          flag_options: flag_options | undefined
        ) => {
          if (err) this.on_error(err)
          else {
            if (is_flag) {
              if (flag_options?.help_flag) {
                if (!this.help_message)
                  this.help_message = gen_help_message(
                    {
                      name: this.name,
                      description: this.description,
                      version: this.version,
                      links: this.links,
                      contacts: this.contacts,
                    },
                    flag_models
                  )
                console.log(this.help_message)
              }

              // default for will_have_value is true
              if (typeof flag_options!.will_have_value === 'undefined')
                flag_options!.will_have_value = true
              // default for type is 'string'
              if (typeof flag_options!.type === 'undefined')
                flag_options!.type = 'string'

              if (flag_options!.will_have_value === true) {
                if (typeof args_passed[i + 1] !== 'undefined') {
                  // for loop for args values array
                  let value: any = args_passed[i + 1]
                  let is_arr: boolean = false
                  let arr_value: any[] = []
                  const { on_value } = flag_options!
                  let { type } = flag_options!

                  // checking types
                  if (!type!.startsWith('arr_of_'))
                    check_type(
                      type as 'string' | 'integer' | 'float' | 'boolean',
                      value,
                      args_passed[i],
                      (err, parsed_value) => {
                        if (err) this.on_error(err)
                        value = parsed_value
                      }
                    )
                  else {
                    // values are of an array
                    for (let j = i + 1; j < args_passed.length; j++) {
                      if (args_passed[j].startsWith('-')) break
                      else {
                        is_arr = true
                        let val_type = type!.replace('arr_of_', '')
                        check_type(
                          val_type as
                            | 'string'
                            | 'integer'
                            | 'float'
                            | 'boolean',
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
                  // --x--

                  // VALIDATIONS
                  if (type === 'string') {
                    validate_string(
                      args_passed[i],
                      value,
                      flag_options!,
                      (err) => {
                        if (err) this.on_error(err)
                      }
                    )
                  } else if (type === 'float' || type === 'integer') {
                    validate_number(
                      args_passed[i],
                      value,
                      flag_options!,
                      (err) => {
                        if (err) this.on_error(err)
                      }
                    )
                  }

                  if (on_value) {
                    on_value(value, (err: string | null, new_value: any) => {
                      if (err) this.on_error(err)
                      if (typeof new_value !== 'undefined') value = new_value
                    })
                  }

                  if (is_arr) initial_args[flag_options!.long] = arr_value
                  else initial_args[flag_options!.long] = value
                } else
                  this.on_error(
                    `Error: Value not passed for '${args_passed[i]}'`
                  )
              } else {
                const on_flag = flag_options?.on_flag
                if (on_flag) on_flag()
                initial_args[flag_options!.long] = true
              }
            }
            // else console.log(`${args_passed[i]} is a value`)
          }
        }
      )
    }
    check_required(flag_models, initial_args, (err) => {
      if (err) this.on_error(err)
      this.args = initial_args
    })
  }
}

export = Program
