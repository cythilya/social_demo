var REDIRECT_URL = 'http://www.google.com/';
var CLIENT_ID = '';
var ACCESS_TOKEN = '';
var IS_LOGGIN = false;
var APIkey = 'AIzaSyBa9IEce8dY1TqAAaiAAVOHJTWz7VdA8EY';

(function() {
   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
   po.src = 'https://apis.google.com/js/client:plusone.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

var login = function(res){
	//console.log('Login info.');
	//console.log(res);
	CLIENT_ID = res.client_id;
	ACCESS_TOKEN = res.access_token;
	IS_LOGGIN = res.status.google_logged_in; //true: µn¤JGoogle, false: ¥¼µn¤JGoogle
	//google_logged_in: 
	//google_logged_in: 

	if(IS_LOGGIN) {
		$('#signinButton').hide();
		$('.dropdown-toggle.login').show();
	}
	else {
		$('#signinButton').show();
		$('.dropdown-toggle.login').hide();
	}
};

var logout = function(){
	document.location.href = 'https://www.google.com/accounts/Logout?continue=' +  REDIRECT_URL ;
};

var revoke = function(){
	var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + ACCESS_TOKEN;
	// Perform an asynchronous GET request.
	$.ajax({
		type: 'GET',
		url: revokeUrl,
		async: false,
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(nullResponse) {
			// Do something now that user is disconnected
			// The response is always undefined.
		},
		error: function(e) {
			// Handle the error console.log(e);
			// You could point users to manually disconnect if unsuccessful
			// https://plus.google.com/apps
		}
	});
};

var getMe = function(){
	// This sample assumes a client object has been created.
	// To learn more about creating a client, check out the starter:
	//  https://developers.google.com/+/quickstart/javascript
	var request = gapi.client.plus.people.get({
	  'userId' : 'me'
	});

	request.execute(function(resp) {
	  console.log('ID: ' + resp.id);
	  console.log('Display Name: ' + resp.displayName);
	  console.log('Image URL: ' + resp.image.url);
	  console.log('Profile URL: ' + resp.url);
	});
};

getMe();

//----------------------------------------------
$('.logout').click(function(e){
	e.preventDefault();
	logout();
});





//----------------------------------------------	 
var getFriends = function(){};
var getActivities = function(){};
var addActivity = function(){};
var getShareCount = function(){};
var getPlusOneCount = function(){};
var checkPlusOneUrl = function(){};