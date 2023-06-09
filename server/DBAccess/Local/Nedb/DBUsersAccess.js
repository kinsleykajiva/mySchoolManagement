let Datastore = require('nedb');
let db = new Datastore({
	filename: 'Users.db',
	autoload: true
});
/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

module.exports.createUsers = function ( name_ , surname_ , password ,  type_ ) {

	return new Promise((resolve , reject)=>{
		let user = {
			'name_'     : name_,
			'surname_'  : surname_,
			'password'  : password,
			'level_type': type_,
			'date_'     : new Date()
		};
		db.insert(user , (err , docs)=>{
			if(!err){
				resolve("done");
			}else{
				reject(err);
			}
		});
	});
};

/*-------------------------------------------------------------------------------------------------------*/

module.exports.getAllUsers = function () {
	return new Promise((resolve , reject)=>{

		db.find({},(err , docs)=>{
			if(!err){
				resolve(docs);
			}else{
				reject(err);
			}
		});

	});
};

/*-------------------------------------------------------------------------------------------------------*/
module.exports.editUSer = function (id ,name_ , surname_ , password ,  type_  ) {
	return new Promise((resolve , reject)=>{
		db.update({
			_id: id
		},{
			$set:{
				'name_'     : name_,
				'surname_'  : surname_,
				'password'  : password,
				'level_type': type_
			}
		},{multi:false},(err , updates)=>{
			if(!err){
				resolve("done");
			}else{
				reject(err);
			}
		});
	});
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

/*-------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

