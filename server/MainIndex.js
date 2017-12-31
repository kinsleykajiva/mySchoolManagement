'use strict';
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const elemon = require('elemon');
//var ipc = require('ipc');


let win = null;
const windowWidth = 1500;
const windowHeight = 800;

require('electron-reload')(__dirname, {
  electron: require('${__dirname}/../../node_modules/electron')
})
//


function onCreateWindow () {
	
		win = new BrowserWindow({
			width: windowWidth ,
			height:windowHeight,
			title: 'Private School Management'
		});
		//win.setMenu(null);
		win.loadURL(
				url.format({
					pathname:path.join(__dirname , '../views','index.html'),
					protocol:'file:',
					slashes:true , 
					titleBarStyle: 'hidden' ,
					frame: false
				})

		);
		elemon({
			app: app,
			mainFile: 'MainIndex.js',
			/*bws: [
					{bw: win, res: ['../views/index.html', '../public/js/customeQuery.js', '../public/css/style.css']}
			]*/
		});

		let server = require('./requestsExpress.js');
}

/****************************************************************************************************/
function onExitWindow () {
	win = null ;
}
/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

// create window
app.on('ready' , onCreateWindow );
// kills process the necessary windows are closed
app.on('closed' , onExitWindow);






