/*********************************************************************************************/
const ipcRenderer = require("electron").ipcRenderer;
/*********************************************************************************************/
/*********************************************************************************************/

/*********************************************************************************************/
/*********************************************************************************************/
$('td:nth-child(5),th:nth-child(5)').hide();

/*********************************************************************************************/
function onloadData() {
  const timestamp = moment().format("MMM Do YYYY"); // Jan 9th 18
  $("#invoiceIssueDate").text(timestamp);
  $("#invoiceSchoolName").text(getSchoolName());
  $("#invoiceschoolAddress").text(getSchoolAddress());
  $("#invoiceSchoolContacts").text(getSchoolPhoneNumber());

  _txt("toWhoName", "Name of the person the invoice is going to");
  _txt("toContantsEmail", "mail@gmail.com");
  _txt("toContantsPhoneNumber", "073 44 6");
  let passedArrData = ["Fees", "1", "$23.00", "$22222"];
  let tbodyInvoice = __("invoiceDeatilsTable");
  let tr = "<tr>" + "<td> " + passedArrData[0] + " </td>" + "<td> " + passedArrData[1] + " </td>" +
   "<td> " + passedArrData[2] + " </td>" + "<td>" + passedArrData[3] + "  </td>" + "</tr>";
   tbodyInvoice.append(tr);
}
//onloadData();
/*********************************************************************************************/
function printPage() {
  //$("#containerNav").slideUp(460);
 /*  $("#statusIcon")
    .toggleClass("fa fa-spinner fa-pulse fa-1x fa-fw")    
    .addClass("fa-pulse")
    .toggleClass("fa fa-check-circle fa-pulse fa-1x fa-fw")
    .removeClass("fa-pulse")   
    .append(" ");
    $("#readyStatus")
      .text(" Ready")
      .fadeIn(2000); */
 ipcRenderer.send("invoiceReady");

}
/*********************************************************************************************/
ipcRenderer.on("invoiceData", (event, content) => {
 $("#otherTableContentContainer").html(content);

  
});
/*********************************************************************************************/

/*********************************************************************************************/
/*********************************************************************************************/

/*********************************************************************************************/
