(function($) {
	$.fn.initPageFeed = function(opts) {
		// default configuration
		var config = $.extend({}, {
			opt1: null
		}, opts);
		// main function
		function init(obj) {
			var dPage = $(obj);
			var dNav = dPage.find('.nav');
			var dMessgae = dPage.find('.message');
			var dFeedList = dPage.find('.feedList');
			
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

			var GetFeedList = function(){
				console.log('Get Feed List.');
				
				dMessgae.html('loading...');
				
				FB.api('/me/feed', function(response) {
					console.log(response);
					
					if (response && !response.error) {
						var feedData = response.data;
						console.log(feedData);
						
						dMessgae.html('');

						$.each(feedData, function(index, value){
							var name = feedData[index].name == null ? 'default' : feedData[index].name;
							var link = feedData[index].link == null ? 'default' : feedData[index].link;
							var pic = feedData[index].picture == null ? 'http://dummyimage.com/154x110/f000f0/fff&text=default' : feedData[index].picture;
							var description = feedData[index].description == null ? '' : feedData[index].description;
							var message = feedData[index].message == null ? 'None.' : feedData[index].message;
							//var likes = feedData[index].likes; //get people who like it
							
							//console.log(feedData[index]);

							HTML = "";
							HTML += [
								'<li class="feedItem">',
								'	<div class="cover"><a href="'+ link +'" target="_blank"><img src="' + pic + '"></a></div>',
								'	<div class="info">',
								'	 	<a href="'+ link +'" target="_blank"><div class="name">' + name + '</div></a>',
								'		<div class="description"><span class="label label-info">Description</span> ' + description + '</div>',
								'		<div class="message"><span class="label label-success">Comment</span> ' + message + '</div>',
								'	</div>',								
								'</li>',
								'<hr>'
							].join('');

							dFeedList.append(HTML);
						});	
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
						GetFeedList();
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
		$('.pageFeed').initPageFeed();
	});
})(jQuery);
