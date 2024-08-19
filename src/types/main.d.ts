import type { Message } from 'whatsapp-web.js'

export interface Cmd {
  // Getters
  getCmdPrefix(): string
  getCmdsNames(): Array<string>
  // Setters
  setCmdName(cmdName: string): string
  setCmdPrefix(newPrefix: string): string
  // Command Management
  addCmd(cmdName: string, action: () => void, description?: string): void
  removeCmd(cmdName: string): rmCmd
  hasCmd(cmdName: string): boolean
  executeCmd(cmdName: string): void
  handleMessage(msg: Message): void
  // Utilities
  listAllCmds(): string
  getCmdHelp(cmdName: string): string | undefined
}

export interface CommandAction {
  action: () => void
  description: string
}
type rmCmdStr = 'errMsg' | 'msg'
type rmCmd = Partial<{
  [key in rmCmdStr]: string
}> & { remove: boolean }
