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
	var butGEO = Ti.UI.createButton({
		height:60,
		width:300,
		title:'GET GEO LOCATION',
		top:butGEO_top //20
	});
	self.add(butGEO);
	
	butGEO.addEventListener('click', function() {
		var nextWindow = require('shoes_location/geolocation01')
		var newWin = new nextWindow().open({fullscreen:true});
    	
    	
    	
	});	
	//=============================================
	
	//=============================================	
	var butGETBINNUMBER = Ti.UI.createButton({
		height:60,
		width:300,
		title:'GET BIN NUMBER',
		top:butGETBINNUMBER_top //90
	});
	self.add(butGETBINNUMBER);




	butGETBINNUMBER.addEventListener('click', function() {
		alert('==========  get bin number');
			if(osname == 'android'){
				var barcodeNextWin = 'shoes_BarCode/ANDROID_barCode01';
			}else{
				var barcodeNextWin = 'shoes_BarCode/iOS_barCode01';				
			}
	
			var nextWindow = require(barcodeNextWin); 
			var newWin = new nextWindow().open({fullscreen:true});
		});	
	//=============================================
		
		
	//=============================================
var Label = Titanium.UI.createLabel({
		text:'BIN STATUS - value = 0' ,
		color:'#999',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:15
		},
		textAlign:'center',
		top:250,
		width:300,
		height:'auto'
});
self.add(Label);
	//=============================================		
		
		
	//=============================================	
	var butGETBINSTATUS = Ti.UI.createButton({
		height:60,
		width:300,
		title:'GET BIN STATUS',
		top:butGETBINSTATUS_top //160
	});
	self.add(butGETBINSTATUS);

	butGETBINSTATUS.addEventListener('click', function() {


		var isAndroid = Ti.Platform.osname == 'android';

			if (isAndroid) {
				var showCancel = Ti.UI.createSwitch({
					style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
					title: 'Show Cancel Button',
					top : 290
			});

			var applyButtons = function()
			{
				if (showCancel.value) {
					dialog.buttonNames = [ 'Cancel'];
				} else {
					dialog.buttonNames = [];
				}
			};
		};


		var optionsDialogOpts = {
			options:['EMPTY 1', '25% FULL 2', '50% FULL 3', '75% FULL 4','100% FULL 5','120% FULL 6', 'DAMAGED 7', 'MISSING 8'],
			//destructive:1,
			//cancel:2,
			left:0,
			title:'CURRENT STATUS'
		};

		var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
	
		dialog.addEventListener('click',function(e)
		{
			label.text = 'STATUS OF BIN ' + e.index;
			if (isAndroid) {
				if (e.button) {
					label.text += ' button';
				} else {
					label.text += ' option';
				}
			}
		});





	
	});	
	//=============================================
			
	
		
	
	
	//=============================================
	
	var Closebutton = Ti.UI.createButton({
		height:60,
		width:300,
		title:'CLOSE',
		top:Closebutton_top   //340
	});
	self.add(Closebutton );
	
	Closebutton .addEventListener('click', function() {self.close({animated:true})});
	//=============================================			
return self;	
}
module.exports = setup01;
