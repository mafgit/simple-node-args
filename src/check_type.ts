export const check_type = (
  type: 'string' | 'integer' | 'float',
  value: string,
  flag: string,
  cb: (err: string | null, parsed_value?: any) => any
) => {
  if (type === 'integer' || type === 'float') {
    if (isNaN(parseFloat(value)))
      return cb(`Type Error: Expected ${type}, got ${value} for ${flag}`)
    else if (type === 'float') return cb(null, parseFloat(value))
    else if (type === 'integer') return cb(null, parseInt(value))
  } else return cb(null, value)
}
