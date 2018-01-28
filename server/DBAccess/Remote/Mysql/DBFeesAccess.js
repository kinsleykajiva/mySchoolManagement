/**
 * To handle all the Fees and Types
 */
/*-------------------------------------------------------------------------------------------------------*/
const util      = require('../../../Utils/utilConstants');
const mysql     = require('mysql');
const SqlString = require('sqlstring');
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
const createTable = "CREATE TABLE " +  util.FEES_TABLE + " IF NOT EXISTS (" +
    "`id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT , " +
    "`fee_name` VARCHAR(250) NOT NULL ," +
    "`amount` VARCHAR(20) NOT NULL ," +
    "`whose_paying` VARCHAR(250) NOT NULL ," +
    "`fee_type` VARCHAR(25) NOT NULL ," +
    "`bank` VARCHAR(250) NOT NULL ," +
    "`bank_acc` VARCHAR(250) NOT NULL ," +
    "`description` TEXT NOT NULL ," +
    "`date_` VARCHAR(70) NOT NULL ," +
    "`payment_method` VARCHAR(20) NOT NULL ," +
    "`history` JSON DEFAULT NULL " +
     
    "PRIMARY KEY(`id`)  " +
") ENGINE=InnoDB;";
/* {
    '2017-12-1': ["fee_name", "amount", ...],
    '2017-12-1': ["fee_name", "amount", ...],
    
}
 */
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Create Fee .
 * Returns 'found' if duplicate found else 'done' if saved and 'failed' if error occurs during saving.
 * @param {string} feesObject - Data to save
 * @returns {string} Precessing results 
 */
module.exports.createFee = feesObject => {
    return new Promise((resolve, reject) => {
        con.connect(err => {
            if (err) {
                reject(err);
            } else { 
                
                con.query("SELECT fee_name FROM " +  util.FEES_TABLE + " WHERE fee_name = '" + feesObject.fee_name + "'", (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                       
                        // check for duplication
                        if (results.size() > 0) {
                            // now save if no duplication
                            con.query("INSERT INTO " +  util.FEES_TABLE + " SET ?", feesObject, (err, results, fields) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(results.affectedRows > 0 ? "done" : "failed");
                                }
                            });
                            
                        } else { 
                            resolve("found");
                        }
                    }
                });
                
            }
        });
    });
 };


/*-------------------------------------------------------------------------------------------------------*/

module.exports.updateFee = (id , feeObject) => {
    return new Promise((resolve, reject) => { 
        con.connect( err => {
           if (err) {
               reject(err);
           } else {
               let newFee = [
                    id];
               con.query("UPDATE " + util.FEES_TABLE + " SET fee_name=? ,amount =? ,whose_paying=?,fee_type=? ,bank=? " +
                   ",bank_acc=?,description=? ,date_=? ,payment_method=? ,history=? WHERE id=?", newFee, (err, results, fields) => { 
                       if (err) {
                           reject(err);
                       } else {
                           resolve(results.affectedRows > 0 ? "done" : "failed");
                       }
                    });
           }
        });
    });
};
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Deletes the fee from the database.
 * Returns 'done' is successful or 'failed' is unsuccessful .
 * @param {string} id - fees identifier
 * @returns {Promise<string>} Promise - string response.
 */
module.exports.deleteFee = id => {
    return new Promise((resolve, reject) => {
        con.connect(err => {
            if (err) {
                reject(err);
            } else { 
                con.query("DELETE FROM " + util.FEES_TABLE + " WHERE id = '" + id + "'", (err, results, fields) => {
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
 * Get the amount that a grade Level Should be paying.
 * @param {string} gradeLevel - The target grades
 * @returns {Promise<integer>} Promise - The TotalAmount
 */
module.exports.getFeesAmountForGradeLevel = gradeLevel => {
    return new Promise((resolve, reject) => {
        con.connect(err => { 
            if (err) {
                reject(err);
            } else {
                con.query("SELECT amount , whose_paying FROM  " +  util.FEES_TABLE + "WHERE whose_paying ='" + gradeLevel + "'", (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        let TotalAmount = 0;
                        results.forEach(item => {
                            if (typeof item.whose_paying !== "undefined") {

                                if (item.whose_paying == 'all') {

                                    TotalAmount += parseInt(item.amount);
                                }

                                if (item.whose_paying == gradesLevel) {

                                    TotalAmount += parseInt(item.amount);
                                }

                                if (item.whose_paying.includes("-")) {

                                    let min = parseInt(item.whose_paying.split("-")[0]);
                                    let max = parseInt(item.whose_paying.split("-")[1]);

                                    // check if gradeLevel is within a range of the fees was set to

                                    if (gradesLevel >= min && gradesLevel <= max) {

                                        TotalAmount += parseInt(item.amount);
                                    }
                                }
                            }
                        });
                        
                        resolve(TotalAmount);
                        
                      }
                });
            }
        });
    });  
};

/*-------------------------------------------------------------------------------------------------------*/
/**
 * Gets att the fees Types
 * @returns {Promise<Object>} Promise - Data Object of type JSON.
 */

module.exports.getFeeTypes = () => {
    return new Promise((resolve, reject) => { 
        con.connect(err => { 
            if (err) {
                reject(err);
            } else { 
                con.query("SELECT fee_name FROM " + util.FEES_TABLE, (err, results, fields) => {
                    if (err) { 
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        } );
    });
};


/*-------------------------------------------------------------------------------------------------------*/

