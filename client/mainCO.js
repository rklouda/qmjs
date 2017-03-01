QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret);

$(document).ready(function() {

  // First of all create a session and obtain a session token
  // Then you will be able to run requests to Users
  //
  QB.createSession(function(err,result){
    console.log('Session create callback', err, result);
  });
	getAllPosts();
  // Init Twitter Digits
  //

  var digitsKey = 'uH2aUsd3BP0qLpTezVnqXyZAk';

  $('#digits-sdk').load(function () {
    Digits.init({ consumerKey: digitsKey })
      .done(function() {
        console.log('Digits initialized.');
      })
      .fail(function(error) {
        console.log('Digits failed to initialize: ' + JSON.stringify(error));
      });

    // Login user twitter digits
    $('#sign_in_twitter_digits').on('click', function() {
      Digits.logIn()
        .done(function(loginResponse) {

          var params = {
            provider: 'twitter_digits',
            twitter_digits: loginResponse.oauth_echo_headers
          };

          // login with twitter_digits params
          QB.login(params, function(err, user){
            if (user) {
              $('#output_place').val(JSON.stringify(user));
            }else{
              $('#output_place').val(JSON.stringify(err));
            }
          });

        })
        .fail(function(error) {
          console.log('Digits failed to login: ' + JSON.stringify(error));
        });
    });
  });


	
	
QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret);
console.log('Session opening ');
// Create session
	var filter = {sort_asc: 'created_at'};
QB.createSession(QBUser, function(err, result){
	if (err) {
		console.log('Something went wrong: ' + err);
	} else {
		console.log('Session created with id ' + result.id);
		// Get all posts
		getAllPosts();
		
		$('#send_post').click(function(e) {
			e.preventDefault();

			var textTitle = $('#title_post')[0].value;
				textBody = $('#body_post').val();
			// Adds a new post
			if (textTitle && textBody) {
				$("#load-img").show(0);
				addNewPost(textTitle, textBody);
			} else {
				alert('Please complete all required fields')
			}
		});
	}
});

function getAllPosts() {
	QB.data.list("Application", filter, function(err, result){
		if (err) { 
			console.log(err);
		} else {
			console.log(result);

			for (var i=0; i < result.items.length; i++) {
				var item = result.items[result.items.length-i-1];
				showPost(item.name, item.description, false);
			}	
		}
	});
}

function addNewPost(textTitle, textBody) {
	QB.data.create("Application", {name: textTitle, description: textBody}, function(err, res){
		if (err) {
			console.log(err);
		} else {
			console.log(res);

			$("#load-img").delay(1000).fadeOut(1000);
			$('#myModal').modal('hide');
			$('#title_post').val('');
			$('#body_post').val('');

			QB.data.list("Application", filter, function(err, result){
				if (err) { 
					console.log(err);
				} else {
					console.log(result);

					showPost(textTitle, textBody, true);
				}
			});
		}
	});
}

function showPost(textTitle, textBody, lastPost) {
	var containerElement = $('#posts-container');
	var postElement = $('<div></div>').addClass('starter-template');
	var postTitle = $('<h2></h2>').html(textTitle);
			postElement.append(postTitle);
	var postBody = $('<p></p>').addClass('lead').html(textBody);
			postElement.append(postBody);

	if (lastPost) {
		containerElement.prepend(postElement);
	} else {
		containerElement.append(postElement);
	}		
}