import { flag_options } from './flag_options'
import { parse_args } from './parse_args'

const flag_models: flag_options[] = [
  {
    long: 'git',
    will_have_value: false,
  },
  { short: 'h', long: 'help', will_have_value: false },
  { short: 'v', long: 'version', will_have_value: false },
  {
    short: 'p',
    long: 'path',
    will_have_value: true,
    default_value: './backend/',
  },
  {
    short: 'd',
    long: 'dependencies',
    will_have_value: true,
  },
  {
    short: 'dd',
    long: 'devDependencies',
    will_have_value: true,
    default_value: 'nodemon',
  },
]

const args = parse_args(flag_models)
