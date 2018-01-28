/**
 * All the Mysql database policy is designed here.
 * @module DBStudentAccess/
 * */
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
const studentTable = "CREATE TABLE `xschool_managex`.`xstudentsx`( " +
                        "`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , " +
                        " `name` VARCHAR(250) NOT NULL ," +
                        "`surname` VARCHAR(250) NOT NULL ," +
                        " `dob` VARCHAR(20) NOT NULL ," +
                        " `gender` VARCHAR(7) NOT NULL ," +
                        "`address` TEXT NOT NULL ," +
                        "`reg_no` VARCHAR(250) NOT NULL ," +
                        "`reg_date` VARCHAR(50) NOT NULL ," +
                        "`reg_time` VARCHAR(20) NOT NULL ," +
                        "`contact_no` VARCHAR(110) NOT NULL ," +
                        "`email` VARCHAR(111) NOT NULL ," +
                        "`class_name`  JSON NOT NULL ," +
                        "`class_level`  JSON NOT NULL ," +
                        "`current_className` VARCHAR(99) NOT NULL ," +
                        "`current_classLevel` VARCHAR(9) NOT NULL ," +
                        "`school_years`  JSON NOT NULL ," +
                        "`parent_name` VARCHAR(250) NOT NULL ," +
                        "`parent_surname` VARCHAR(250) NOT NULL ," +
                        "`parent_id` VARCHAR(250) NOT NULL ," +
                        "`parent_address` TEXT NOT NULL ," +
                        "`parent_contact_no` VARCHAR(110) NOT NULL ," +
                        "`parent_email` VARCHAR(111) NOT NULL ," +
                        "PRIMARY KEY(`id`) ,UNIQUE (`reg_no`) " +
                        ");";

/*-------------------------------------------------------------------------------------------------------*/
const users = "CREATE TABLE `xschool_managex`.`xusersx`( " +
  "`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , " +
  "`name` VARCHAR(250) NOT NULL , " +
  "`surname` VARCHAR(250) NOT NULL , " +
  "`password` TEXT NOT NULL , " +
  "`level_type` VARCHAR(3) NOT NULL , " +
  "`reg_date` DATE NOT NULL , " +
  "PRIMARY KEY(`id`)  " +
  " );";
  
let insert = "INSERT INTO xschool_managex.xstudentsx (" +
  " name, surname, dob, gender, address, reg_no, reg_date, reg_time, contact_no, email, class_name, class_level, current_className, current_classLevel, " +
  " school_years, parent_name, parent_surname, parent_id, parent_address, parent_contact_no, parent_email)  " +
  " VALUES(" +
  " 'kinsley', 'kajiva', '12-12-1993', 'male', '1989 mainways', 'cxw22sss', NOW(), CURTIME(), '7777', 'ssd@sdw.nm', '[Blue,White]', '[1,2,4]', " +
  " 'Blue', '1', '[2012]', 'parent1', 'parent2', '23sd3', '5453 345 fdfg', '99999', 'ser@we.hh' " +
  ");  " +
  "; ";
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Save a new student to the database
 * @param {string} studentObject - json object describing the student
 * @returns {Promise<JSON>} Promise - Promise object of the response
*/
module.exports.saveNewStudent = function (studentObject) { 
  return new Promise(function (resolve, reject) {
    let stdObj = JSON.parse(studentObject);
    con.connect(function (err) {
      if (err) {
        reject(err);
        
        }
        con.query("INSERT INTO " + util.STUDENTS_TABLE + " SET ?", stdObj, (err, result, fields) => {
          if ( !err ) {
            resolve(result.affectedRows > 0 ? "done" :"failed");
          } else { 
            reject(err);
          }
        });
    });
  });
  
};

/*-------------------------------------------------------------------------------------------------------*/
/**
 * Fetches all the students in the database with no filter .
* @returns {Promise<JSON>} Promise - resolves a JSON Object
 */
module.exports.getAllStudents = function () {
  return new Promise(function (resolve, reject) { 
    con.connect( (err)=> {
      if (err) {
        reject(err);
        
     }
      con.query("SELECT * FROM " + util.STUDENTS_TABLE, (err, results, fields) => {
        if (!err) {        
            resolve(results);
        } else {
            reject(err);
        }
      });
    });
  });
};
/*-------------------------------------------------------------------------------------------------------*/
/** Search for a student using name or surname or even registration number.
 * @param {string} query - name or surname or registration number .
 * @returns {Promise<JSON>} Promise - resolves a Json Object
  */
module.exports.searchStudents = (query) => { 
  return new Promise((resolve, reject) => {
    con.connect(err => {
      if (err) {
        reject(err);
        
      } 
      con.query( "SELECT name , surname, reg_no FROM " +  util.STUDENTS_TABLE + " WHERE name LIKE %" +
       query + "% OR surname LIKE %" + query + "% OR reg_no LIKE %"+query + "%"  , (err , results , fields)=>{
         if (err) { 
           reject(err);
         } else {
           resolve(results);
         }
       });
    
    });
    });
 };
/*-------------------------------------------------------------------------------------------------------*/
/** Search for a student using name or surname or even registration number and grade Level.
 * @param {string} query - name or surname or registration number .
 * @param {string} gradeLevel - grade Level.
 * @returns {Promise<JSON>} Promise - resolves a Json Object
 */
module.exports.searchStudentGrade = (query, gradeLevel) => { 
  con.connect(err => {
    if (err) {
      reject(err);
     
    } else {
      con.query("SELECT name , surname , reg_no , current_classLevel FROM " + STUDENTS_TABLE + " WHERE name LIKE %" +
        query + "% OR surname LIKE %" + query + "% OR reg_no LIKE %" + query + "% AND current_classLevel =" + gradeLevel, (err, results, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
      });
    }
  });
};
/*-------------------------------------------------------------------------------------------------------*/
/**Update a Student Record 
 * @param {string} reg_no - to identify record .
 * @param {JSON} studentObject - student data to save.
 * @param {JSON} studentObjectOld - old student data to make references from.
 * @returns {Promise<string>} Promise - solves a String 'done' | 'failed'.
*/
module.exports.updateStudent = (reg_no, studentObject, studentObjectOld) => {
  con.connect(err => { 
    if (err) {
      reject(err);
      
    } else {
      let arrData = null;
      let newD    = JSON.parse(studentObject);
      let oldD    = JSON.parse(studentObjectOld);
      let h       = JSON.parse(oldD.school_years);
      h.push(new Date().getFullYear() + '');
      //check if the dates have changed 
      let newSchoolyears = newD.school_years !== oldD.school_years ? '[' + h + ']' : oldD.school_years;
      // to check if any changes have been made by the user to a student record about grade level or class Name
      if (newD.current_classLevel !== oldD.current_classLevel) {
        let k = JSON.parse(oldD.current_classLevel);
        k.push(newD.current_classLevel);
        let new_classLevels = '['+ k  + ']';
            arrData         = [
          newD.name, newD.surname, newD.dob, newD.gender, newD.address, newD.contact_no, newD.email, newD.current_className, new_classLevels , newD.current_className,
          newD.current_classLevel, newSchoolyears , newD.parent_name, newD.parent_surname, newD.parent_id, newD.parent_address, newD.parent_contact_no, newD.parent_email,
          reg_no
        ];
      } else if (newD.current_className !== oldD.current_className) { 
        let k = JSON.parse(oldD.current_className);
        k.push(newD.current_className)
        let new_classNames = '[' + k + ']';
            arrData        = [
          newD.name, newD.surname, newD.dob, newD.gender, newD.address, newD.contact_no, newD.email, new_classNames,  newD.current_classLevel, newD.current_className,
          newD.current_classLevel, newSchoolyears , newD.parent_name, newD.parent_surname, newD.parent_id, newD.parent_address, newD.parent_contact_no, newD.parent_email,
          reg_no
        ];
      } else {
        arrData = [
          newD.name, newD.surname, newD.dob, newD.gender, newD.address, newD.contact_no, newD.email, new_classNames, newD.current_classLevel, newD.current_className,
          newD.current_classLevel, newD.school_years, newD.parent_name, newD.parent_surname, newD.parent_id, newD.parent_address, newD.parent_contact_no, newD.parent_email,
          reg_no
        ];
      }
      con.query("UPDATE " +  util.STUDENTS_TABLE + "SET  name = ? , surname = ?, dob = ?, gender= ?, address= ?, reg_no = ?,  contact_no = ?, email = ?, class_name = ?, class_level = ?, " +
        "current_className = ?, current_classLevel = ?," +
        " school_years = ?, parent_name = ?, parent_surname = ?, parent_id = ?, parent_address = ?, parent_contact_no = ?, parent_email = ?" +
        " WHERE reg_no = ?", arrData, (err, results, fields) => {
          
            if (err) {
              reject(err);
            } else {
              resolve(result.affectedRows > 0 ? "done" : "failed");
            }
          
      });
    }
   });
 };
/*-------------------------------------------------------------------------------------------------------*/
/**
 * Deletes a student record from the database
 * @param {string} reg_no - record identifier
 * @returns {Promise<string>} Promise - solves a String 'done' | 'failed'.
 */
module.exports.deleteStudent = (reg_no) => {
  return new Promise((resolve, reject) => { 
    con.connect(err => {
      if (err) {
        reject(err);
        
      }
      con.query("DELETE FROM " +  util.STUDENTS_TABLE + " WHERE reg_no = " + reg_no, (err, results, fields) => { 
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0 ? "done" : "failed");
        }
      });
      }); 
  });
};

/*-------------------------------------------------------------------------------------------------------*/
/**
 * This will promote a student from grade level to another grade level .<br>This could be forward or backward.<br>
 * This will get each student data and promote or demote depending on the arguments ,  so this will update all the records separatly.
 * @param {string} fromGradeLevel - currently at this grade level .
 * @param {string} toGradeLevel - the new grade level .
 * @returns {Promise<JSON>} Promise - Json object to describe the result.
 */
module.exports.graduateStudentsStream = (fromGradeLevel, toGradeLevel) => {
  const conM = mysql.createConnection({
    host              : util.HOST,
    user              : util.USER,
    password          : util.PASSWORD,
    port              : util.CONNECTION_PORT,
    debug             : false,
    multipleStatements: true,
    database          : util.STUDENTS_DATABASE
  });
  return new Promise((resolve, reject) => {
    conM.connect(err => {
      if (err) { 
        reject(err);
      }
      conM.query("SELECT * FROM " + util.STUDENTS_TABLE + " WHERE  current_classLevel =" + fromGradeLevel, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
       });
      
    });
  }).then(results => {
    let qry = "";
    results.forEach(element => {
      let k = JSON.parse(element.class_level);
      let h = JSON.parse(element.school_years);
      h.push(new Date().getFullYear()+'');
      k.push(toGradeLevel);
      let newclass_level  = '[' + k + ']';
      let newSchoolyears  = '[' + h +']';
          qry            += "UPDATE " + util.STUDENTS_TABLE + "SET current_classLevel = '" + toGradeLevel + "' , class_level = '" +
        newclass_level + "' , school_years = '" + newSchoolyears + "' WHERE reg_no = '" + element.reg_no + "' ;";
      
    }); 
    conM.connect(err => {
      if (err) {
        throw err;
      } else { 
        conM.query(qry, (err, resultsFinal, fields) => {
          if (err) {
            throw err;
          } else { 
            return {
              status           : resultsFinal.affectedRows === results.size() ? "done": "failed",
              dataRes          : resultsFinal,
              formerResultsData: results
            };
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