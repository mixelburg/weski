import { createSyslogFormatter, levelToSyslog } from 'winston-syslog-formatter'
import { createLogger, format, transports } from 'winston'
import { APP_VERSION } from '@weski/config';

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'
const APP_NAME = process.env.APP_NAME || 'backend'
const HOST = process.env.HOST || 'localhost'

const logger = createLogger({
  levels: levelToSyslog,
  level: LOG_LEVEL,

  format: format.combine(
    format.colorize({ message: true }),
    createSyslogFormatter({
      facility: 20,
      appName: APP_NAME,
      host: HOST,
      version: APP_VERSION,
    }),
  ),
  transports: [new transports.Console()],
})

export default logger
