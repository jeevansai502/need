$("#about").click(function(e) {
    e.preventDefault();	
    $('html,body').animate({
        scrollTop: $("#aboutPosition").offset().top},
	                                  'slow');
});

$(document).on('scroll', function() {

    if($('#aboutPosition').offset().top - $(this).scrollTop() <= 40){
         $("#about").addClass("active");    
    }else{
    	 $("#about").removeClass("active");
    }
})
