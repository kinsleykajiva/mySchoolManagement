
  $(document).ready(function(){
  	// http://localhost:3500/getAllStudentData
    

    ////////////////////////////////////////
  var selectAll = $('#selectAll'); // main checkbox inside table 
   var table = $('#showingTable'); // table selector 
    var tdCheckbox = table.find('tbody input:checkbox'); // checboxes inside table body
    var tdCheckboxChecked = []; // checked checbox arr
  
    //Select or deselect all checkboxes on main checkbox change
    selectAll.on('click', function () {
    	
        tdCheckbox.prop('checked', this.checked);
         tdCheckboxChecked = table.find('tbody input:checkbox:checked');//Collect all checked checkboxes from tbody tag
    });
    //Switch main checkbox state to checked when all checkboxes inside tbody tag is checked
    tdCheckbox.on('change', function(){
    	
        tdCheckboxChecked = table.find('tbody input:checkbox:checked');//Collect all checked checkboxes from tbody tag
    //if length of already checked checkboxes inside tbody tag is the same as all tbody checkboxes length, then set property of main checkbox to "true", else set to "false"
        selectAll.prop('checked', (tdCheckboxChecked.length == tdCheckbox.length));
        
    });

    
    $("#inof").click(function () {
    	
    	for (var i = 0; i < tdCheckboxChecked.length; i++) {
    		console.log(tdCheckboxChecked[i]);

    	}
    	
    	
    });


  });


