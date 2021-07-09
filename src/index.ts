import { flag_options } from './flag_options'
import { parse_args } from './parse_args'

const flag_models: flag_options[] = [
  {
    long: 'firstname',
    will_have_value: true,
    must_not_be_empty: true,
    type: 'string',
    minLength: 2,
    maxLength: 10,
  },
  {
    long: 'lastname',
    will_have_value: true,
    must_not_be_empty: true,
    minLength: 2,
    maxLength: 10,
    // without type string, coz it is the default
  },
  {
    long: 'gender',
    will_have_value: true,
    must_not_be_empty: true,
    // TODO: enum
  },
  {
    long: 'hobbies',
    will_have_value: true,
    must_not_be_empty: true,
    type: 'arr_of_string',
  },
  {
    long: 'past-salaries',
    will_have_value: true,
    must_not_be_empty: true,
    type: 'arr_of_float',
  },
]

const args = parse_args(flag_models)
console.log(args)
