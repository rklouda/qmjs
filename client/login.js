var QBApp = {
  appId: 51994,
  authKey: 'WnF8-gpP7CHRy94',
  authSecret: 'BcPszAStfMYqCdV'
};
// Init QuickBlox application here
//
QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret);

$(document).ready(function() {

  // First of all create a session and obtain a session token
  // Then you will be able to run requests to Users
  //
  QB.createSession(function(err,result){
    console.log('Session created', err, result);
  });
sessionToken = '7dda331c55fb52747a2794c4cd5f39d6de00cb1a';
QB.init(sessionToken, QBApp.appId);

  $('#login').on('click', function() {
    var login = $('#usr_sgn_p_lgn').val();
    var password = $('#usr_sgn_p_pwd').val();
 console.log('Name/Pwd ' + login);
 
    var params = { 'login': login, 'password': password};

   QB.login(params, function(err, result) {
	if (err) {
		console.log('Something went wrong: ' + err);
	} else {
		console.log('Session created with id ' + result.id);
		// Get all posts
		getAllPosts();
	  window.location = 'start.html';
	}
    });
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
				console.log("Items" + item.FullName);
				  
				}
			}	
	});
}
  
  
  
});