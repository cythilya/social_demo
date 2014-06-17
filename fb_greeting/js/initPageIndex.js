(function($) {
	$.fn.initHeader = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
			var dNav = $(obj);
			var dLogin = dNav.find('.login');
			
			var initiateHeader = function(){
				console.log('Check User Done.');
				
				var name = localStorage.getItem('name');
				var picUrl = localStorage.getItem('picUrl');
				
				if(!name || !picUrl) {
					login('Welcome!');
				}
				
				dNav.find('.login').remove();
				dNav.find('.dropdown').append('<img class="user-thumbnail" src="'+ picUrl +'" width="30" height="30"><span>' + name + '</span>');
			};	

			var login = function(msg){
				alert(msg + ' Please login.');

				//var redirect = 'https://www.facebook.com/dialog/oauth?client_id=132069051838&redirect_uri=http://cythilya.ihost.tw/social_demo/fb_greeting&scope=publish_stream';
				var redirect = 'https://www.facebook.com/dialog/oauth?client_id=132069051838&redirect_uri=http://cythilya.ihost.tw/social_demo/fb_greeting';
				location.href = redirect;
			};
			
			dLogin.click(function(e){
				e.preventDefault();
				
				login('Welcome. ');
			});
			
			var checkUser = function(callback){
				var accessToken = localStorage.getItem('accessToken');
				if(!accessToken) {
					login('Can not get access token.');
				}
				else {
					$.get('https://graph.facebook.com/me?access_token=' + accessToken)
					.done(function(profile){
						var picUrl = 'http://graph.facebook.com/'+ profile.id +'/picture?width=30&height=30';
					
						localStorage.setItem('id', profile.id);	
						localStorage.setItem('name', profile.name);
						localStorage.setItem('picUrl', picUrl);

						initiateHeader();
					})
					.fail(function(error){
						login('Get profile error.');
					});
				}
			};
			
			window.fbAsyncInit = function() {
				FB.init({
    		        appId      : '132069051838',
	    			xfbml      : true,
		    		version    : 'v2.0',
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					oauth      : true, // enable OAuth 2.0
					frictionlessRequests: true
				});

			    FB.getLoginStatus(function(response) {
					console.log(response);
					if (response.status === 'connected') {
						// the user is logged in and has authenticated your app,
						// and response.authResponse supplies
						// the user's ID, a valid access token, a signed request, 
						// and the time the access token and signed request each expire					
								
					    console.log('Logged in Greeting.');

						//get access token, and save it in local storage
						localStorage.setItem('accessToken', response.authResponse.accessToken);
						
						//check user, in order to get user info
						checkUser();
					}
					else if (response.status === 'not_authorized') {
						// the user is logged in to Facebook, but has not authenticated the app
					}					
					else {
						//response.status === 'unknown'
						// the user isn't logged in to Facebook.
					    //FB.login();
					    //login('Welcome!');
					}
			    });
			};

			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "http://connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
        }
		// initialize every element
		this.each(function() {
			init($(this));
		});
		return this;
	};
	// start
	$(function() {
		$('.nav').initHeader();
	});
})(jQuery);
