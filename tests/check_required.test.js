const { check_required } = require('../dist/check_required')

const flag_models = [
  { long: 'name', will_have_value: true, required: true },
  { long: 'age', will_have_value: true, type: 'integer', required: true },
  { long: 'country', default_value: 'Pakistan' },
]

describe('check_required', () => {
  test('should pass, did not pass "name" but "age" is set to undefined, both are required flags', () => {
    const parsed_args = {
      country: 'Pakistan',
      age: undefined,
    }
    check_required(flag_models, parsed_args, (err) => {
      expect(err).toBeTruthy()
    })
  })

  test('should pass, passed both "name" and "age", but as undefined, they both are required flags', () => {
    const parsed_args = {
      country: 'Pakistan',
      age: undefined,
    }
    check_required(flag_models, parsed_args, (err) => {
      expect(err).toBeTruthy()
    })
  })

  test('should pass, passed both "age" and "name" with respective values', () => {
    const parsed_args = {
      country: 'Pakistan',
      name: 'Abcd',
      age: 18,
    }
    check_required(flag_models, parsed_args, (err) => {
      expect(err).toBeNull()
    })
  })
})
