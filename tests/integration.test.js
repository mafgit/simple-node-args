const Program = require('../dist/index')
const program = new Program({ name: 'test' })

describe('Enum tests', () => {
  test('should pass, passing invalid values for enum', () => {
    const flag_schemas = [{ long: 'ans', enum: ['yes', 'no', 'y', 'n'] }]
    const process_args = ['', '', '--ans', 'YES']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value passed for '--ans' is invalid.`,
    })
  })

  test('should pass, passing valid value for enum', () => {
    const flag_schemas = [{ long: 'ans', enum: ['yes', 'no', 'y', 'n'] }]
    const process_args = ['', '', '--ans', 'no']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).not.toThrowError()
    expect(program.args.ans).toBe('no')
  })
})

describe('min tests for numbers', () => {
  const flag_schemas = [{ long: 'age', type: 'integer', min: 18 }]
  test('should fail, passing value lower than min', () => {
    const process_args = ['', '', '--age', '17']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value of '--age' must be at least 18.`,
    })
  })

  test('should pass, passing values equal to and greater than min', () => {
    const process_args = ['', '', '--age', '18']
    program.parse(process_args, flag_schemas)
    expect(program.args.age).toBe(18)
    process_args[3] = '19'
    program.parse(process_args, flag_schemas)
    expect(program.args.age).toBe(19)
  })
})

describe('max tests for numbers', () => {
  const flag_schemas = [{ long: 'age', type: 'integer', max: 20 }]
  test('should fail, passing value higher than max', () => {
    const process_args = ['', '', '--age', '21']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value of '--age' must not exceed 20.`,
    })
  })

  test('should pass, passing values equal to and lower than max', () => {
    const process_args = ['', '', '--age', '20']
    program.parse(process_args, flag_schemas)
    expect(program.args.age).toBe(20)
    process_args[3] = '19'
    program.parse(process_args, flag_schemas)
    expect(program.args.age).toBe(19)
  })
})

describe('min_length for strings', () => {
  const flag_schemas = [{ long: 'text', min_length: 5 }]
  test('should fail, passing empty string & another smaller than min_length', () => {
    const process_args = ['', '', '--text', '']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value of '--text' must contain at least 5 characters.`,
    })

    process_args[3] = 'text'
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value of '--text' must contain at least 5 characters.`,
    })
  })
  test('should pass, passing strings of sizes bigger than and equal to min_length', () => {
    const process_args = ['', '', '--text', 'hello']
    program.parse(process_args, flag_schemas)
    expect(program.args.text).toBe('hello')

    process_args[3] = 'hello brother'
    program.parse(process_args, flag_schemas)
    expect(program.args.text).toBe('hello brother')
  })
})

describe('max_length for strings', () => {
  const flag_schemas = [{ long: 'text', max_length: 5 }]
  test('should fail, passing string bigger than max_length', () => {
    const process_args = ['', '', '--text', 'hello!']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value of '--text' must not contain more than 5 characters.`,
    })
  })
  test('should pass, passing strings smaller than and equal to max_length', () => {
    const process_args = ['', '', '--text', 'hello']
    program.parse(process_args, flag_schemas)
    expect(program.args.text).toBe('hello')

    process_args[3] = 'hey'
    program.parse(process_args, flag_schemas)
    expect(program.args.text).toBe('hey')
  })
})

describe('regex', () => {
  const flag_schemas = [
    {
      long: 'email',

      regex:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
  ]
  test('should pass, passing valid value for regex', () => {
    const process_args = ['', '', '--email', 'valid19@email.com']
    program.parse(process_args, flag_schemas)
    expect(program.args.email === process_args[3])
  })
  test('should fail, passing invalid value for regex', () => {
    const process_args = ['', '', '--email', 'valid19@@email..com']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({
      message: `Error: Value passed for '--email' is invalid.`,
    })
  })
})

describe('default value test', () => {
  const flag_schemas = [
    {
      long: 'gender',
      default: 'male',
    },
  ]
  test('should have default value: "male" coz not passing anything', () => {
    const process_args = ['', '']
    program.parse(process_args, flag_schemas)
    expect(program.args.gender).toBe('male')
  })
  test('should have the new value: "female" coz passing explicitly', () => {
    const process_args = ['', '', '--gender', 'female']
    program.parse(process_args, flag_schemas)
    expect(program.args.gender).toBe('female')
  })
})

describe('required flag test', () => {
  test('should fail, not passing the required flag', () => {
    const flag_schemas = [{ long: 'name', required: true }]
    const process_args = ['', '']
    expect(() => {
      program.parse(process_args, flag_schemas)
    }).toThrowError({ message: `Error: Required flag 'name' is not entered.` })
  })
})

describe('type parsing', () => {
  describe('integer', () => {
    const flag_schemas = [{ long: 'age', type: 'integer' }]
    test('should parse to 18', () => {
      const args = ['', '', '--age', '18.9']
      program.parse(args, flag_schemas)
      expect(program.args.age).toBe(18)
    })
    test('should fail, passing value of invalid type', () => {
      const args = ['', '', '--age', 'x18.9']
      expect(() => {
        program.parse(args, flag_schemas)
      }).toThrowError({
        message: `Error: Expected value of type: integer for '--age', got 'x18.9'.`,
      })
    })
  })

  describe('float', () => {
    const flag_schemas = [{ long: 'age', type: 'float' }]
    test('should parse to 18.9', () => {
      const args = ['', '', '--age', '18.9']
      program.parse(args, flag_schemas)
      expect(program.args.age).toBe(18.9)
    })
    test('should fail, passing value of invalid type', () => {
      const args = ['', '', '--age', 'x18.9']
      expect(() => {
        program.parse(args, flag_schemas)
      }).toThrowError({
        message: `Error: Expected value of type: float for '--age', got 'x18.9'.`,
      })
    })
  })

  describe('boolean', () => {
    const flag_schemas = [{ long: 'git', type: 'boolean' }]
    test('should parse to true', () => {
      const args = ['', '', '--git', 'true']
      program.parse(args, flag_schemas)
      expect(program.args.git).toBe(true)
    })
    test('should parse to false', () => {
      const args = ['', '', '--git', 'false']
      program.parse(args, flag_schemas)
      expect(program.args.git).toBe(false)
    })
    test('should fail, passing invalid value for boolean', () => {
      const args = ['', '', '--git', 'truefalse']
      expect(() => {
        program.parse(args, flag_schemas)
      }).toThrowError({
        message: `Error: Expected value of type: boolean for '--git', got 'truefalse'.`,
      })
    })
  })

  describe('string', () => {
    const flag_schemas = [{ long: 'name', type: 'string' }]
    test('should parse to "8"', () => {
      const args = ['', '', '--name', '8']
      program.parse(args, flag_schemas)
      expect(program.args.name).toBe('8')
    })
    test('should parse to "8" even without mentioning type: "string"', () => {
      const args = ['', '', '--name', '8']
      flag_schemas.type = undefined
      program.parse(args, flag_schemas)
      expect(program.args.name).toBe('8')
    })
  })

  describe('array of integer', () => {
    const flag_schemas = [
      { long: 'nums', type: 'integer[]' },
      { long: 'age', type: 'integer' },
    ]
    test('should parse floats to integers', () => {
      const args = ['', '', '--nums', '0.7', '+3', '-4.3', '--age', '18']
      program.parse(args, flag_schemas)
      expect(program.args.nums).toEqual([0, 3, -4])
      expect(program.args.age).toEqual(18)
    })

    test('should fail, passing an invalid value among integers', () => {
      const args = ['', '', '--nums', '2', '3', '3a', '--age', '18']
      expect(() => {
        program.parse(args, flag_schemas)
      }).toThrowError({
        message: `Error: Expected value of type: integer for '--nums', got '3a'.`,
      })
    })
  })

  describe('array of float', () => {
    const flag_schemas = [
      { long: 'nums', type: 'float[]' },
      { long: 'age', type: 'integer' },
    ]
    test('should pass, passing valid floats', () => {
      const args = ['', '', '--nums', '0.7', '+3', '-4.3', '--age', '18']
      program.parse(args, flag_schemas)
      expect(program.args.nums).toEqual([0.7, 3, -4.3])
      expect(program.args.age).toEqual(18)
    })

    test('should fail, passing an invalid value among floats', () => {
      const args = ['', '', '--nums', '2.2', '3.3', '3a', '--age', '18']
      expect(() => {
        program.parse(args, flag_schemas)
      }).toThrowError({
        message: `Error: Expected value of type: float for '--nums', got '3a'.`,
      })
    })
  })
  describe('array of string', () => {
    const flag_schemas = [{ long: 'names', type: 'string[]' }]
    test('should pass, passing strings', () => {
      const args = ['', '', '--names', '123', '321', 'asd', '', '...']
      program.parse(args, flag_schemas)
      expect(program.args.names).toEqual(['123', '321', 'asd', '', '...'])
    })
  })
})

describe('flag with will_have_value set to false', () => {
  const flag_schemas = [{ long: 'git', will_have_value: false }]
  test('should parse to true when mentioning the flag', () => {
    const args = ['', '', '--git', 'random value']
    program.parse(args, flag_schemas)
    expect(program.args.git).toBe(true)
  })

  test('should parse to undefined when not mentioning the flag', () => {
    const args = ['', '']
    program.parse(args, flag_schemas)
    expect(program.args.git).toBeUndefined()
  })
})

describe('will_have_value: true, does not passing values after flag errs or not?', () => {
  const flag_schemas = [
    {
      long: 'name',
      will_have_value: true, //default
    },
  ]
  test('should err, not passing value', () => {
    const args = ['', '', '--name']
    expect(() => {
      program.parse(args, flag_schemas)
    }).toThrowError({ message: `Error: Value not passed for '--name'` })
  })
})
