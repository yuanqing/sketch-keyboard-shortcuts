import { DOMAIN, KEY } from './constants'
import { KEYBOARD_KEY_MAP, ESCAPE_KEY } from './keyboard'

export function createBashCommands (keyboardShortcuts) {
  const result = []
  keyboardShortcuts.forEach(function ({ menu, shortcut }) {
    result.push(
      `defaults write ${DOMAIN} ${KEY} -dict-add "${createMenu(
        menu
      )}" "${createShortcut(shortcut)}"`
    )
  })
  const length = keyboardShortcuts.length
  result.push(
    `echo "Set ${length} keyboard shortcut${length === 1 ? '' : 's'}"`
  )
  return result
}

function createMenu (menu) {
  return menu
    .map(function (string) {
      return `${ESCAPE_KEY}${string}`
    })
    .join('')
}

function createShortcut (shortcut) {
  return shortcut
    .map(function (keyboardKey) {
      const character = KEYBOARD_KEY_MAP[keyboardKey]
      return typeof character !== 'undefined' ? character : keyboardKey
    })
    .join('')
}
