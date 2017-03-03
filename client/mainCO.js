QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret); 
var sessionToken; //'7dda331c55fb52747a2794c4cd5f39d6de00cb1a';
var appId;

QB.createSession(function(err,result){
    console.log('Session create callback', err, result);
  });  // First of all create a session and obtain a session token
  // Then you will be able to run requests to User
sessionToken = '7dda331c55fb52747a2794c4cd5f39d6de00cb1a';
appId = appId;
  
   
QB.init(sessionToken, QBApp.appId);



var params = {login: 'rob@gmail.com', password: '12345678'};

QB.login(params, function(err, result) {
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







	var filter = {sort_asc: 'created_at'};

function getAllPosts() {
	QB.data.list("Application", filter, function(err, result){
		if (err) { 
			console.log(err);
		} else {
			console.log(result);

			for (var i=0; i < result.items.length; i++) {
				var item = result.items[result.items.length-i-1];
				showPost(item.FullName, item.email, false);
			}	
		}
	});
}

function addNewPost(textTitle, textBody) {
	QB.data.create("Application", {FullName: textTitle, email: textBody}, function(err, res){
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