let Datastore = require('nedb');
let db = new Datastore({
	filename: 'student.db',
	autoload: true
});
/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/
module.exports.deleteStudent = function(id_) {

	return new Promise(function(resolve, reject) {

		db.remove({
			reg_num: id_
		}, {}, function(err, numRemoved) {
			
			if(!err){
				resolve( numRemoved >0 ? "done" : "failed");
			}else{
				reject(err);
			}
		});

	});


};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.searchStudentGrade =  function(query, grad_) {


	return new Promise(function(resolve, reject) {

		db.find({
			$and: [{
					inputClassLevel: grad_
				}, {

					$or: [{
						inputFirstname: {
							$regex: new RegExp('.*' + query.toLowerCase() + '.*', 'i')
						}
					}, {
						inputSurname: {
							$regex: new RegExp('.*' + query.toLowerCase() + '.*', 'i')
						}
					}, {
						reg_num: {
							$regex: new RegExp('.*' + query.toLowerCase() + '.*', 'i')
						}
					}]
				}

			]
		}, function(err, docs) {
			if (!err) {

				resolve(docs);

			} else {

				reject(err);

			}

		});
	});
}
/*-------------------------------------------------------------------------------------------------------*/
module.exports.searchStudents = function (query) {
	return new Promise(function (resolve , reject) {
		
		db.find({
			$or:[
				{
					inputFirstname:{
						$regex: new RegExp('.*' + query.toLowerCase() + '.*', 'i')
					}
				},{
					inputSurname:{
						$regex: new RegExp('.*' + query.toLowerCase() + '.*', 'i')
					}
				},{
					reg_num:{
						$regex:new RegExp('.*' + query.toLowerCase() + '.*', 'i')
					}
				}
			]
		},function (err , docs) {
			if(!err){
				resolve(docs);
			}else{
				reject(err);
			}
		});
	});
};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.getAllStudents = function () {
	return new Promise(function (resolve , reject) {
		db.find({},function (err , docs) {
			if(!err){
				resolve(docs);
			}else{
				reject(err);
			}
		});
	});
};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.updateStudent = function (reg_num , 
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
		db.update({
			reg_num:reg_num
		},{
			$set:{
				inputClassLevel :inputClassLevel,
				inputClass :inputClass,
				inputFirstname :inputFirstname,
				inputSurname :inputSurname,
				inputGender :inputGender,
				inputDob :inputDob,
				inputEmail :inputEmail,
				inputPhoneNumber :inputPhoneNumber,
				inputAddress :inputAddress,
				GinputFirstname :GinputFirstname,
				GinputSurname :GinputSurname,
				GinputID :GinputID,
				GinputAddress :GinputAddress,
				GinputEmail :GinputEmail,
				GinputPhoneNumber :GinputPhoneNumber
			}
		},{multi:true},function (err ,  numReplaced) {
			if(!err){

				if(numReplaced > 0){

					resolve("done");
				}else{
					resolve("no_save");
				}
			}else{
				reject(err)
			}
		});
	});
} ;
/*-------------------------------------------------------------------------------------------------------*/
module.exports.saveNewStudent = function(
	reg_num,
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
			'reg_num':reg_num
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
			'GinputPhoneNumber': GinputPhoneNumber,
			'date_': new Date()
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