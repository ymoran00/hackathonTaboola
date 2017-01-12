package log;

import org.apache.log4j.Logger;

/**
 * Created by Guy.g
 * Date: 1/11/2017
 * Time: 2:02 PM
 * Copyright Taboola
 */
public class LogWrapper {

    private Logger logger;

    public LogWrapper(Class clazz) {
        logger = Logger.getLogger(clazz);
    }

    public void error(String message, Object ... args) {
        logger.error(String.format(message, args));
    }

    public void error(String message, Throwable t, Object ... args) {
        logger.error(String.format(message, args), t);
    }

    public void info(String message, Object ... args) {
        logger.info(String.format(message, args));
    }

    public void info(String message, Throwable t, Object ... args) {
        logger.info(String.format(message, args), t);
    }

    public void debug(String message, Object ... args) {
        logger.debug(String.format(message, args));
    }

    public void debug(String message, Throwable t, Object ... args) {
        logger.debug(String.format(message, args), t);
    }
}
