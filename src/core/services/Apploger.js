/* eslint-disable no-multi-assign */
/*eslint no-console: ["off"] */
import appConfig from 'config/app-config';

// appStage is either production, development or stating.
// eslint-disable-next-line prefer-destructuring
const appStage = appConfig.appStage;

/**
 * @description Logger class
 * 
 * This is responsible for logging of all kind of stuff in the application
 * Default, we are using the console api for logging and this provides the basic level of logging such as
 * you can use the available method of console in developement but in production these will be replaced with empty methods
 * This can be extended with the help of adding Log level functionality
 */
class AppLogger {

  log;

  debug;

  info;

  warn;

  error;

  /**
    * @constructor AppLogger
    */
  constructor() {
    this.TURN_DEBUG_ON = true;
    /** Initializing the configuration of logger */
    this.initLogger();
  }

  /**
   * @description Initializing the configuration such as if appStage is production then all log method will be replaced with empty methods
   * except logToServer, which will be responsible for logging the important stuff on server
   */
  
  initLogger() {
    /** Checking the appStage */
    if (this.TURN_DEBUG_ON && appStage !== 'production') {

      this.trace = () => { };

      this.log = console.log.bind(console);

      this.debug = console.debug.bind(console);

      this.info = console.info.bind(console);

      this.warn = console.warn.bind(console);

      this.error = console.error.bind(console);

      this.logToServer = this.error;

    } else {
      // In case of production replace the functions definition
      this.trace = this.log = this.debug = this.info = this.warn = () => { };
      this.error = console.error.bind(console);

      this.logToServer = (err) => {

        console.error(err);
        // TODO: API integration for logging to server or any custom logic 
        // in case of Production environment
      };
    }
  }
}

/** Creating the instance of logger */
const logger = new AppLogger();

export { logger };
