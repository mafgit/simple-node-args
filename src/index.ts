import { flag_options } from './flag_options'
import { parse_args } from './parse_args'

const flag_models: flag_options[] = [
  // doesn't have short name
  { long: 'age', will_have_value: true, type: 'integer' },
  // has on_value and required and will_have_value
  {
    long: 'name',
    short: 'n',
    will_have_value: true,
    required: true,
    on_value: (val: string, cb) => {
      if (val.length < 5) cb('Name must be longer than 4 characters')
      else cb(null, val.toUpperCase())
    },
  },
  // has default
  {
    long: 'gender',
    short: 'g',
    default_value: 'male',
  },
]

const args = parse_args(flag_models)
console.log(args)
