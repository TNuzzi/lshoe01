/**
 * @author vincent youmans
 */


function setup01(title){
		Ti.include(Titanium.Filesystem.resourcesDirectory+'topLocations.js');

	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	//=============================================		
	var butSYNCH = Ti.UI.createButton({
		height:60,
		width:300,
		title:'SYNCH TO SERVER',
		top:20
	});
	self.add(butSYNCH);
	
	butSYNCH.addEventListener('click', function() {});	
	//=============================================
	
	//=============================================	
	var butNEWENTRY = Ti.UI.createButton({
		height:60,
		width:300,
		title:'NEW BIN LOG ENTRY',
		top:90
	});
	self.add(butNEWENTRY);

	butNEWENTRY.addEventListener('click', function() {
		Window01 = require('shoe/submit01A');
		var win1 = new Window01('NEW ENTRY');
		
		win1.open({animated:true
			//modal: true, 
			//modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL, 
			//modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN, 
			//navBarHidden: false
		});
		
	});	
	//=============================================
		
	
	
		
	
	
	//=============================================
	
	var Closebutton = Ti.UI.createButton({
		height:60,
		width:300,
		title:'CLOSE',
		top:Closebutton_top //340
	});
	self.add(Closebutton );
	
	Closebutton .addEventListener('click', function() {self.close()});
	//=============================================			
return self;	
}
module.exports = setup01;
