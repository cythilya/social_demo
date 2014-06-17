(function($) {
	$.fn.initPageMe = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
			var dPage = $(obj);
			var dNav = dPage.find('.nav');
			var dUserProfileBlock = dPage.find('.userProfileBlock');
			
			var initiateHeader = function(){
				console.log('Check User Done.');
				
				var name = localStorage.getItem('name');
				var picUrl = localStorage.getItem('picUrl');
				
				if(!name || !picUrl) {
					login('Welcome!');
				}
				
				dNav.find('.login').remove();
				dNav.find('.dropdown').append('<img class="user-thumbnail" src="'+ picUrl +'"><span>' + name + '</span>');
			};		

			var login = function(msg){
				alert(msg + ' Please login.');

				var redirect = 'https://www.facebook.com/dialog/oauth?client_id=132069051838&redirect_uri=http://cythilya.ihost.tw/social_demo/fb_greeting&scope=publish_stream';
				location.href = redirect;
			};
			
			var GetMyProfile = function(){
				console.log('Get My Profile.');
				
				FB.api('/me', function(response) {
					console.log(response);
					
					var name = response.name;
					var firstName = response.first_name;
					var lastName = response.last_name;
					var gender = response.gender;
					var id = response.id;
					var link = response.link;	 
					var birthday = response.birthday;	
					var email = response.email;
					var website	= response.website;
					var location = response.location;
					var picture = "";
					
					//name
					if(name != undefined) {
						dUserProfileBlock.find('.name').html(name);
					}
					else {
						dUserProfileBlock.find('.name').html('none');
					}
					
					//firstName 
					if(firstName != undefined) {
						dUserProfileBlock.find('.firstName').html(firstName);
					}
					else {
						dUserProfileBlock.find('.firstName').html('none');
					}						
					
					//lastName
					if(lastName != undefined) {
						dUserProfileBlock.find('.lastName').html(lastName);
					}
					else {
						dUserProfileBlock.find('.lastName').html('none');
					}

					//gender
					if(gender != undefined) {
						dUserProfileBlock.find('.gender').html(gender);
					}
					else {
						dUserProfileBlock.find('.gender').html('none');
					}						
					
					//id
					if(id != undefined) {
						picture = 'http://graph.facebook.com/'+ id +'/picture?width=140&height=140';
						dUserProfileBlock.find('.id').html(id);
						dUserProfileBlock.find('.img-thumbnail').attr('src', picture);
						console.log(picture);
					}
					else {
						dUserProfileBlock.find('.id').html('none');
					}

					//link
					if(name != undefined) {
						dUserProfileBlock.find('.link').html(link);
					}
					else {
						dUserProfileBlock.find('.link').html('none');
					}
					
					//birthday
					if(birthday != undefined) {
						dUserProfileBlock.find('.birthday').html(birthday);
					}
					else {
						dUserProfileBlock.find('.birthday').html('none');
					}

					//email
					if(email != undefined) {
						dUserProfileBlock.find('.email').html(email);
					}
					else {
						dUserProfileBlock.find('.email').html('none');
					}

					//website
					if(website != undefined) {
						dUserProfileBlock.find('.website').html(website);
					}
					else {
						dUserProfileBlock.find('.website').html('none');
					}

					//location
					if(location != undefined) {
						dUserProfileBlock.find('.location').html(location);
					}
					else {
						dUserProfileBlock.find('.location').html('none');
					}
				});
			};			

			window.fbAsyncInit = function() {
				FB.init({
    		        appId      : '132069051838',
	    			xfbml      : true,
		    		version    : 'v1.0',
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					oauth      : true, // enable OAuth 2.0
					frictionlessRequests: true
				});

			    FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
					    console.log('Logged in Greeting.');
						initiateHeader();
						GetMyProfile();
					}
					else {
					  //FB.login();
					  login('Welcome!');
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
		$('.pageMe').initPageMe();
	});
})(jQuery);
