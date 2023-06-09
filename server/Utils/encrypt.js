/**
 * To handle all the encryption .
 */

var   bcrypt = require('bcrypt');
const util   = require('./utilConstants');
/*-------------------------------------------------------------------------------------------------------*/
/**
 * To encrypt the password .
 * @param {string} password 
 * @returns {string} hash
 */
function encryptPassword(password) {
    const saltRounds = 12;
    var   salt       = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt)  ;
}
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Checks if the pass is valid .
 * @param {string} password - raw string from the user .
 * @param {string} hash - hash from the database .
 * @returns {boolean} boolean - true if valid else false not valid .
 */
function isPassword(password , hash) {
    
    return bcrypt.compareSync(password, hash);
}
/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/







 