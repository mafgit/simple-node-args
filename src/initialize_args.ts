import { flag_options } from './flag_options'

export const initialize_args = (flag_models: flag_options[]) => {
  const initial_args: { [key: string]: any } = {}
  flag_models.forEach(({ default_value, long }) => {
    if (typeof default_value !== 'undefined') initial_args[long] = default_value
  })
  return initial_args
}
