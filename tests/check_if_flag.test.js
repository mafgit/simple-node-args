const { check_if_flag } = require('../dist/check_if_flag')

const flag_models = [
  { short: 'n', long: 'name', will_have_value: true, default: 'John Doe' },
  { short: 'g', long: 'git', default: false, type: 'boolean' },
]

describe('check_if_flag', () => {
  test('should pass, passed short flag, flag_options must match, is_flag must be true', () => {
    const arg = '-n'
    check_if_flag(flag_models, arg, (err, is_flag, flag_options) => {
      expect(err).toBeNull()
      expect(is_flag).toBe(true)
      expect(flag_options).toEqual(flag_models.find((i) => i.short === 'n'))
    })
  })

  test('should pass, passed long flag, flag_options must match, is_flag must be true', () => {
    const arg = '--git'
    check_if_flag(flag_models, arg, (err, is_flag, flag_options) => {
      expect(err).toBeNull()
      expect(is_flag).toBe(true)
      expect(flag_options).toEqual(flag_models.find((i) => i.long === 'git'))
    })
  })

  test('should pass, passed arg without hyphen, is_flag must be false, flag_options must be undefined', () => {
    const arg = 'n'
    check_if_flag(flag_models, arg, (err, is_flag, flag_options) => {
      expect(err).toBeNull()
      expect(is_flag).toBe(false)
      expect(flag_options).toBeUndefined()
    })
  })

  test('should pass, passed an invalid long flag, is_flag must be undefined, flag_options must be undefined', () => {
    const arg = '--flag'
    check_if_flag(flag_models, arg, (err, is_flag, flag_options) => {
      expect(err).toBeTruthy()
      expect(is_flag).toBeUndefined()
      expect(flag_options).toBeUndefined()
    })
  })

  test('should pass, passed an invalid short flag, is_flag must be undefined, flag_options must be undefined', () => {
    const arg = '-f'
    check_if_flag(flag_models, arg, (err, is_flag, flag_options) => {
      expect(err).toBeTruthy()
      expect(is_flag).toBeUndefined()
      expect(flag_options).toBeUndefined()
    })
  })
})
