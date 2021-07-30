import { contact, flag_schema, link, program_details } from './types'
import { check_if_flag, might_be_flag } from './check_if_flag'
import { check_required } from './check_required'
import { initialize_args } from './initialize_args'
import { check_type, is_num } from './check_type'
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

  /**
   * Parses the arguments and puts them in program.args
   * @param args_passed Pass process.argv here which contains the arguments passed into your node.js program.
   * @param flag_schemas An array containing flag schemas. It is an optional argument.
   */
  parse(args_passed: string[], flag_schemas: flag_schema[] = []) {
    args_passed = args_passed.slice(2)
    if (flag_schemas.length > 0) {
      const initial_args = initialize_args(flag_schemas)
      for (let i = 0; i < args_passed.length; i++) {
        check_if_flag(
          flag_schemas,
          args_passed[i],
          (
            err: string | null,
            is_flag: boolean | undefined,
            flag_schema: flag_schema | undefined
          ) => {
            if (err) this.on_error(err)
            else {
              if (is_flag) {
                if (flag_schema?.help_flag) {
                  if (!this.help_message)
                    this.help_message = gen_help_message(
                      {
                        name: this.name,
                        description: this.description,
                        version: this.version,
                        links: this.links,
                        contacts: this.contacts,
                      },
                      flag_schemas
                    )
                  console.log(this.help_message)
                }

                // default for will_have_value is true
                if (
                  typeof flag_schema!.will_have_value === 'undefined' &&
                  !flag_schema!.help_flag
                )
                  // if help flag, then don't flip set to true
                  flag_schema!.will_have_value = true
                // default for type is 'string'
                if (typeof flag_schema!.type === 'undefined')
                  flag_schema!.type = 'string'

                if (flag_schema!.will_have_value === true) {
                  if (typeof args_passed[i + 1] !== 'undefined') {
                    // for loop for args values array
                    let value: any = args_passed[i + 1]
                    let is_arr: boolean = false
                    let arr_value: any[] = []
                    const { on_value } = flag_schema!
                    let { type } = flag_schema!

                    // checking types
                    if (!type!.endsWith('[]'))
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
                        if (might_be_flag(args_passed[j])) break
                        else {
                          is_arr = true
                          let val_type = type!.replace('[]', '')
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
                        flag_schema!,
                        (err) => {
                          if (err) this.on_error(err)
                        }
                      )
                    } else if (type === 'float' || type === 'integer') {
                      validate_number(
                        args_passed[i],
                        value,
                        flag_schema!,
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

                    if (is_arr) initial_args[flag_schema!.long] = arr_value
                    else initial_args[flag_schema!.long] = value
                  } else
                    this.on_error(
                      `Error: Value not passed for '${args_passed[i]}'`
                    )
                } else {
                  const on_flag = flag_schema?.on_flag
                  if (on_flag) on_flag()
                  initial_args[flag_schema!.long] = true
                }
              }
            }
          }
        )
      }
      check_required(flag_schemas, initial_args, (err) => {
        if (err) this.on_error(err)
        this.args = initial_args
      })
    } else {
      // schema-less
      for (let i = 0; i < args_passed.length; i++) {
        const flag_name = args_passed[i].replace(/-/g, '')
        if (might_be_flag(args_passed[i])) {
          // checking if will_have_value: false
          if (
            typeof args_passed[i + 1] === 'undefined' ||
            might_be_flag(args_passed[i + 1])
          ) {
            this.args[flag_name] = true
          } else {
            if (
              typeof args_passed[i + 2] !== 'undefined' &&
              !might_be_flag(args_passed[i + 2])
            ) {
              // is an array of values
              let arr = []
              for (let j = i + 1; j < args_passed.length; j++) {
                if (might_be_flag(args_passed[j])) break
                else arr.push(args_passed[j])
              }
              this.args[flag_name] = arr
            } else {
              // is just one value
              this.args[flag_name] = args_passed[i + 1]
            }
          }
        }
      }
    }
  }
}

export = Program
