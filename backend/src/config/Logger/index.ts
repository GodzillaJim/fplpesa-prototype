import winston from "winston";

export default class Logger {
  public logger: winston.Logger;
  public readonly prefix?: string;
  constructor(prefix?: string) {
    this.prefix = prefix;
    winston.addColors(this.loggingColors);
    this.logger = winston.createLogger({
      level: this.getLoggingLevel(),
      levels: this.levels,
      format: this.logFormat,
      transports: this.transports,
    });
  }

  private levels: Record<string, number> = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };
  private getLoggingLevel = (): "debug" | "warn" => {
    const env = process.env.NODE_ENV || "dev";
    const isDevelopment = env === "dev";
    return isDevelopment ? "debug" : "warn";
  };

  private loggingColors: Record<string, string> = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };

  private logFormat: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp}:${level}: ${this.prefix}: ${message}`;
    })
  );

  private transports = [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/all.log" }),
  ];
}
