(function($) {
	$.fn.initPagePost = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
			var dPage = $(obj);
			var dName = dPage.find('#name');
			var dCaption = dPage.find('#caption');
			var dLink = dPage.find('#link');
			var dPicture = dPage.find('#picture');
			var dDescription = dPage.find('#description');
			var dPost = dPage.find('.post');
			var dPostUI = dPage.find('.postui');
			var dNav = dPage.find('.nav');
			
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
						console.log('Post.');
						initiateHeader();

						//Post
						dPost.click(function(){
							FB.login(function(){
								var params = {};
								params['name'] = dName.val();
								params['caption'] = dCaption.val();	
								params['description'] = dDescription.val();
								params['message'] = 'Worth a share.';
								params['link'] = dLink.val();
								params['picture'] = dPicture.val();
							
								FB.api('/me/feed', 'post', params, function(response) {
								  if (!response || response.error) {
									alert('Error occured');
								  } else {
									alert('Post ID: ' + response.id);
								  }
								});
							}, {scope: 'publish_actions'});		
						});

						//Post UI
						dPostUI.click(function(e){
							e.preventDefault();
							FB.ui({
								method: 'feed',
								name: 'Social Demo',
								caption: 'BBC One - Sherlock, Series 1',
								description: 'Sherlock Holmes and Dr John Watson\'s adventures in 21st Century London. A thrilling, funny, fast-paced contemporary reimagining of the Arthur Conan Doyle classic. Made by Hartswood Films.',
								link: 'http://www.bbc.co.uk/programmes/b00t4pgh',
								picture: 'http://goo.gl/9ngEIK'
							}, 
							function(response) {
								console.log('publishStory response: ', response);
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
		$('.pagePost').initPagePost();
	});
})(jQuery);
