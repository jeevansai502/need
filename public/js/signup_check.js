
function check(){

	var focusSet=false;

	var p1 = $('#password').val();	
	var p2 = $('#confirm_password').val();	
	if(p1 != p2){
		$('#confirm_password')[0].setCustomValidity("Passwords Don't Match");
	}else{
		$('#confirm_password').get(0).setCustomValidity("");
	}
}


$(function() {
  $('[data-toggle="popover"]').popover();
});



$('#button_submit').click(function(event){

	var p1 = $('#password').val();	
	var p2 = $('#confirm_password').val();	
	if(p1 != p2){
		$('#confirm_password')[0].setCustomValidity("Passwords Don't Match");
			return;
	}else{
		$('#confirm_password').get(0).setCustomValidity("");
	}
		
	event.preventDefault();	
	
	$.ajax({
		type: 'POST',	
		url: "signup",
		data: $("#signup_form").serialize(),
		success: function(result){
			
			if(result.validation == "false"){
		
				$('#alert_div').text(result.message);
				$('#alert_div').addClass("align-error");
			
			}else if(result.validation == "true"){
				
				$('#alert_div').text(result.message);
				$('#alert_div').addClass("align-success");
		
			}	
			
		}
		
		});
	
});

