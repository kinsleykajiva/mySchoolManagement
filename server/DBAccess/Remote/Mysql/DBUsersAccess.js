import { resolve } from 'path';

/**
 * To handle all the Fees and Types
 */
/*-------------------------------------------------------------------------------------------------------*/

const util      = require('../../../Utils/utilConstants');
const mysql     = require('mysql');
const SqlString = require('sqlstring');
const security  = require('../../../Utils/encrypt');
var   crypto    = require('crypto');
const { List }  = require('immutable');
const con       = mysql.createConnection({
    host    : util.HOST,
    user    : util.USER,
    password: util.PASSWORD,
    port    : util.CONNECTION_PORT,
    debug   : false,
    database: util.STUDENTS_DATABASE
});
/*-------------------------------------------------------------------------------------------------------*/
const create = "CREATE TABLE " +  util.USERS_TABLE + " IF EXISTS (" +
    "`id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT , " +
    "`name` VARCHAR(250) NOT NULL ," +
    "`surname` VARCHAR(250) NOT NULL ," +
    "`email` VARCHAR(50) NOT NULL ," +
    "`password` TEXT NOT NULL ," +
    "`usertype` VARCHAR(20) NOT NULL ," +
    "`date_` VARCHAR(50) NOT NULL ," +   
    "PRIMARY KEY(`id`)  " +  
  ") ENGINE=InnoDB;";


/*-------------------------------------------------------------------------------------------------------*/
/**
 * To create user's account for the system .
 * @param {string} userObject  - User data .
 * @return {Promise<string>} Promise - 'done' if saved or 'failed' if failed .
 */
module.exports.createUser = userObject => {
    return new Promise((resolve, reject) => {
        userObject = JSON.parse( userObject )
        con.connect(err => { 
            if (err) {
                reject(err);
            } else {
                con.query("SELECT email FROM " + util.USERS_TABLE + " WHERE email = '" + userObject.email + "'", (err, results, fields) => {
                    if (err) { 
                        reject(err);
                    } else {
                        if (results.length < 1) {
                            
                            userObject.password = util.encryptPassword(userObject.password);
                            
                            con.query("INSERT INTO " + util.USERS_TABLE + " SET ?", userObject, (err, results, fields) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(results.affectedRows > 0 ? "done" : "failed");
                                }
                            });
                            
                        } else {
                            resolve("exists");
                        }
                    }
                });
            }
        });   
    });  
};
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Fetches all the existing users
 * @returns {Promise<JSON>} Promise
 */
module.exports.getAllUsers = () => {
    return new Promise((resolve, reject) => { 
        con.connect(err => { 
            if (err) {
                reject(err);
            } else { 
                con.query("SELECT * FROM " + USERS_TABLE, (err, results, fields) => { 
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });  
     });
};
/*-------------------------------------------------------------------------------------------------------*/
/**
 * To edit User details .
 * @param {string} id - identifier the record .
 * @param {string} userObject - User Data .
 * @returns {Promise<string>} Promise - 'done' if updated or 'failed' if failed
 */
module.exports.editUser = (id , userObject) => {
    return new Promise((resolve, reject) => {
        userObject          = JSON.parse(userObject);
        userObject.password = util.encryptPassword(userObject.password);
        con.connect(err => { 
            if (err) { 
                reject(err);
            } else {
                           
                let data = [
                    userObject.name, userObject.surname, userObject.email, userObject.password, userObject.id
                ];
                con.query("UPDATE " + util.USERS_TABLE + "SET name = ? , surname = ?  , email = ? , password = ? , usertype = ? WHERE id = ? ", data, (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows > 0 ? "done" : "failed");
                    }
                });
            }
        });
    } );
};
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Deletes a user .
 * @param {string} id - identifier the record .
 * @returns {Promise<string>}  Promise - 'done' if deleted or 'failed' if failed .
 */
module.exports.deleteUSer = id => {
    con.connect(err => {
        if (err) {
            reject(err);
        } else {
            con.query("DELETE FROM " + util.USERS_TABLE + "WHERE id = '" + id + "'", (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0 ? "done" : "failed");
                }
            });
        }
    } );
};
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

/*-------------------------------------------------------------------------------------------------------*/