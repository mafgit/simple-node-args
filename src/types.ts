export type flag_schema = {
  // Details:
  long: string
  short?: string
  description?: string
  will_have_value?: boolean
  default?: any
  value_title?: string
  help_flag?: boolean
  // Events:
  on_flag?: () => any
  on_value?: (
    value: string,
    cb: (err: string | null, new_value?: any) => any
  ) => any
  // Validations:
  type?:
    | 'integer'
    | 'float'
    | 'string'
    | 'boolean'
    | 'integer[]'
    | 'float[]'
    | 'string[]'
  regex?: RegExp // string
  min_length?: number // string
  max_length?: number // string
  enum?: string[] // string
  min?: number // integer / float
  max?: number // integer / float
  required?: boolean
}

export type contact = {
  name: string
  value: string
}

export type link = {
  name: string
  value: string
}

export type program_details = {
  name: string
  description?: string
  version?: string
  links?: link[]
  contacts?: contact[]
}
