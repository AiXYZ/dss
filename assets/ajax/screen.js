$(document).ready(function () {
	//Grid
	var gridster = null;
    gridster = $(".gridster ul").gridster({
        widget_base_dimensions: ['auto', 50],
        autogenerate_stylesheet: true,
        min_cols: 1,
        max_cols: 128,
        avoid_overlapped_widgets: false,
        widget_margins: [0, 0],  
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
	    $.each(screen, function () {
	    	if(this.type == 'text'){
	    		var htmlContent = '<li class="screenContent textContent">'+this.content+'</li>';
	    	}
	    	if(this.type == 'image'){
	    		var htmlContent = '<li class="screenContent"><img class="imageContent" src="assets/upload/image/'+this.content+'"></li>';
	    	}
	    	if(this.type == 'slider'){
	    		var sliderImage = this.content;
	    		var sliderImageArray = sliderImage.split(',');
	    		var sliderFristImage = sliderImageArray.shift();
	    		var htmlContent = '<li class="screenContent"><img class="sliderContent" data-slider="'+this.content+'" src="assets/upload/image/'+sliderFristImage+'"></li>';
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
	});    
    
    //Screen height
    var screenWidth = $(".gridster").width();
    screenWidth *= 1;
    var screenHeight = Math.round((screenWidth/16)*9);
    $('.gridster  ul').css({'padding': '0', 'height': screenHeight+'px', 'max-height': screenHeight+'px', 'min-height': screenHeight+'px'});
    $('.gridster').css({'padding': '0', 'height': screenHeight+'px', 'max-height': screenHeight+'px', 'min-height': screenHeight+'px'});
    
    //Slider
//    $(".sliderContent").ready(function() {
//    	var dataSlider = $('.sliderContent').attr('data-slider');
//    	console.log(dataSlider);
//	});    
  
    //$(this).data("id")
	//var dataSliderArray = dataSlider.split(',');
	
	
    /*
	var image = new Array(); 
    for(int i=0;i<20;i++){ 
    image[i] = new Image(); 
    image[i].src = "images/names" + i + ".jpg"; // file path 
    }
    */
});