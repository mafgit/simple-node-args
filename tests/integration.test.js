const Program = require('../dist/index')
const program = new Program({ name: 'test' })

describe('Enum tests', () => {
  test('should pass, passing invalid values for enum', () => {
    const models = [{ long: 'ans', enum: ['yes', 'no', 'y', 'n'] }]
    const process_args = ['', '', '--ans', 'YES']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value passed for '--ans' is invalid.`,
    })
  })

  test('should pass, passing valid value for enum', () => {
    const models = [{ long: 'ans', enum: ['yes', 'no', 'y', 'n'] }]
    const process_args = ['', '', '--ans', 'no']
    expect(() => {
      program.parse(models, process_args)
    }).not.toThrowError()
    expect(program.args.ans).toBe('no')
  })
})

describe('min tests for numbers', () => {
  const models = [{ long: 'age', type: 'integer', min: 18 }]
  test('should fail, passing value lower than min', () => {
    const process_args = ['', '', '--age', '17']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value of '--age' must be at least 18.`,
    })
  })

  test('should pass, passing values equal to and greater than min', () => {
    const process_args = ['', '', '--age', '18']
    program.parse(models, process_args)
    expect(program.args.age).toBe(18)
    process_args[3] = '19'
    program.parse(models, process_args)
    expect(program.args.age).toBe(19)
  })
})

describe('max tests for numbers', () => {
  const models = [{ long: 'age', type: 'integer', max: 20 }]
  test('should fail, passing value higher than max', () => {
    const process_args = ['', '', '--age', '21']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value of '--age' must not exceed 20.`,
    })
  })

  test('should pass, passing values equal to and lower than max', () => {
    const process_args = ['', '', '--age', '20']
    program.parse(models, process_args)
    expect(program.args.age).toBe(20)
    process_args[3] = '19'
    program.parse(models, process_args)
    expect(program.args.age).toBe(19)
  })
})

describe('min_length for strings', () => {
  const models = [{ long: 'text', min_length: 5 }]
  test('should fail, passing empty string & another smaller than min_length', () => {
    const process_args = ['', '', '--text', '']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value of '--text' must contain at least 5 characters.`,
    })

    process_args[3] = 'text'
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value of '--text' must contain at least 5 characters.`,
    })
  })
  test('should pass, passing strings of sizes bigger than and equal to min_length', () => {
    const process_args = ['', '', '--text', 'hello']
    program.parse(models, process_args)
    expect(program.args.text).toBe('hello')

    process_args[3] = 'hello brother'
    program.parse(models, process_args)
    expect(program.args.text).toBe('hello brother')
  })
})

describe('max_length for strings', () => {
  const models = [{ long: 'text', max_length: 5 }]
  test('should fail, passing string bigger than max_length', () => {
    const process_args = ['', '', '--text', 'hello!']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value of '--text' must not contain more than 5 characters.`,
    })
  })
  test('should pass, passing strings smaller than and equal to max_length', () => {
    const process_args = ['', '', '--text', 'hello']
    program.parse(models, process_args)
    expect(program.args.text).toBe('hello')

    process_args[3] = 'hey'
    program.parse(models, process_args)
    expect(program.args.text).toBe('hey')
  })
})

describe('regex', () => {
  const models = [
    {
      long: 'email',

      regex:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
  ]
  test('should pass, passing valid value for regex', () => {
    const process_args = ['', '', '--email', 'valid19@email.com']
    program.parse(models, process_args)
    expect(program.args.email === process_args[3])
  })
  test('should fail, passing invalid value for regex', () => {
    const process_args = ['', '', '--email', 'valid19@@email..com']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message: `Error: Value passed for '--email' is invalid.`,
    })
  })
})

describe('default value test', () => {
  const models = [
    {
      long: 'gender',
      default: 'male',
    },
  ]
  test('should have default value: "male" coz not passing anything', () => {
    const process_args = ['', '']
    program.parse(models, process_args)
    expect(program.args.gender).toBe('male')
  })
  test('should have the new value: "female" coz passing explicitly', () => {
    const process_args = ['', '', '--gender', 'female']
    program.parse(models, process_args)
    expect(program.args.gender).toBe('female')
  })
})

describe('required flag test', () => {
  test('should fail, not passing the required flag', () => {
    const models = [{ long: 'name', required: true }]
    const process_args = ['', '']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({ message: `Error: Required flag 'name' is not entered.` })
  })
})

describe('type parsing', () => {
  describe('integer', () => {
    const models = [{ long: 'age', type: 'integer' }]
    test('should parse to 18', () => {
      const args = ['', '', '--age', '18.9']
      program.parse(models, args)
      expect(program.args.age).toBe(18)
    })
    test('should fail, passing value of invalid type', () => {
      const args = ['', '', '--age', 'x18.9']
      expect(() => {
        program.parse(models, args)
      }).toThrowError({
        message: `Error: Expected value of type: integer for '--age', got 'x18.9'.`,
      })
    })
  })

  describe('float', () => {
    const models = [{ long: 'age', type: 'float' }]
    test('should parse to 18.9', () => {
      const args = ['', '', '--age', '18.9']
      program.parse(models, args)
      expect(program.args.age).toBe(18.9)
    })
    test('should fail, passing value of invalid type', () => {
      const args = ['', '', '--age', 'x18.9']
      expect(() => {
        program.parse(models, args)
      }).toThrowError({
        message: `Error: Expected value of type: float for '--age', got 'x18.9'.`,
      })
    })
  })

  describe('boolean', () => {
    const models = [{ long: 'git', type: 'boolean' }]
    test('should parse to true', () => {
      const args = ['', '', '--git', 'true']
      program.parse(models, args)
      expect(program.args.git).toBe(true)
    })
    test('should parse to false', () => {
      const args = ['', '', '--git', 'false']
      program.parse(models, args)
      expect(program.args.git).toBe(false)
    })
    test('should fail, passing invalid value for boolean', () => {
      const args = ['', '', '--git', 'truefalse']
      expect(() => {
        program.parse(models, args)
      }).toThrowError({
        message: `Error: Expected value of type: boolean for '--git', got 'truefalse'.`,
      })
    })
  })

  describe('string', () => {
    const models = [{ long: 'name', type: 'string' }]
    test('should parse to "8"', () => {
      const args = ['', '', '--name', '8']
      program.parse(models, args)
      expect(program.args.name).toBe('8')
    })
    test('should parse to "8" even without mentioning type: "string"', () => {
      const args = ['', '', '--name', '8']
      models.type = undefined
      program.parse(models, args)
      expect(program.args.name).toBe('8')
    })
  })

  describe('array of integer', () => {
    const models = [{ long: 'nums', type: 'arr_of_integer' }]
    test('should parse floats to integers', () => {
      const args = ['', '', '--nums', '0.7', '+3', '4.3']
      program.parse(models, args)
      expect(program.args.nums).toEqual([0, 3, 4])
    })

    test('should fail, passing an invalid value among integers', () => {
      const args = ['', '', '--nums', '2', '3', '3a']
      expect(() => {
        program.parse(models, args)
      }).toThrowError({
        message: `Error: Expected value of type: integer for '--nums', got '3a'.`,
      })
    })
  })

  describe('array of float', () => {
    const models = [{ long: 'nums', type: 'arr_of_float' }]
    test('should pass, passing valid floats', () => {
      const args = ['', '', '--nums', '0.7', '+3', '4.3']
      program.parse(models, args)
      expect(program.args.nums).toEqual([0.7, 3, 4.3])
    })

    test('should fail, passing an invalid value among floats', () => {
      const args = ['', '', '--nums', '2.2', '3.3', '3a']
      expect(() => {
        program.parse(models, args)
      }).toThrowError({
        message: `Error: Expected value of type: float for '--nums', got '3a'.`,
      })
    })
  })
  describe('array of string', () => {
    const models = [{ long: 'names', type: 'arr_of_string' }]
    test('should pass, passing strings', () => {
      const args = ['', '', '--names', '123', '321', 'asd', '', '...']
      program.parse(models, args)
      expect(program.args.names).toEqual(['123', '321', 'asd', '', '...'])
    })
  })
})

test.todo('check: with will_have_value: false, does --git parse to true')
test.todo(
  'check: will_have_value: true, not passing values after flag errs or not'
)
