/**
 * @author vincent youmans
 */
function getGeo01(){

		Ti.include(Titanium.Filesystem.resourcesDirectory+"/etc/version.js");
		Ti.include(Titanium.Filesystem.resourcesDirectory+'topLocations.js');
		//Ti.Geolocation.preferredProvider = "gps";
	
	var title = 'Geo Locate BIN';
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});
		
		var winbackgroundColor = 'red';
		//var winbackgroundColor = 'green';
		//var winbackgroundColor = 'blue';
		//var winbackgroundColor = 'black';



	//Ti.Geolocation.preferredProvider = "gps";

	Ti.Geolocation.preferredProvider = 'gps';
	


	if (isIPhone3_2_Plus())
	{
		//NOTE: starting in 3.2+, you'll need to set the applications
		//purpose property for using Location services on iPhone
		Ti.Geolocation.purpose = "GPS demo";
	}







//  =====================  BOTTEM SECTION
// Create a Button.
var aBCLOSE = Ti.UI.createButton({
	title : 'CLOSE',
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

