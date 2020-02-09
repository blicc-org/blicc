import {
  createLogger,
  transports,
  format,
  Logger as WinstonLogger,
} from 'winston'
const { combine, timestamp, printf } = format

class CustomLogger {
  private logger: WinstonLogger

  public constructor() {
    const formatMessage = printf(({ level, message, timestamp }) => {
      return `[${timestamp}][${level}]: ${message}`
    })

    const formatTime = { format: 'YYYY-MM-DD HH:mm:ss' }

    this.logger = createLogger({
      level: 'info',
      format: combine(timestamp(formatTime), formatMessage),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
      ],
    })
  }

  public error(message: string): void {
    this.logger.error(message)
  }

  public info(message: string): void {
    this.logger.info(message)
  }

  public debug(message: string): void {
    this.logger.debug(message)
  }
}

export const Logger = new CustomLogger()
