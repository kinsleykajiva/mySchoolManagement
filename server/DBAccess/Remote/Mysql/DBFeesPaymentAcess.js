/**
 * To handle all the Fees Payments
 */

const util      = require('../../../Utils/utilConstants');
const mysql     = require('mysql');
const SqlString = require('sqlstring');
const {
    List
} = require('immutable');
const con = mysql.createConnection({
    host    : HOST,
    user    : USER,
    password: PASSWORD,
    port    : CONNECTION_PORT,
    debug   : false,
    database: STUDENTS_DATABASE
});
const sw = "CREATE TABLE " + FEES_PAYMENTS_TABLE + " IF NOT EXISTS (" +
    "`id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT , " +
    "`receipt` VARCHAR(250) NOT NULL ," +
    "`amount` VARCHAR(250) NOT NULL ," +
    "`date_` VARCHAR(50) NOT NULL ," +
    "`student_paying` VARCHAR(250) NOT NULL ," +
    "`payment_method` VARCHAR(20) NOT NULL ," +
    "`bank` VARCHAR(250) NOT NULL ," +
    "`bank_account` VARCHAR(250) NOT NULL ," +
    "`description` TEXT NOT NULL ," +    
    "PRIMARY KEY(`id`)  " +
    ") ENGINE=InnoDB;";
/*-------------------------------------------------------------------------------------------------------*/
/**
 * For Student Fees Payment .
 * @param {string} paymentObject - Payment data details .
 */
module.exports.payFees = paymentObject => { 
    return new Promise((resolve, reject) => {
        paymentObject = JSON.parse(paymentObject);
        con.connect(err => { 
            if (err) {
                reject(err);
            } else{ 
                con.query("INSERT INTO " + FEES_PAYMENTS_TABLE + "  SET ? " , paymentObject , (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve( results.affectedRows > 0 ? "done" : "failed" );
                    }
                });
            }
        });
    });
};

/*-------------------------------------------------------------------------------------------------------*/
/**
 * Get a Student Payment history
 * @param {string} reg_no - identify a record
 */
module.exports.getStudentPayments = reg_no => {
    return new Promise((resolve, reject) => {
        con.connect(err => { 
            if (err) {
                reject(err);
            } else { 
                con.query("SELECT amount , reg_no FROM " + FEES_PAYMENTS_TABLE + " WHERE reg_no = '" + reg_no + "' ", (err, results, fields) => { 
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
 * Fetches all the Payments made.
 * @returns {Promise<JSON>} Promise - .
 */
module.exports.getAllPayments = () => {
    return new Promise((resolve, reject) => { 
        con.connect(err => { 
            if (err) {
                reject(err);
            } else {
                con.query("SELECT * FROM " + FEES_PAYMENTS_TABLE, (err, results, fields) => {
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

/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/