import type { Cmd, CommandAction, rmCmd } from '@/types/main.d.ts'
import type { Message } from 'whatsapp-web.js'

export class Commands implements Cmd {
  private cmdActions: Map<string, CommandAction> = new Map()
  private cmdName: Array<string> = []

  constructor(private cmdPrefix?: string) {
    this.setCmdPrefix(cmdPrefix)
  }

  setCmdPrefix(newPrefix: string): string {
    if (newPrefix.trim() === '') {
      throw new Error('Command prefix cannot be empty')
    }
    return (this.cmdPrefix = newPrefix)
  }

  getCmdPrefix(): string {
    return this.cmdPrefix
  }

  setCmdName(newCmdName: string): string {
    if (newCmdName.trim() === '') {
      throw new Error('Command name cannot be empty')
    }
    this.cmdName.push(newCmdName)
    return newCmdName
  }

  getCmdsNames(): Array<string> {
    return this.cmdName
  }

  addCmd(
    cmdNameArg: string,
    action: () => void,
    description: string = 'No description provided'
  ): void {
    if (this.cmdActions.has(cmdNameArg)) {
      throw new Error(`Command "${cmdNameArg}" already exists`)
    }
    this.cmdActions.set(cmdNameArg, { action, description })
    this.cmdName.push(cmdNameArg)
  }

  removeCmd(cmdName: string): rmCmd {
    if (!this.cmdActions.has(cmdName)) {
      return {
        errMsg: 'Error al remover el comando!',
        remove: false,
      }
    }
    this.cmdActions.delete(cmdName)
    this.cmdName = this.cmdName.filter((name) => name !== cmdName)
    return {
      remove: true,
      msg: 'Comando removido exitosamente!',
    }
  }

  hasCmd(cmdName: string): boolean {
    return this.cmdActions.has(cmdName)
  }

  executeCmd(cmdName: string): void {
    const command = this.cmdActions.get(cmdName)
    if (command) {
      command.action()
    } else {
      throw new Error(`Command "${cmdName}" does not exist`)
    }
  }

  listAllCmds(): string {
    return this.cmdName.join(', ')
  }

  getCmdHelp(cmdName: string): string | undefined {
    const command = this.cmdActions.get(cmdName)
    return command?.description
  }

  handleMessage(message: Message): void {
    const { body } = message

    // Verificar si el mensaje empieza con el prefijo del comando
    if (body.startsWith(this.getCmdPrefix())) {
      // Extraer el nombre del comando del mensaje
      const [cmdName] = body.slice(this.getCmdPrefix().length).split(' ')

      // Verificar si el comando existe
      if (this.hasCmd(cmdName)) {
        // Ejecutar el comando
        this.executeCmd(cmdName)

        // Opcionalmente, responder al usuario
        message.reply(`Ejecutando el comando: ${cmdName}`)
      } else {
        // Responder con un mensaje de error si el comando no existe
        message.reply(
          `Comando "${cmdName}" no reconocido. Usa "${this.getCmdPrefix()}help" para ver la lista de comandos.`
        )
      }
    }
  }
}
