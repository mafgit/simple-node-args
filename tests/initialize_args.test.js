const { initialize_args } = require('../dist/initialize_args')

const flag_models = [
  { long: 'male', default_value: false, will_have_value: true },
  { long: 'age', default_value: 18, will_have_value: true },
  { long: 'country', default_value: 'Pakistan', will_have_value: true },
  { long: 'name', will_have_value: true },
]

describe('Initialize Args', () => {
  test('should pass, comparing two objects', () => {
    const value = initialize_args(flag_models)
    expect(value).toEqual({
      male: false,
      age: 18,
      country: 'Pakistan',
    })
  })
})