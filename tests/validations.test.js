const Program = require('../dist/index')
const program = new Program({ name: 'test' })

describe('Enum tests', () => {
  test('should pass, passing invalid values for enum', () => {
    const models = [
      { long: 'ans', will_have_value: true, enum: ['yes', 'no', 'y', 'n'] },
    ]
    const process_args = ['', '', '--ans', 'YES']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message:
        'Validation Error: The value for --ans does not pass the enum test.',
    })
  })

  test('should pass, passing valid value for enum', () => {
    const models = [
      { long: 'ans', will_have_value: true, enum: ['yes', 'no', 'y', 'n'] },
    ]
    const process_args = ['', '', '--ans', 'no']
    expect(() => {
      program.parse(models, process_args)
    }).not.toThrowError()
    expect(program.args.ans).toBe('no')
  })
})

describe('min tests for numbers', () => {
  const models = [
    { long: 'age', type: 'integer', min: 18, will_have_value: true },
  ]
  test('should fail, passing value lower than min', () => {
    const process_args = ['', '', '--age', '17']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message:
        'Validation Error: Expected the value of --age to be at least 18.',
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
  const models = [
    { long: 'age', type: 'integer', max: 20, will_have_value: true },
  ]
  test('should fail, passing value higher than max', () => {
    const process_args = ['', '', '--age', '21']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message:
        'Validation Error: Expected the value of --age to not exceed 20.',
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
  const models = [{ long: 'text', will_have_value: true, min_length: 5 }]
  test('should fail, passing empty string & another smaller than min_length', () => {
    const process_args = ['', '', '--text', '']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message:
        'Validation Error: Length of the value of --text, 0, is smaller than the min_length, 5.',
    })

    process_args[3] = 'text'
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message:
        'Validation Error: Length of the value of --text, 4, is smaller than the min_length, 5.',
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
  const models = [{ long: 'text', will_have_value: true, max_length: 5 }]
  test('should fail, passing string bigger than max_length', () => {
    const process_args = ['', '', '--text', 'hello!']
    expect(() => {
      program.parse(models, process_args)
    }).toThrowError({
      message:
        'Validation Error: Length of the value of --text, 6, is greater than the max_length, 5.',
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
      will_have_value: true,
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
      message:
        'Validation Error: The value for --email does not pass the regex test.',
    })
  })
})

// todo: type?: 'integer' | 'float' | 'string' | 'boolean' | 'arr_of_integer' | 'arr_of_float' | 'arr_of_string'
// todo: required?: boolean
// todo: default_value?: any

describe('type parsing', () => {})
describe('required test', () => {})
describe('default value test', () => {})
