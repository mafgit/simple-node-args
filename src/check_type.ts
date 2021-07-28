export const is_num = (val: string): boolean => {
  return /^([-+]?\d+)(\.\d+)?$/.test(val)
}

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
    else
      return cb(
        `Error: Expected value of type: ${type} for '${flag}', got '${value}'.`
      )
  }

  // number
  else if (type === 'integer' || type === 'float') {
    // checking if arg passed is actually a number
    if (!is_num(value))
      return cb(
        `Error: Expected value of type: ${type} for '${flag}', got '${value}'.`
      )
    else if (type === 'float') return cb(null, parseFloat(value))
    else if (type === 'integer') return cb(null, parseInt(value))
  }

  // string
  else if (type === 'string') return cb(null, value)
}
