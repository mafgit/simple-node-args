import { flag_schema } from './types'

export const initialize_args = (flag_schemas: flag_schema[]) => {
  const initial_args: { [key: string]: any } = {}
  flag_schemas.forEach(({ default: default_value, long }) => {
    if (typeof default_value !== 'undefined') initial_args[long] = default_value
  })
  return initial_args
}
