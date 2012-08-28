/**
 * @author vincent youmans
 */

function ANDROID_barCode (){
var qrreader = undefined;
var qrCodeWindow = undefined;
var qrCodeView = undefined;


qrreader = require('com.acktie.mobile.android.qr');

//create object instance, a parasitic subclass of Observable
var self = Ti.UI.createWindow({backgroundColor: 'white'});


//=============================================================================================================
var qrFromCameraContButton = Titanium.UI.createButton({
	title : 'From Camera (Sampling Continuous)',
	height : 40,
	width : '100%',
	top : 110
});
qrFromCameraContButton.addEventListener('click', function() {
	var options = {
		// ** Android QR Reader properties (ignored by iOS)
		backgroundColor : 'black',
		width : '100%',
		height : '90%',
		top : 0,
		left : 0,
		// **

		// ** Used by iOS (allowZoom/userControlLight ignored on Android)
		userControlLight : true,
		allowZoom : false,

		// ** Used by both iOS and Android
		overlay : {
			imageName : 'exampleBranding.png',
		},
		continuous : true,
		success : success,
		cancel : cancel,
		error : error,
	};


		//  android only solutions
		scanQRFromCamera(options);

});

self.add(qrFromCameraContButton);



function success(data) {
	Titanium.Media.vibrate();
	alert(data.data);
};

function cancel() {
	alert("Cancelled");
};

function error() {
	alert("error");
};




/*
 * Function that mimics the iPhone QR Code reader behavior.
 */
function scanQRFromCamera(options) {
	qrCodeWindow = Titanium.UI.createWindow({
		backgroundColor : 'black',
		width : '100%',
		height : '100%',
	});
	qrCodeView = qrreader.createQRCodeView(options);

	var closeButton = Titanium.UI.createButton({
		title : "close",
		bottom : 0,
		left : 0
	});
	var lightToggle = Ti.UI.createSwitch({
		value : false,
		bottom : 0,
		right : 0
	});

	closeButton.addEventListener('click', function() {
		qrCodeView.stop();
		qrCodeWindow.close();
	});

	lightToggle.addEventListener('change', function() {
		qrCodeView.toggleLight();
	})

	qrCodeWindow.add(qrCodeView);
	qrCodeWindow.add(closeButton);

	if (options.userControlLight != undefined && options.userControlLight) {
		qrCodeWindow.add(lightToggle);
	}

	// NOTE: Do not make the window Modal.  It screws stuff up.  Not sure why
	qrCodeWindow.open();
};

if (Ti.Platform.osname === 'android') {
	var activity = Ti.Android.currentActivity;
	activity.addEventListener('pause', function(e) {
		Ti.API.info('Inside pause');
		if (qrCodeView != undefined) {
			qrCodeView.stop();
		}

		if (qrCodeWindow != undefined) {
			qrCodeWindow.close();
		}
	});
}
//=====================================================================================================

// Create a Button.
var aButton_CLOSE = Ti.UI.createButton({
	title : 'CLOSE',
	height : 40,
	width : 300,
	top : 350
//	left : myLeft
});

// Listen for click events.
aButton_CLOSE.addEventListener('click', function() {
	//alert('\'aButton\' was clicked!');
	self.close();
});

// Add to the parent view.
self.add(aButton_CLOSE);

//===============================================================================


self.open();

return self;

};
module.exports = ANDROID_barCode;