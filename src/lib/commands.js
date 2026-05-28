/*
  Slash-command engine for the Merlin agent.

  Each command returns { lines } and optionally an { action }. A line is a
  string or { text, tone } where tone is a semantic token: muted | accent |
  command | path | prompt | error | info.
*/

function line(text, tone) {
  return { text, tone }
}

const COMMANDS = {
  help: () => ({
    lines: [
      line('Commands', 'accent'),
      line('  /help     show this help'),
      line('  /about    about Microsoft Merlin'),
      line('  /ver      show version info'),
      line('  /clear    clear the conversation'),
      line(''),
      line('Anything else is sent to Merlin.', 'muted'),
    ],
  }),

  about: () => ({
    lines: [
      line('Microsoft Merlin', 'command'),
      line('An intelligent programming companion for Windows 95.'),
      line('Ask Merlin to explain, write, or debug code.', 'muted'),
    ],
  }),

  ver: () => ({
    lines: [
      line('Microsoft Merlin [Version 1.0]'),
      line('(C) Microsoft Corporation 1995. All rights reserved.', 'muted'),
    ],
  }),

  cls: () => ({ lines: [], action: { type: 'clear' } }),
  clear: () => ({ lines: [], action: { type: 'clear' } }),
}

export function runCommand(raw) {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('/')) {
    return {
      lines: [
        line('Merlin is still learning to write code. (prototype)', 'muted'),
        line('Type /help to see what I can do.', 'muted'),
      ],
    }
  }

  const [name, ...args] = trimmed.slice(1).split(/\s+/)
  const handler = COMMANDS[name?.toLowerCase()]
  if (!handler) {
    return {
      lines: [line(`Merlin doesn't recognize "/${name}". Type /help.`, 'error')],
    }
  }
  return handler(args)
}
