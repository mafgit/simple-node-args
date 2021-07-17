export type flag_options = {
  long: string
  short?: string
  description?: string
  will_have_value?: boolean
  default_value?: any
  value_title?: string
  help_flag?: boolean
  custom_help_msg?: string
  on_flag?: () => any
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => any
  // Validations:
  required?: boolean
  must_not_be_empty?: boolean
  enum?: Array<string>
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  type?:
    | 'integer'
    | 'float'
    | 'string'
    | 'boolean'
    | 'arr_of_integer'
    | 'arr_of_float'
    | 'arr_of_string'
}
