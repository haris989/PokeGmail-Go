var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
stepIndex = 0;
mailer=0;
var loadInProgress = false;
//page.settings.loadImages = false;


page.onLoadStarted = function() {
    loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
    loadInProgress = false;
  console.log("load finished");
};
	
var steps = [
		function() {
					page.open("https://accounts.google.com/ServiceLogin?sacu=1&scc=1&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&osid=1&service=mail&ss=1&ltmpl=default&rm=false#identifier",function(status) {
	
					});		
				},
				
				 function() {
					 
					 var emaill=fs.read('email.txt');
					 
					 
					 
					  evaluate(page, function(emaill) {
			document.querySelectorAll("input[id='Email']")[0].value=emaill;
			document.querySelectorAll("input[id='next']")[0].click();
					 }, emaill);
				},

				
				function() {
						var passwordd=fs.read('password.txt');
											
			 evaluate(page, function(passwordd) {
			document.querySelectorAll("input[id='Passwd']")[0].value=passwordd;
			document.querySelectorAll("input[id='next']")[0].click();	
					}, passwordd);
				},
				  function() {
		page.open("https://mail.google.com/mail/u/0/h/27krocm9r3ez/?&cs=b&pv=tl&v=b",function(status) {

		});		
			 page.evaluate(function() {
	if(document.querySelectorAll("input[type='submit']")[0].value=="I'd like to use HTML Gmail"){
		document.querySelectorAll("input[type='submit']")[0].click();
		}		
					 });
		
		
							
},


				  function() {
		page.open("https://mail.google.com/mail/u/0/h/27krocm9r3ez/?&cs=b&pv=tl&v=b",function(status) {

		
				});	
				  },
				
			  function() {
				  
					 var too = fs.read('recipients.txt').split("\n");
					 var too2=fs.read('message.txt');
					
					console.log("We are sending email number",mailer);
					if(mailer>=too.length){
						phantom.exit();
						
					}
					
					var passs=[too,mailer,too2]

											  evaluate(page, function(passs) {
					
					document.querySelectorAll("textarea[name='to']")[0].value=passs[0][passs[1]];
					document.querySelectorAll("input[name='subject']")[0].value="--Your subject here--";
					document.querySelectorAll("textarea[name='body']")[0].value=passs[2];
					document.querySelectorAll("input[value='Send']")[0].click();
											  }, passs);								
										page.render(mailer+".png");
										mailer++;
							}
				
]




function evaluate(page, func) {
    var args = [].slice.call(arguments, 2);
    var fn = "function() { return (" + func.toString() + ").apply(this, " + JSON.stringify(args) + ");}";
    return page.evaluate(fn);
}

	
setInterval(function() {
	
	
	if (!loadInProgress && typeof steps[stepIndex] == "function") {
       console.log("step " + (stepIndex + 1));
        steps[stepIndex]();
        stepIndex++;
		
    }
    if (typeof steps[stepIndex] != "function") {
		stepIndex=3;		
       console.log("Running...");
        //phantom.exit();
    }
}, 6802);

