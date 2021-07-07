export type flag_options = {
  short?: string
  long: string
  will_have_value: boolean
  required?: boolean
  default_value?: any
  on_value?: (value: string, cb: (err: string | null) => void) => void
}
