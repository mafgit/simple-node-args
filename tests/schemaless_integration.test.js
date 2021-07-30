const Program = require('../dist/index')
const program = new Program({ name: 'App' })

describe('schema-less tests', () => {
  test('expect n to be 20', () => {
    const args = ['', '', '-n', '20']
    program.parse(args)
    expect(program.args.n).toBe('20')
  })
  test('expect n to be true', () => {
    const args = ['', '', '--n']
    program.parse(args)
    expect(program.args.n).toBe(true)

    args.push('-n2', 'abcd')
    program.parse(args)
    expect(program.args).toEqual({ n: true, n2: 'abcd' })
  })

  test('expect n to be array', () => {
    const args = ['', '', '-n', 'asd', '123', 'true', '--n2']
    program.parse(args)
    expect(program.args).toEqual({ n: ['asd', '123', 'true'], n2: true })
  })

  test('expect n & n2 to be true', () => {
    const args = ['', '', '-n', '--n2']
    program.parse(args)
    expect(program.args).toEqual({ n: true, n2: true })
  })
})
