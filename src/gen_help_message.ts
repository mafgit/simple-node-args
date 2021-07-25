import { flag_options, program_details } from './types'

export const gen_help_message = (
  program_details: program_details,
  flag_models: flag_options[]
) => {
  const {
    name: program_name,
    version: program_version,
    description: program_description,
    links = [],
    contacts = [],
  } = program_details

  let msg = `\n${program_name}${program_version ? '@' + program_version : ''}${
    program_description ? " - '" + program_description + "'" : ''
  }\nUsage: ${program_name} [options]\n`

  // options
  if (flag_models.length > 0) {
    msg += `\nOptions:\n\n`
    // checking spaces in flag_models
    let max_spaces = 0
    flag_models?.forEach(
      ({ short, long, type, value_title, will_have_value }) => {
        if (will_have_value && !type) type = 'string'
        let spaces = `${short ? '-' + short + ', ' : ''}--${long}${
          value_title ? ' <' + value_title + '>' : type ? ' <' + type + '>' : ''
        }  `.length
        if (spaces > max_spaces) max_spaces = spaces
      }
    )
    // ---x--- checking spaces

    flag_models?.forEach(
      ({
        short,
        long,
        type,
        description,
        value_title,
        will_have_value,
        default: default_value,
      }) => {
        if (will_have_value && !type) type = 'string'
        let line = `${short ? '-' + short + ', ' : ''}--${long}${
          value_title ? ' <' + value_title + '>' : type ? ' <' + type + '>' : ''
        }`
        let spaces = max_spaces - line.length
        line += `${description ? ' '.repeat(spaces) + description : ''}${
          typeof default_value !== 'undefined'
            ? ` (default: ${default_value})`
            : ''
        }\n`
        msg += line
      }
    )
  }

  // checking spaces in links
  if (links?.length > 0) {
    msg += `\nLinks:\n\n`
    let max_spaces = 0
    links?.forEach(({ name }) => {
      let spaces = `${name}  `.length
      if (spaces > max_spaces) max_spaces = spaces
    })
    // ---x--- checking spaces

    links?.forEach(({ name, url }) => {
      let spaces = max_spaces - name.length
      let line = name + ' '.repeat(spaces) + url + '\n'
      msg += line
    })
  }

  // checking spaces in contacts
  if (contacts?.length > 0) {
    msg += `\nContacts:\n\n`
    let max_spaces = 0
    contacts?.forEach(({ name }) => {
      let spaces = `${name}  `.length
      if (spaces > max_spaces) max_spaces = spaces
    })
    // ---x--- checking spaces

    contacts?.forEach(({ name, value }) => {
      let spaces = max_spaces - name.length
      let line = name + ' '.repeat(spaces) + value + '\n'
      msg += line
    })
  }
  return msg
}
