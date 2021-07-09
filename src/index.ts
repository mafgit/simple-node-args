import { flag_options } from './flag_options'
import { parse_args } from './parse_args'

const flag_models: flag_options[] = [
  {
    long: 'firstname',
    will_have_value: true,
    value_must_not_be_empty: true,
    type: 'string',
  },
  {
    long: 'lastname',
    will_have_value: true,
    value_must_not_be_empty: true,
    // without type string, coz it is the default
  },
  {
    long: 'gender',
    will_have_value: true,
    value_must_not_be_empty: true,
    // TODO: enum
  },
  {
    long: 'hobbies',
    will_have_value: true,
    value_must_not_be_empty: true,
    type: 'arr_of_string',
  },
  {
    long: 'past-salaries',
    will_have_value: true,
    value_must_not_be_empty: true,
    type: 'arr_of_float',
  },
]

const args = parse_args(flag_models)
console.log(args)
