let Datastore = require('nedb');
let db = new Datastore({
	filename: 'student.db',
	autoload: true
});
/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/
module.exports.saveNewStudent = function(
	inputClassLevel,
	inputClass,
	inputFirstname,
	inputSurname,
	inputGender,
	inputDob,
	inputEmail,
	inputPhoneNumber,
	inputAddress,
	GinputFirstname,
	GinputSurname,
	GinputID,
	GinputAddress,
	GinputEmail,
	GinputPhoneNumber
) {
	return new Promise(function (resolve , reject) {
		let studentObject = {
			'inputClassLevel': inputClassLevel,
			'inputClass': inputClass,
			'inputFirstname': inputFirstname,
			'inputSurname': inputSurname,
			'inputGender': inputGender,
			'inputDob': inputDob,
			'inputEmail': inputEmail,
			'inputPhoneNumber': inputPhoneNumber,
			'inputAddress': inputAddress,
			'GinputFirstname': GinputFirstname,
			'GinputSurname': GinputSurname,
			'GinputID': GinputID,
			'GinputAddress': GinputAddress,
			'GinputEmail': GinputEmail,
			'GinputPhoneNumber': GinputPhoneNumber
		};
		db.insert(studentObject , function (err , newDoc) {
			if(!err){
				resolve("done");
			}else{
				reject(err)
			}

		});
	});
};

/*-------------------------------------------------------------------------------------------------------*/