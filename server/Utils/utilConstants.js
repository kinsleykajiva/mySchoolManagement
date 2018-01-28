/**
 * This will define all the constants from the server side
 **/

/** @constant {string} Server name */
const HOST = "localhost";

/** @constant {number} Mysql port */
const CONNECTION_PORT = 3305;

/** @constant {string} Database user accessing the database */
const USER = "root";

/** @constant {string} Database access password for the user */
const PASSWORD = "user";

/** @constant {string} Mysql database name */
const STUDENTS_DATABASE = "xschool_managex";

/** @constant {string} Users table */
const USERS_TABLE = "xusersx";

/** @constant {string} Students table */
const STUDENTS_TABLE = "xstudentsx";

/** @constant {string} Fees table */
const FEES_TABLE = "xfeesx";

/** @constant {string} Fess Payments table */
const FEES_PAYMENTS_TABLE = "xfees_paymentsx";

/** @constant {string} Salting column */
const SALT_COLUMN = "xtownx";

/** @constant {string} Encryption Algorithm */
const ENCODE_ALGORITHM = 'aes-256-ctr';
/********************************************************************************************************************************************************************* */
/********************************************************************************************************************************************************************* */
/**
 * Gets current date in the dd/mm/yyyy format .
 * @returns {string} current date String
 */
function getCurrentDate() {
    var today = new Date();
    var dd    = today.getDate();
    var mm    = today.getMonth() + 1;  //January is 0!
    var yyyy  = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return dd + '/' + mm + '/' + yyyy;

}
/********************************************************************************************************************************************************************* */

/**
 * Gets the random integer between min and max (both included)
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @returns    {number}  The random integer.
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/********************************************************************************************************************************************************************* */



/********************************************************************************************************************************************************************* */



/********************************************************************************************************************************************************************* */



/********************************************************************************************************************************************************************* */




/********************************************************************************************************************************************************************* */

