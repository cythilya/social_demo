(function($) {
	$.fn.initPageFriends = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
			var dPage = $(obj);
			var dNav = dPage.find('.nav');
			var dFriendList = dPage.find('.friendList');
			var dMessgae = dPage.find('.message');
			var HTML = "";
			
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
			
			var GetFriends = function(){
				console.log('Get Friends.');
				
				dMessgae.html('Loading...');
				FB.api('/me/taggable_friends', function(response) {
					//taggable_friends: A list of friends that can be tagged or mentioned in stories published to Facebook.
				
					console.log(response);
					
					if (response && !response.error) {
						var friendsData = response.data;
						
						dMessgae.html('');

						$.each(friendsData, function(index, value){
							var picture = friendsData[index].picture.data.url;

							HTML = "";
							HTML += [
								'<div class="friend">',
								'	<a target="_blank">',
								'		<img src="' + picture + '">',
								'	</a>',
								'	<div class="name">' + friendsData[index].name + '</div>',
								'</div>'
							].join('');

							dFriendList.append(HTML);
						});	
					}
				});	
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
					if (response.status === 'connected') {
					    console.log('Logged in Greeting.');
						initiateHeader();
						GetFriends();
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
		$('.pageFriends').initPageFriends();
	});
})(jQuery);
