export type flag_options = {
  short?: string
  long: string
  will_have_value?: boolean
  required?: boolean
  default_value?: any
  value_must_not_be_empty?: boolean
  type?:
    | 'integer'
    | 'float'
    | 'string'
    | 'arr_of_integer'
    | 'arr_of_float'
    | 'arr_of_string'
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => void
}
