export const check_type = (
  type: 'string' | 'integer' | 'float' | 'boolean',
  value: string,
  flag: string,
  cb: (err: string | null, parsed_value?: any) => any
) => {
  // boolean
  if (type === 'boolean') {
    if (value.toLowerCase() === 'true') return cb(null, true)
    else if (value.toLowerCase() === 'false') return cb(null, false)
    else return cb(`Type Error: Expected ${type}, got '${value}' for ${flag}`)
  }

  // number
  else if (type === 'integer' || type === 'float') {
    if (isNaN(parseFloat(value)))
      return cb(`Type Error: Expected ${type}, got '${value}' for ${flag}`)
    else if (type === 'float') return cb(null, parseFloat(value))
    else if (type === 'integer') return cb(null, parseInt(value))
  }

  // string
  else if (type === 'string') return cb(null, value)
}
