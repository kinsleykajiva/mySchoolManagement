'use strict';
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const url = require('url');
const path = require('path');
const elemon = require('elemon');


const fs = require("fs");
const os = require("os");

//var ipc = require('ipc');


let win = null;
let workerWindow =null;
let printInvoiceWindow =null;
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
		//
    /* workerWindow = new BrowserWindow();
    workerWindow.hide();
		workerWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../views", "worker.html"),
        protocol: "file:",
        slashes: true,
        titleBarStyle: "hidden",
        frame: false
      })
    );
    
     
   // workerWindow.webContents.openDevTools();
    workerWindow.on("closed", () => {
      workerWindow = undefined;
    }); */
    //
     
    //
		elemon({
			app: app,
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
    parent: win,
    width: 900 - 70,
    height: 720,
    titleBarStyle: "hiddenInset"
    /*  frame: false */
  });
  printInvoiceWindow.setTitle("Printing Window");
  printInvoiceWindow.on("close", function() {
    printInvoiceWindow = null;
  });
  printInvoiceWindow.loadURL(url.format({
      pathname: path.join(__dirname, "../views", "invoicePrint.html"),
      protocol: "file:",
      slashes: true,
      titleBarStyle: "hidden",
      frame: false
    }));
    printInvoiceWindow.setMenu(null);
    printInvoiceWindow.setMinimizable(false);
    printInvoiceWindow.center();
    printInvoiceWindow.show();
    win.show();
  printInvoiceWindow.show();
}
ipcMain.on("printPDF111", (event, content) => {
	
  const pdfPath = path.join(os.tmpdir(), "print.pdf");
  const winn = BrowserWindow.fromWebContents(event.sender);

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
  createInvoicePrintWindow();
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

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

/****************************************************************************************************/

// create window
app.on('ready' , onCreateWindow );
// kills process the necessary windows are closed
app.on('closed' , onExitWindow);






