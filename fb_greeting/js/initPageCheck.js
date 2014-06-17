(function($) {
	$.fn.initPageChecks = function(opts) {
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
						initiateHeader();
						console.log('Init Checks.');
						
						FB.api('/me', function(response) {
							myID = response.id;
						});
					
						//get parameter
						var getParameterByName = function(name, href) {
							name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
							var regexS = "[\\?&]"+name+"=([^&#]*)";
							var regex = new RegExp( regexS );
							var results = regex.exec( href );
						
							if( results == null ){
								return "";
							}
							else{
								return decodeURIComponent(results[1].replace(/\+/g, " "));
							}
						}

						var checkID = function(id, nextUrl){
							var targetId = id;
							var nextPageUrl = nextUrl;
							
							FB.api(myID + '/likes?limit=25&after=' + nextUrl, function(response) {
								var nextData = response.data;
								var nextUrl = getParameterByName('after', response.paging.next);
								var stop = false;
								
								$.each(nextData, function(index, value){
									if(targetId == value.id) {
										stop = true;
										dCheckLikeFanGroupMessage.html('Match');
									}
								});

								if(!stop && nextUrl != "") {
									checkID(targetId, nextUrl);
								}	
								
								if(stop == false && nextUrl == ""){
									dCheckLikeFanGroupMessage.html('None Match');
								}
							});	
						};						
						
						//click check fan group button
						dBtnCheckLikeFanGroup.click(function(e){
							e.preventDefault();
							
							var targetUrl = $.trim(dCheckLikeFanGroupUrl.val()); //target url
							var id = ''; //target id
							
							//get fan group id
							FB.api('/?id=' + targetUrl, function(response) {
								if (response && !response.error) {
									id = response.id;
									dCheckLikeFanGroupId.val(id);//display id
									dCheckLikeFanGroupMessage.html('Calculating...');
								}
								else {
									dCheckLikeFanGroupMessage.html('Try again later.');
								}
							});	

							//get my like list
							FB.api('me?fields=likes', function(response) {
								console.log(response);
								
								if (response && !response.error && response.likes != null ) {
									var likeData = response.likes.data;
									var nextUrl = getParameterByName('after', response.likes.paging.next);
									var stop = false;								
								
									$.each(likeData, function(index, value){
										if(id == value.id){
											dCheckLikeFanGroupMessage.html('Match');
											stop = true;
										}
									});

									if(!stop && nextUrl != null) {
										checkID(id, nextUrl);
									}								
								}
								else {
									dCheckLikeFanGroupMessage.html('Try again later.');
								}
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
		$('.pageChecks').initPageChecks();
	});
})(jQuery);
