export type flag_options = {
  short?: string
  long: string
  will_have_value: boolean
  required?: boolean
  default_value?: any
  // type?: 'number' | 'number' | 'arr_of_numbers' | 'arr_of_strings'
  // 'number'
  // | 'boolean'
  // | 'string'
  // | 'arr_of_strings'
  // | 'arr_of_numbers'
  // | 'arr_of_any'
  on_value?: (value: string, cb: (err: string | null) => void) => void
}
