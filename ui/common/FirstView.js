//FirstView Component Constructor
function FirstView() {
	Ti.include(Titanium.Filesystem.resourcesDirectory+'topLocations.js');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#000000',
		text:'Shoes Logistic System 01',
		top:30,
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	//Add behavior for UI


// Create a Button.
var aBSetUP = Ti.UI.createButton({
	title : 'SET UP',
	height : 60,
	width : 200,
	top : 100
//	left : myLeft
});

// Listen for click events.
aBSetUP.addEventListener('click', function() {
	//alert('\'aButton\' was clicked!');
		Window01 = require('shoe/setup01');
		var win1 = new Window01('SET UP');
		win1.open({
			modal: true, 
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL, 
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN, 
			navBarHidden: true
		});
	
	
});

// Add to the parent view.
self.add(aBSetUP);

//=========================================================
// Create a Button.
var aBSubmit = Ti.UI.createButton({
	title : 'SUBMIT BIN',
	height : 60,
	width : 200,
	top : 170
//	left : myLeft
});

// Listen for click events.
aBSubmit.addEventListener('click', function() {
		Window01 = require('shoe/submit01');
		var win1 = new Window01('SUBMIT');
		win1.open({    
			modal: true, 
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL, 
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN, 
			navBarHidden: true
    	});
});

// Add to the parent view.
self.add(aBSubmit);


	
	return self;
}

module.exports = FirstView;
