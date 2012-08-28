/**
 * @author vincent youmans
 */
function setup01(title){
		Ti.include(Titanium.Filesystem.resourcesDirectory+'topLocations.js');
		
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
	
	var button = Ti.UI.createButton({
		height:60,
		width:200,
		title:'SUBMIT ACCOUNT INFO',
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
		
	});	




//=========================================================================
// Create a Label.
var aLACCOUNT = Ti.UI.createLabel({
	text : 'ACCOUNT',
	color : 'red',
	font : {fontSize:15},
//	height : myHeight,
//	width : myWidth,
	top : 100,
//	left : myLeft,
	textAlign : 'center'
});

// Add to the parent view.
self.add(aLACCOUNT);



// Create a TextField.
var aTextAccount = Ti.UI.createTextField({
	height : 35,
	top : 130,
//	left : 40,
	width : 240,
	hintText : 'Account Number',
	//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Listen for return events.
aTextAccount.addEventListener('return', function(e) {
	aTextAccount.blur();
	//alert('Input was: ' + aTextAccount.value);
});

// Add to the parent view.
self.add(aTextAccount);


//=========================================================================
// Create a Label.
var aLPASSWORD = Ti.UI.createLabel({
	text : 'PASSWORD',
	color : 'red',
	font : {fontSize:15},
//	height : myHeight,
//	width : myWidth,
	top : 200,
//	left : myLeft,
	textAlign : 'center'
});

// Add to the parent view.
self.add(aLPASSWORD);



// Create a TextField.
var aTextPASSWORD = Ti.UI.createTextField({
	height : 35,
	top : 220,
//	left : 40,
	width : 240,
	hintText : 'password',
	//softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Listen for return events.
aTextPASSWORD.addEventListener('return', function(e) {
	aTextAccount.blur();
	//alert('Input was: ' + aTextPASSWORD.value);
});
// Add to the parent view.
self.add(aTextPASSWORD);




	//=============================================
	
	var Closebutton = Ti.UI.createButton({
		height:60,
		width:200,
		title:'CLOSE',
		top:Closebutton_top //340
	});
	self.add(Closebutton );
	
	Closebutton .addEventListener('click', function() {self.close()});
	//=============================================		
return self;	
}
module.exports = setup01;
