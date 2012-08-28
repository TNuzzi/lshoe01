		var deviceWidth = Ti.Platform.displayCaps.platformWidth;
		var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;

	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;

		if (osname === 'android') {
			//Window = require('ui/handheld/android/ApplicationWindow');
			var Closebutton_top = 550;
			
			
			// SUBMIT
			var butGEO_top = 20;
			var butGETBINNUMBER_top  = 90;
			var butGETBINSTATUS_top = 160;
		}
		else {
			//iOS
			//Window = require('ui/handheld/ApplicationWindow');
			var Closebutton_top = 350;
			
			
			// SUBMIT
			var butGEO_top = 20;
			var butGETBINNUMBER_top  = 90;
			var butGETBINSTATUS_top = 160;

		
		}
		
//used in GeoLocate
		
		Ti.API.info('------ the device type is: '+ osname);		
		if(osname == 'android'){
				Ti.API.info('this is an android device ---win1 -------------------');
				//var splashimage = '/images/chip-android_tablet-B.jpg';
				var splashimage = '/images/chip-android_tablet-A.jpg';					
				var	myHeight = 40;
				var	myWidth = 300;
				var myTopaBCLOSE = 600;
				var myLeftaBCLOSE = 20;
				
				
				var myHeight_aBSNAP_LOCATION = myHeight;
				var myWidth_aBSNAP_LOCATION = myWidth;				
				var myTop_aBSNAP_LOCATION = 200;
				var	myLeft_aBSNAP_LOCATION = 100;				

				//self.backgroundImage =splashimage;
		}else{
			Ti.API.info('---------- this is an iOS image --- win1 -------------');
				//Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
				var splashimage = 'images/chip-iOS-FULLSCREEN.jpg';	
				var	myHeight = 40;
				var	myWidth = 300;
				var myTopaBCLOSE = 390;
				var myLeftaBCLOSE = 'auto';	
				
				var myHeight_aBSNAP_LOCATION = myHeight;
				var myWidth_aBSNAP_LOCATION = myWidth;				
				var myTop_aBSNAP_LOCATION = 50;
				var	myLeft_aBSNAP_LOCATION = 10;				
								
		};

		

//var Closebutton_top = 350;
