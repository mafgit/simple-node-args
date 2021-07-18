const { check_type } = require('../dist/check_type')

describe('check_type: string', () => {
  test('should pass, passed a string into type string', () => {
    check_type('string', 'hey there 03', 'f', (err, value) => {
      expect(value).toBe('hey there 03')
      expect(err).toBeFalsy()
    })
  })
})

describe('check_type: integer', () => {
  test('should err, passed a string with alphabets into type integer', () => {
    check_type('integer', 'hey there 03', 'f', (err, value) => {
      expect(value).toBeUndefined()
      expect(err).toBeTruthy()
    })
  })

  test('should pass, passed a string of a float number, which should be parsed to an integer', () => {
    check_type('integer', '89.9', 'f', (err, value) => {
      expect(value).toBe(89)
      expect(err).toBeFalsy()
    })
  })
})

describe('check_type: float', () => {
  test('should err, passed a string with alphabets into type float', () => {
    check_type('float', 'hey there 03', 'f', (err, value) => {
      expect(value).toBeUndefined()
      expect(err).toBeTruthy()
    })
  })

  test('should pass, passed a string of a float number into type float', () => {
    check_type('float', '89.9', 'f', (err, value) => {
      expect(value).toBe(89.9)
      expect(err).toBeFalsy()
    })
  })
})

describe('check_type: boolean', () => {
  test('should pass to true, passed "true" into type boolean', () => {
    check_type('boolean', 'true', 'f', (err, value) => {
      expect(value).toBe(true)
      expect(err).toBeFalsy()
    })
  })

  test('should pass to false, passed "false" into type boolean', () => {
    check_type('boolean', 'false', 'f', (err, value) => {
      expect(value).toBe(false)
      expect(err).toBeFalsy()
    })
  })

  test('should err, passed a string that is neither equal to "true" nor "false"', () => {
    check_type('boolean', 'hey there true', 'f', (err, value) => {
      expect(value).toBeUndefined()
      expect(err).toBeTruthy()
    })
  })
})
