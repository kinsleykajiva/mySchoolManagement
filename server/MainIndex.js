'use strict';
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const url                                    = require('url');
const path                                   = require('path');
const elemon                                 = require('elemon');
const fs                                     = require("fs");
const os                                     = require("os");

let   win                = null;
let   workerWindow       = null;
let   printInvoiceWindow = null;
let   logInWin           = null;
const windowWidth        = 1500;
const windowHeight       = 800;

require('electron-reload')(__dirname, {
  electron: require('${__dirname}/../../node_modules/electron')
})
//

function onCreateLogIn() { 
  logInWin = new BrowserWindow({
    	width          : windowWidth,
    	height         : windowHeight,
    	title          : 'Log In',
    	backgroundColor: '#73caef',
    	titleBarStyle  : 'hidden',
    	icon           : path.join(__dirname, '../public/images/assets/128/logo.png')
  });
  logInWin.setMenu(null);
  logInWin.loadURL(
    	url.format({
    	  pathname     : path.join(__dirname, '../views', 'login.html'),
    	  protocol     : 'file:',
    	  slashes      : true,
    	  titleBarStyle: 'hidden',
    	  frame        : false
    	})
  );
 }
function onCreateWindow () {
	
		win = new BrowserWindow({
			width          : windowWidth,
			height         : windowHeight,
			title          : 'Private School Management',
			backgroundColor: '#73caef',
			titleBarStyle  : 'hidden',
			icon           : path.join(__dirname, '../public/images/assets/128/logo.png')
		});
		//win.setMenu(null);
		win.loadURL(
				url.format({
					pathname     : path.join(__dirname , '../views','index.html'),
					protocol     : 'file:',
					slashes      : true,
					titleBarStyle: 'hidden',
					frame        : false
				})

    );
    createInvoicePrintWindow();
    createWorkerWindow();
		//
    /* */
    //
     
    //
		elemon({
			app     : app,
			mainFile: 'MainIndex.js',
			/*bws: [
					{bw: win, res: ['../views/index.html', '../public/js/customeQuery.js', '../public/css/style.css']}
			]*/
		});

let server = require('./requestsExpress.js');
} // "../views/","invoicePrint.html"
function createInvoicePrintWindow() {
  // create a child window to process printing
 
  printInvoiceWindow = new BrowserWindow({
    parent       : win,
    width        : 900 - 70,
    height       : 720,
    titleBarStyle: 'hidden',
    icon         : path.join(__dirname, '../public/images/assets/128/logo.png')
    
    /*  frame: false */
  });
  printInvoiceWindow.setTitle("Printing Window");
  printInvoiceWindow.on("close", function() {
    createInvoicePrintWindow();
  });
  printInvoiceWindow.loadURL(url.format({
      pathname     : path.join(__dirname, "../views", "invoicePrint.html"),
      protocol     : "file:",
      slashes      : true,
      titleBarStyle: "hidden",
      frame        : false
    }));
    //printInvoiceWindow.setMenu(null);
    printInvoiceWindow.setMinimizable(false);
    printInvoiceWindow.center();    
     printInvoiceWindow.hide();
    
}
/**
 * Create a background window to handel other form of printings
 * **/
function createWorkerWindow() {
   workerWindow = new BrowserWindow({show: false});
   workerWindow.hide();
   workerWindow.loadURL(url.format({
       pathname     : path.join(__dirname, "../views", "worker.html"),
       protocol     : "file:",
       slashes      : true,
       titleBarStyle: "hidden",
       frame        : false
     }));

   // workerWindow.webContents.openDevTools();
   workerWindow.on("closed", () => {
     workerWindow = undefined;
   });
}
ipcMain.on("printPDF111", (event, content) => {
	
  const pdfPath = path.join(os.tmpdir(), "print.pdf");
  const winn    = BrowserWindow.fromWebContents(event.sender);

  winn.webContents.printToPDF({}, function(error, data) {
    if (error) throw error;
    fs.writeFile(pdfPath, data, function(error) {
      if (error) {
        throw error;
      }
      shell.openExternal("file://" + pdfPath);
      event.sender.send("wrote-pdf", pdfPath);
    });
  });

});

ipcMain.on("printPDF", (event, content) => {
  
  workerWindow.webContents.send("printPDF", content);
});
// when worker window is ready
ipcMain.on("readyToPrintPDF", (event) => {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    // Use default printing options
    workerWindow.webContents.printToPDF({}, function (error, data) {
        if (error) throw error
        fs.writeFile(pdfPath, data, function (error) {
            if (error) {
                throw error;
            }
            shell.openItem(pdfPath)
            event.sender.send('wrote-pdf', pdfPath)
        });
    });
});
/****************************************************************************************************/
ipcMain.on("openInvoiceWindow", (event, content) => {
  
  win.show();
  printInvoiceWindow.show();
  printInvoiceWindow.webContents.send("invoiceData", content);
});
ipcMain.on("invoiceReady",(ev)=>{
  
  const pdfPath = path.join(os.tmpdir(), "print.pdf");
  printInvoiceWindow.webContents.printToPDF({},function (err , data) {
      fs.writeFile(pdfPath , data , function(err){
        if (err) {
          throw err;
        } else {         
          shell.openItem(pdfPath);
          ev.sender.send("wrote-pdf", pdfPath);
        }
      });
  });
});
/****************************************************************************************************/
/****************************************************************************************************/
function onExitWindow () {
	win = null ;
}
/****************************************************************************************************/
ipcMain.on('closeLogIn', (ev, args) => {
  logInWin.hide();
});
/****************************************************************************************************/
  
/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

// create window
app.on('ready',  onCreateWindow /* onCreateLogIn */);
// kills process the necessary windows are closed

app.on('closed' ,  (ev)=> {
  printInvoiceWindow = null;
  logInWin           = null;
  onExitWindow();
});






