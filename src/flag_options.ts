export type flag_options = {
  long: string
  short?: string
  description?: string
  will_have_value?: boolean
  default_value?: any
  value_title?: string
  help_flag?: boolean
  on_flag?: () => any
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => any
  // Validations:
  required?: boolean
  enum?: string[]
  min?: number
  max?: number
  min_length?: number
  max_length?: number
  type?:
    | 'integer'
    | 'float'
    | 'string'
    | 'boolean'
    | 'arr_of_integer'
    | 'arr_of_float'
    | 'arr_of_string'
}
