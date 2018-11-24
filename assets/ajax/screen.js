$(document).ready(function () {
	//Grid
	var gridster = null;
    gridster = $(".gridster ul").gridster({
        widget_base_dimensions: ['auto', 72],
        autogenerate_stylesheet: true,
        min_cols: 1,
        max_cols: 128,
        avoid_overlapped_widgets: false,
        widget_margins: [0, 0]
    }).data('gridster');
    
	$.ajax({
		url: "assets/ajax/controller/fetch_screen.php",
		type: "POST",
		dataType:'json',
		data:{
			image: 'test',
		}
	}).done(function(data){
		var screen = JSON.parse(data.content);
		
	    gridster.remove_all_widgets();
	    $.each(screen, function (){
	    	if(this.type == 'text'){
	    		var htmlContent = '<li class="screenContent textContent">'+this.content+'</li>';
	    	}
	    	if(this.type == 'image'){
	    		var htmlContent = '<li class="screenContent"><img class="imageContent" src="assets/upload/image/'+this.content+'"></li>';
	    	}
	    	if(this.type == 'slider'){
	    		var sliderImage = this.content;
	    		var sliderImageArray = sliderImage.split(',');
	    		
	    		var imageTag = '';
	    	    $.each(sliderImageArray, function (sliderI, sliderC){
	    	    	imageTag += '<img class="sliderContent" src="assets/upload/image/'+sliderC+'">';
	    	    });
	    	    
	    		var htmlContent = '<li class="screenContent sliderContentLi">'+imageTag+'</li>';
	    	}	    	
	    	if(this.type == 'video'){
	    		var htmlContent = '<li class="screenContent">'+
	    				'<video width="100%" height="100%" class="videoContent" autoplay loop muted poster="assets/upload/video/2018112113350060569245_Y29mZmVlMg==.png">'+
	    					'<source src="assets/upload/video/'+this.content+'" type="video/mp4">'+
	    				'</video>'+
	    			'</li>';
	    	}	    	
	    	
	    	gridster.add_widget(htmlContent, this.size_x, this.size_y, this.col, this.row);
	    });
	    
	    //Screen height
	    var screenWidth = $(".gridster").width();
	    screenWidth *= 1;
	    var screenHeight = Math.round((screenWidth/16)*9);
	    $('.gridster  ul').css({'padding': '0', 'height': screenHeight+'px', 'max-height': screenHeight+'px', 'min-height': screenHeight+'px'});
	    $('.gridster').css({'padding': '0', 'height': screenHeight+'px', 'max-height': screenHeight+'px', 'min-height': screenHeight+'px'});	    
	    
	    //Slider
	    var sliderIndex = 0;
	    sliderCarousel();

	    function sliderCarousel() {
	        var sliderCountI;
	        var sliderContentX = document.getElementsByClassName("sliderContent");
	        for (sliderCountI = 0; sliderCountI < sliderContentX.length; sliderCountI++) {
	           sliderContentX[sliderCountI].style.display = "none";  
	        }
	        sliderIndex++;
	        if(sliderIndex > sliderContentX.length){
	        	sliderIndex = 1
	        }    
	        sliderContentX[sliderIndex-1].style.display = "block";  
	        setTimeout(sliderCarousel, 2000);
	    }
	    
	});
	
});