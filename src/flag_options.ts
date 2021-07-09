export type flag_options = {
  short?: string
  long: string
  will_have_value?: boolean
  default_value?: any
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => void
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
    | 'arr_of_integer'
    | 'arr_of_float'
    | 'arr_of_string'
}
