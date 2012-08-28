/**
 * @author vincent youmans
 */
function getGeo01(){

		Ti.include(Titanium.Filesystem.resourcesDirectory+"/etc/version.js");
		Ti.include(Titanium.Filesystem.resourcesDirectory+'topLocations.js');
		//Ti.Geolocation.preferredProvider = "gps";
	
	
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
	};




	
	var title = 'Geo Locate BIN';
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
		
		var winbackgroundColor = 'red';
		//var winbackgroundColor = 'green';
		//var winbackgroundColor = 'blue';
		//var winbackgroundColor = 'black';



var label = Ti.UI.createLabel({
	color:'#000000',
	text:'GEO LOCATE BIN',
	top: 20,
	height:30,
	width:'auto'
});
self.add(label);


// Create a Button.
var aBSNAP_LOCATION = Ti.UI.createButton({
	title : 'aBSNAP_LOCATION',
	height : myHeight_aBSNAP_LOCATION,
	width : myWidth_aBSNAP_LOCATION,
	top : myTop_aBSNAP_LOCATION,
	left : myLeft_aBSNAP_LOCATION
});

// Listen for click events.
aBSNAP_LOCATION.addEventListener('click', function() {
	





});

// Add to the parent view.
self.add(aBSNAP_LOCATION);








//  =====================  BOTTEM SECTION
// Create a Button.
var aBCLOSE = Ti.UI.createButton({
	title : 'aBCLOSE',
	height : myHeight,
	width : myWidth,
	top : myTopaBCLOSE
	//left : myLeftaBCLOSE
});

// Listen for click events.
aBCLOSE.addEventListener('click', function() {
	//alert('\'aBCLOSE\' was clicked!');
	self.close();
});

// Add to the parent view.
self.add(aBCLOSE);

//=======================


return self;
	
}
module.exports = getGeo01;

