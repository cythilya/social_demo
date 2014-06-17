var REDIRECT_URL = 'http://www.google.com/';
var CLIENT_ID = '';
var ACCESS_TOKEN = '';
var IS_LOGGIN = false;
var APIkey = 'AIzaSyA6xR1sP6ZOPogL1oBmOPLv0MPF2cniay0';
var SCOPES = 'https://www.googleapis.com/auth/plus.me';

(function() {
   var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
   po.src = 'https://apis.google.com/js/client:plusone.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();

var login = function(res){
	CLIENT_ID = res.client_id;
	ACCESS_TOKEN = res.access_token;
	IS_LOGGIN = res.status.google_logged_in; 
	//true: login, false: logout

	if(IS_LOGGIN) {
		$('#signinButton').hide();
		$('.dropdown-toggle.login').show();
	}
	else {
		$('#signinButton').show();
		$('.dropdown-toggle.login').hide();
	}

	//gapi.client.setApiKey(APIkey);
	//window.setTimeout(checkAuth,1);		
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
			// The response is always undefined.
		},
		error: function(e) {
			alert('Revoke permission error! Please try again later.');
			alert('Disconnect manually: https://plus.google.com/apps');
			console.log(e);
			// Handle the error console.log(e);
			// You could point users to manually disconnect if unsuccessful
			// https://plus.google.com/apps
		}
	});
};

/* var handleClientLoad = function() {
	gapi.client.setApiKey(APIkey);
	window.setTimeout(checkAuth,1);
}
	  
var checkAuth = function () {
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true}, handleAuthResult);
};

var handleAuthClick = function (event) {
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
	return false;
};

var handleAuthResult = function (authResult) {
	if (authResult && !authResult.error) {
		makeApiCall();
	} else {
		console.log(authResult);
	}
};

var makeApiCall = function() {
	gapi.client.load('plus', 'v1', function() {
		var request = gapi.client.plus.people.get({
			'userId': 'me'
		});
		request.execute(function(resp) {
			console.log(resp);
		});
	});
};  */

/* var getMe = function(){
	gapi.client.load('plus', 'v1', function() {
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
	});
}; */

//getMe();

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