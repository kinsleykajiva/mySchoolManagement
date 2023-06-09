let Datastore = require('nedb');
let db = new Datastore({
	filename: 'Fees.db',
	autoload: true
});
/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------*/
/*var payment_method = {
		'method':method
};*/
/*-------------------------------------------------------------------------------------------------------*/
module.exports.getFeeTypes = function () {
	return new Promise( function (resolve , reject) {

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

module.exports.creatFeeType = function ( fee , description) {
	return new Promise( function (resolve , reject) {	

		let fee_type = {
			'fee_type': fee , // TYPE OF FEE (MONTHLY, WEEKLY,ANNUAL,ONE TIME)
			'description': description
		};

		db.insert(fee_type , function (err ,newDoc) {
			if(!err){
				resolve("done");
			}else{
				reject(err);
			}
		});
	});
};

/*-------------------------------------------------------------------------------------------------------*/

module.exports.upDateFeeType = function (id , name) {
	return new Promise(function (resolve , reject) {
		db.update({
			_id:id
		},{
			$set:{
				fee_type:name
			}
		},{multi:false},function (err , numReplaced) {
			if(!err){
				resolve(numReplaced > 0 ? "done":"failed");
			}else{
				reject(err);
			}
		});
	});
};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.deleteFeeType = function(id) {
	return new Promise(function(resolve, reject) {
		db.remove({
			_id: id
		}, {}, function(err, numRemoved) {
			if (!err) {
				resolve(numRemoved > 0 ? "done" : "failed");
			} else {
				reject(err);
			}
		});
	});
};

/*---------------------------------------############################------------------------------------*/


/*-------------------------------------------------------------------------------------------------------*/
module.exports.createFee = function (name , amount , whose_paying , fee_type , bank , method  , description  ) {
	return new Promise( function (resolve , reject) {
		var fees = {
			'fee_name': name, // (eg. TUITION FEE,LAB FEE, HOSTEL FEE,SPORTS FEE
			'amount': amount, //(CURRENT CHARGE OF THE FEE, could change with time)
			'whose_paying': whose_paying, // GARDE 4, GARDE 5, GRADE 6
			'fee_type': fee_type, //   TYPE OF FEE (MONTHLY, WEEKLY,ANNUAL,ONE TIME)
			'bank': bank, // eg ZB , Ammerican bank
			'description': description, // whats this for
			'date_': new Date(),
			'payment_method':method,
		};
		db.insert(fees , function (err , newDoc) {
			if(!err){
				resolve("done");
			}else{
				reject(err);
			}
		});
	});
}
/*-------------------------------------------------------------------------------------------------------*/

module.exports.getFeesAmountsforgradeLevel = function (gradesLevel ) {
	return new Promise ( function (resolve , reject) {
		db.find({},function (err , docs) {
				if(!err){
					let retString = ""; // {"amount":23 , ""}
					let TotalAmount = 0;
					docs.forEach(function (item) {
						
						if (typeof item.whose_paying !== "undefined") {

							if( item.whose_paying == 'all' ){
								
								TotalAmount += parseInt(item.amount);
							}

							if( item.whose_paying == gradesLevel ){

								TotalAmount += parseInt(item.amount);
							}

							if( item.whose_paying.includes("-") ){

								let min = parseInt(item.whose_paying.split("-")[0]);
								let max = parseInt(item.whose_paying.split("-")[1]);

							// check if graddeLevel is within a range of the fees was set to

							if ( gradesLevel >= min && gradesLevel <= max ) {

								TotalAmount += parseInt(item.amount);
							}
						}
					}
					});
					resolve(TotalAmount);

				}else{
					reject(err);
				}
			});
	});
};
/*-------------------------------------------------------------------------------------------------------*/
module.exports.deleteFee = function (id ) {
	return new Promise(function(resolve, reject) {
		db.remove({
			_id: id
		}, {}, function(err, numRemoved) {
			if (!err) {
				resolve(numRemoved > 0 ? "done" : "failed");
			} else {
				reject(err);
			}
		});
	});
};

/*---------------------------------------############################------------------------------------*/


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

