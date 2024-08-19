import whweb, { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import { Commands } from './Commands.js'
import { platform } from 'node:os'

export function resolveOS(): string {
  let os = ''
  if (platform() === 'linux') {
    os = '/usr/bin/google-chrome-stable'
  }
  if (platform() === 'darwin') {
    os = '/Applications/Google Chrome.app/Contents/MacOS/GoogleChrome'
  }
  if (platform() === 'win32') {
    os = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  }
  return os
}

const client = new Client({
  authStrategy: new whweb.LocalAuth({ })
})
const cmds = new Commands("!")
const VERSION = '0.0.1'
const { log, error } = console

client.initialize()

client.on('qr', (qr) => {
  log(`Inicio de sesion con:\n ${qrcode.generate(qr, { small: true })}`)
})

client.on('authenticated', (session) => {
  console.log(JSON.stringify(session));
});

client.on('ready', () => {
  log('Bot is ready!')
})

cmds.addCmd('partidos', async () => {
  try {
    const response = await fetch(
      'https://cuando-juega-edlp.netlify.app/partidos'
    )
    const data = (await response.json()) as Array<any>
    const partido = data.map((partido) => partido)
    return `. ${partido}\n`
  } catch (err) {
    if (err instanceof Error) {
      const { name, message, stack } = err
      error({ name, message, stack })
    }
    error('Error al obtener la info', err)
  }
})

cmds.addCmd('version', () => {
  return `version: ${VERSION}`
})

cmds.addCmd('listCmds', () => {
  cmds.listAllCmds()
})

client.on('message', (message) => {
  cmds.handleMessage(message)
})

