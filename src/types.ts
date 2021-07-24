export type flag_options = {
  // Details:
  long: string
  short?: string
  description?: string
  will_have_value?: boolean
  default_value?: any
  value_title?: string
  help_flag?: boolean
  // Events:
  on_flag?: () => any
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => any
  // Validations:
  required?: boolean
  regex?: RegExp
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

export type contact = {
  name: string
  value: string
}

export type link = {
  name: string
  url: string
}

export type program_details = {
  name: string
  description?: string
  version?: string
  links?: link[]
  contacts?: contact[]
}
