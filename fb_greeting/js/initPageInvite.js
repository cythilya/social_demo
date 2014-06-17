(function($) {
	$.fn.initPageInvite = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
			var dPage = $(obj);
			var dNav = dPage.find('.nav');
			var dBtnInviteFriends = dPage.find('.inviteFriends');
			var dCheckLikeFanGroupId = dPage.find('.form-check-like-fan-group #fanGroupId');
			var dCheckLikeFanGroupUrl = dPage.find('.form-check-like-fan-group #fanGroupUrl');
			var dCheckLikeFanBox = dPage.find('.form-check-like-fan-group #fanLikeBox');
			var dBtnCheckLikeFanGroup = dPage.find('.checkLikeFanGroup');
			var dCheckLikeFanGroupMessage = dPage.find('.form-check-like-fan-group .message');
			var myID;
			var dAppFriendsList = dPage.find('.appFriendsList');
			
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
			
			var getAppFriends = function () {
				var fql = 'SELECT uid, name, pic_square, is_app_user FROM user ' + 
				          'WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) ' + 
						  'OR uid IN(SELECT uid1 FROM friend WHERE uid2=me()) ORDER BY name';

				/*
					(psuedocode)
					SELECT
					FROM my_friends
					WHERE uid IN (
						SELECT uid
						FROM app_users
						WHERE appid = myappid
					)
				*/
						  
				FB.api('/fql', 'get',{ q: fql}, function(response) {
					if(response.data) {
						console.log(response.data);
						var friendsData = response.data;
						$.each(friendsData, function(index, value){
							var picture = friendsData[index].pic_square;

							HTML = "";
							HTML += [
								'<div class="item">',
								'	<a target="_blank">',
								'		<img src="' + picture + '">',
								'	</a>',
								'	<div class="name">' + friendsData[index].name + '</div>',
								'	<div class="uid">' + friendsData[index].uid + '</div>',
								'</div>'
							].join('');

							dAppFriendsList.append(HTML);
						});	
					} 
					else {
						alert('Try again later.')
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
						getAppFriends();
			
						dBtnInviteFriends.click(function(){
							FB.ui({
								method: 'apprequests',
								message: 'Greeting'
							}, function(res){
								console.log(res);
							});
						});
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
		$('.pageInvite').initPageInvite();
	});
})(jQuery);
