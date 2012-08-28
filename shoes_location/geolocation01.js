/**
 * @author vincent youmans
 */


function geolocation() {
	var win = Titanium.UI.createWindow();
	win.backgroundColor = '#fff';
	win.openedflag = 0 ;
	win.focusedflag = 0;

	Ti.include(Titanium.Filesystem.resourcesDirectory+"/etc/version.js");

	Ti.Geolocation.preferredProvider = "gps";

	if (isIPhone3_2_Plus())
	{
		//NOTE: starting in 3.2+, you'll need to set the applications
		//purpose property for using Location services on iPhone
		Ti.Geolocation.purpose = "GPS demo";
	}

	function translateErrorCode(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	}




//=======================================================================
	var currentLocationLabel = Titanium.UI.createLabel({
		text:'Current Location (One Shot)',
		font:{fontSize:12, fontWeight:'bold'},
		color:'#111',
		top:110,
		left:10,
		height:15,
		width:300
	});
	win.add(currentLocationLabel);

	var currentLocation = Titanium.UI.createLabel({
		text:'Current Location not fired',
		font:{fontSize:11},
		color:'#444',
		top:130,
		left:10,
		height:15,
		width:300
	});
	win.add(currentLocation);
//===========================================================================



	var updatedLocationLabel = Titanium.UI.createLabel({
		text:'Updated Location',
		font:{fontSize:12, fontWeight:'bold'},
		color:'#111',
		top:150,
		left:10,
		height:15,
		width:300
	});
	win.add(updatedLocationLabel);

	var updatedLocation = Titanium.UI.createLabel({
		text:'Updated Location not fired',
		font:{fontSize:11},
		color:'#444',
		top:170,
		left:10,
		height:15,
		width:300
	});
	win.add(updatedLocation);

	var updatedLatitude = Titanium.UI.createLabel({
		text:'',
		font:{fontSize:11},
		color:'#444',
		top:190,
		left:10,
		height:15,
		width:300
	});
	win.add(updatedLatitude);

	var updatedLocationAccuracy = Titanium.UI.createLabel({
		text:'',
		font:{fontSize:11},
		color:'#444',
		top:210,
		left:10,
		height:15,
		width:300
	});
	win.add(updatedLocationAccuracy);

	var updatedLocationTime = Titanium.UI.createLabel({
		text:'',
		font:{fontSize:11},
		color:'#444',
		top:230,
		left:10,
		height:15,
		width:300
	});
	win.add(updatedLocationTime);



	var forwardGeoLabel = Titanium.UI.createLabel({
		text:'Forward Geo (Addr->Coords)',
		font:{fontSize:12, fontWeight:'bold'},
		color:'#111',
		top:250,
		left:10,
		height:15,
		width:300
	});
	win.add(forwardGeoLabel);

	var forwardGeo = Titanium.UI.createLabel({
		text:'',
		font:{fontSize:11},
		color:'#444',
		top:270,
		left:10,
		height:15,
		width:300
	});
	win.add(forwardGeo);

	var reverseGeoLabel = Titanium.UI.createLabel({
		text:'Reverse Geo (Coords->Addr)',
		font:{fontSize:12, fontWeight:'bold'},
		color:'#111',
		top:290,
		left:10,
		height:15,
		width:300
	});
	win.add(reverseGeoLabel);

	var reverseGeo = Titanium.UI.createLabel({
		text:'',
		font:{fontSize:11},
		color:'#444',
		top:310,
		left:10,
		height:15,
		width:300
	});
	win.add(reverseGeo);

	// state vars used by resume/pause
	var headingAdded = false;
	var locationAdded = false;

	//
	//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
	//
	if (Titanium.Geolocation.locationServicesEnabled === false)
	{
		Titanium.UI.createAlertDialog({title:'GEO LOCATION', message:'Your device has geo turned off - turn it on.'}).show();
	}
	else
	{
		if (Titanium.Platform.name != 'android') {
			if(win.openedflag == 0 ){
				Ti.API.info('firing open event');
				win.fireEvent('open');
			}
			if(win.focusedflag == 0){
				Ti.API.info('firing focus event');
				win.fireEvent('focus');
			}
			var authorization = Titanium.Geolocation.locationServicesAuthorization;
			Ti.API.info('Authorization: '+authorization);
			if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
				Ti.UI.createAlertDialog({
					title:'GEOLOCATION',
					message:'You have disallowed Titanium from running geolocation services.'
				}).show();
			}
			else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
				Ti.UI.createAlertDialog({
					title:'GEOLOCATION',
					message:'Your system has disallowed Titanium from running geolocation services.'
				}).show();
			}
		}

		//
		// IF WE HAVE COMPASS GET THE HEADING
		//
		if (Titanium.Geolocation.hasCompass)
		{
			//
			//  TURN OFF ANNOYING COMPASS INTERFERENCE MESSAGE
			//
			Titanium.Geolocation.showCalibration = false;

			//
			// SET THE HEADING FILTER (THIS IS IN DEGREES OF ANGLE CHANGE)
			// EVENT WON'T FIRE UNLESS ANGLE CHANGE EXCEEDS THIS VALUE
			Titanium.Geolocation.headingFilter = 90;

			//
			//  GET CURRENT HEADING - THIS FIRES ONCE
			//
			Ti.Geolocation.getCurrentHeading(function(e)
			{
				if (e.error)
				{
					currentHeading.text = 'error: ' + e.error;
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					return;
				}

				var accuracy = e.heading.accuracy;
				var timestamp = e.heading.timestamp;
			});

			//
			// EVENT LISTENER FOR COMPASS EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON HEADING FILTER)
			//
			var headingCallback = function(e)
			{
				if (e.error)
				{
					updatedHeading.text = 'error: ' + e.error;
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					return;
				}

				var accuracy = e.heading.accuracy;
				var timestamp = e.heading.timestamp;

				setTimeout(function(){},100);

			};
			Titanium.Geolocation.addEventListener('heading', headingCallback);
			headingAdded = true;
		}
		else
		{
			Titanium.API.info("No Compass on device");
		}




		//
		//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
		//
		// Titanium.Geolocation.ACCURACY_BEST
		// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
		// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
		// Titanium.Geolocation.ACCURACY_KILOMETER
		// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
		//
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

		//
		//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
		//  THIS VALUE IS IN METERS
		//
		Titanium.Geolocation.distanceFilter = 10;

		//
		// GET CURRENT POSITION - THIS FIRES ONCE
		//
		win.addEventListener('open', function() {
			win.openedflag = 1;
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error)
				{
					currentLocation.text = 'error: ' + JSON.stringify(e.error);
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('error ' + JSON.stringify(e.error));
					return;
				}

				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;
				Ti.API.info('speed ' + speed);
				currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;

				Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			});
		});	

		//
		// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
		//
		var locationCallback = function(e)
		{
			//Mobileweb seems to be not firing window event for some odd reason.
			//Forcing a window open and focus event.
			if(win.openedflag == 0 ){
				Ti.API.info('firing open event');
				win.fireEvent('open');
			}
			if(win.focusedflag == 0){
				Ti.API.info('firing focus event');
				win.fireEvent('focus');
			}
			if (!e.success || e.error)
			{
				updatedLocation.text = 'error:' + JSON.stringify(e.error);
				updatedLatitude.text = '';
				updatedLocationAccuracy.text = '';
				updatedLocationTime.text = '';
				Ti.API.info("Code translation: "+translateErrorCode(e.code));
				return;
			}

			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			var altitude = e.coords.altitude;
			var accuracy = e.coords.accuracy;
			var timestamp = e.coords.timestamp;

			//Titanium.Geolocation.distanceFilter = 100; //changed after first location event

			updatedLocation.text = 'long:' + longitude;
			updatedLatitude.text = 'lat: '+ latitude;
			updatedLocationAccuracy.text = 'accuracy:' + accuracy;
			updatedLocationTime.text = 'timestamp:' +new Date(timestamp);

			updatedLatitude.color = 'red';
			updatedLocation.color = 'red';
			updatedLocationAccuracy.color = 'red';
			updatedLocationTime.color = 'red';
			setTimeout(function()
			{
				updatedLatitude.color = '#444';
				updatedLocation.color = '#444';
				updatedLocationAccuracy.color = '#444';
				updatedLocationTime.color = '#444';

			},100);

			// reverse geo
			Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt)
			{
				if (evt.success) {
					var places = evt.places;
					if (places && places.length) {
						reverseGeo.text = places[0].address;
					} else {
						reverseGeo.text = "No address found";
					}
					Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
				}
				else {
					Ti.UI.createAlertDialog({
						title:'Reverse geo error',
						message:evt.error
					}).show();
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
				}
			});	

			Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		};
		Titanium.Geolocation.addEventListener('location', locationCallback);
		locationAdded = true;

	}

	win.addEventListener('focus', function()
	{
		win.focusedflag = 1;
		Ti.API.info("focus event received");
		if (!headingAdded && headingCallback) {
			Ti.API.info("adding heading callback on resume");
			Titanium.Geolocation.addEventListener('heading', headingCallback);
			headingAdded = true;
		}
		if (!locationAdded && locationCallback) {
			Ti.API.info("adding location callback on resume");
			Titanium.Geolocation.addEventListener('location', locationCallback);
			locationAdded = true;
		}


		var addr = "2065 Hamilton Avenue San Jose California 95125";

		Titanium.Geolocation.forwardGeocoder(addr,function(evt)
		{
			Ti.API.info('in forward ');
			forwardGeo.text = "lat:"+evt.latitude+", long:"+evt.longitude;
			Titanium.Geolocation.reverseGeocoder(evt.latitude,evt.longitude,function(evt)
			{
				if (evt.success) {
					var text = "";
					for (var i = 0; i < evt.places.length; i++) {
						text += "" + i + ") " + evt.places[i].address + "\n";
					}
					Ti.API.info('Reversed forward: '+text);
				}
				else {
					Ti.UI.createAlertDialog({
						title:'Forward geo error',
						message:evt.error
					}).show();
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
				}
			});
		});
	});	

	win.addEventListener('blur', function() {
		Ti.API.info("pause event received");
		if (headingAdded) {
			Ti.API.info("removing heading callback on pause");
			Titanium.Geolocation.removeEventListener('heading', headingCallback);
			headingAdded = false;
		}
		if (locationAdded) {
			Ti.API.info("removing location callback on pause");
			Titanium.Geolocation.removeEventListener('location', locationCallback);
			locationAdded = false;
		}
	});



//-------------------   add log button to ONE SHOT

// Create a Button.
var aButtonLogLastLocation = Ti.UI.createButton({
	title : 'aButtonLogLastLocation',
	height : 40,
	width : 300,
	top : 30,
//	left : myLeft
});

// Listen for click events.
aButtonLogLastLocation.addEventListener('click', function() {
	alert('\'aButtonLogLastLocation\' was clicked!');
			win.openedflag = 1;
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error)
				{
					currentLocation.text = 'error: ' + JSON.stringify(e.error);
					Ti.API.info("Code translation: "+translateErrorCode(e.code));
					alert('error ' + JSON.stringify(e.error));
					return;
				}

				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;
				Ti.API.info('speed ' + speed);
				currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;

				Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
			});


});

// Add to the parent view.
win.add(aButtonLogLastLocation);



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
	win.close();
});

// Add to the parent view.
win.add(aButton_CLOSE);





	return win;
};

module.exports = geolocation;

