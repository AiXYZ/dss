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
        resize: {
            enabled: true,
            start: function (e, ui, $widget) {
                console.log('START position: ' + ui.position.top + ' ' + ui.position.left);
            },
            resize: function (e, ui, $widget) {
                if($.inArray('upText', $widget[0]['classList']) !== -1){
                	$($widget).css('font-size', this.resize_coords.data.height*0.70);
                }
            },            
            stop: function (e, ui, $widget) {
                console.log('STOP position: ' + ui.position.top + ' ' + ui.position.left);
            }
        },
		draggable: {
	        start: function (e, ui, $widget) {
	            console.log('START position: ' + ui.position.top + ' ' + ui.position.left);
	        },
	        stop: function (e, ui, $widget) {
	            console.log('STOP position: ' + ui.position.top + ' ' + ui.position.left);
	        }
	    }    
    }).data('gridster');
    
    //Screen height
    var screenWidth = $(".gridster").width();
    screenWidth *= 1;
    var screenHeight = Math.round((screenWidth/16)*9);
    $('.gridster  ul').css({'padding': '0', 'height': screenHeight+'px', 'max-height': screenHeight+'px', 'min-height': screenHeight+'px'});
    $('.gridster').css({'padding': '0', 'height': screenHeight+'px', 'max-height': screenHeight+'px', 'min-height': screenHeight+'px'});
    
    //Coordinates
	$('#getCoordinates').on('click', function(){
		$('.gridster  ul li').each(function(i) {
	    	  var dataSizey = $(this).attr('data-sizey');
	    	  var dataSizex = $(this).attr('data-sizex');
	    	  var dataCol = $(this).attr('data-col');
	    	  var dataRow = $(this).attr('data-row');
	    	  
	    	  console.log(i+': '+dataSizey+'_'+dataSizex+'_'+dataCol+'_'+dataRow);
		});
	}); 
	
    //Text
	$('#widgetText').on('click', function(){
		$('#widgetTextModal').modal('show');
	});	
	
    $('#widgetTextBg').colorpicker({
        colorSelectors: {
        	"slategray": "#708090",
        	"blueviolet": "#8a2be2",
        	"chocolate": "#d2691e",
        	"cornflowerblue": "#6495ed",
        	"darkgoldenrod": "#b8860b",
        	"green": "#008000",
        	"maroon": "#800000",
        	"steelblue": "#4682b4",
        	"purple": "#800080",
        	"darkred": "#8b0000",
        	"sienna": "#a0522d",
           
        }
    }).on('changeColor', function(e) {
    	$('#widgetTextInput').css({'background-color': e.color.toString('rgba'), 'color': '#FFFFFF'});
    });
    
	$('#widgetTextSubmit').on('click', function(){
		var widgetTextValue = $('#widgetTextInput').val();
		var widgetTextBg = $('#widgetTextInput').attr('style');
		gridster.add_widget('<li class="upText" style="'+widgetTextBg+' font-size: 35px;">'+widgetTextValue+'</li>', 30 , 1, 1, 100);
		$('#widgetTextModal').modal('hide');
	});	    
	
	//Image
	$('#widgetImage').on('click', function(){
		$('#widgetImageModal').modal('show');
		imageUploadedList('widgetImageUploadedList');
        //gridster.remove_widget('#rmoveId')
	});
	
	function imageUploadedList(id){
		$.ajax({
			url: "assets/ajax/controller/image_list.php",
			type: "POST",
			dataType:'json',
			data:{
				image: 'test',
			}
		}).done(function(data){
			$('#'+id).empty();
			$.each(data, function(i, item){
				$('#'+id).append(
					'<div class="card cardContainerHover">'+
						'<img class="img-fluid imageHover" src="assets/upload/image/'+item.file_name+'">'+
						'<div class="card-img-overlay cardCaption">'+
							'<span class="oi oi-circle-check card-title"></span>'+
							'<p class="card-text">'+item.actual_file_name+'</p>'+
						'</div>'+							
					'</div>'			
				);				
			});
		});		
	}
	
	var selectedImage = '';
	$('#widgetImageUploadedList').on('click', '.card', function(){
		$(this).removeClass('cardContainerHover');
	    $(this).addClass('cardContainerSelected');
	    selectedImage = $(this).find('img').attr('src');
	});	
	
	//Image upload
    $('#widgetImageUploadInput').on('change', function(){
    	imageUpload('widgetImageUploadInput', 'widgetImageUploadResult');
    });
    
    function imageUpload(inputId, resultId){
        var form_data = new FormData();
        var fileCount = document.getElementById(inputId).files.length;
        for(var i = 0; i < fileCount; i++){
            form_data.append('uploadFile[]', document.getElementById(inputId).files[i]);
        }
        $.ajax({
            url: 'assets/ajax/controller/image_upload.php',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'POST',
            beforeSend: function(data){
            	$('#'+resultId).text('uploading');
            },
	        success: function(data){
				$('#'+resultId).empty();
				$.each(data, function(i, item){
					selectedImage = 'assets/upload/image/'+item.file;
					$('#'+resultId).append(
						'<div class="card cardContainerSelected">'+
							'<img class="img-fluid imageHover" src="assets/upload/image/'+item.file+'">'+
							'<div class="card-img-overlay cardCaption">'+
								'<span class="oi oi-circle-check card-title"></span>'+
							'</div>'+							
						'</div>'							
					);
				});        	
	        }        
        });    	
    }
	
	//Image search
	$('#widgetImageSearchButton').on('click', function(){
		var queryValue = $('#widgetImageSearchInput').val();
		if(queryValue){
			unsplash(queryValue, 'widgetImageSearchResult');
		}
	});
	
	function unsplash(queryValue, resultId){
		$.ajax({
			url:'https://api.unsplash.com/search/photos',
			type:'GET',
			dataType:'json',
			data:{
				client_id:'9ef032c1f73467e6e796f196e90a065237d4aacdda773e3f80b0cdb806bafe26',
				query:queryValue,
				per_page:12,
				orientation:'landscape',
			},
			success: function(data){
				$('#'+resultId).empty();
				$.each(data['results'], function(i, item){
					$('#'+resultId).append(
						'<div class="card cardContainerHover">'+
							'<img class="img-fluid imageHover" src="'+item.urls.small+'">'+
							'<div class="card-img-overlay cardCaption">'+
								'<span class="oi oi-circle-check card-title"></span>'+
							'</div>'+							
						'</div>'							
					);
				});
			}
		});
	}
	
	$('#widgetImageSearchResult').on('click', '.card', function(){
		$(this).removeClass('cardContainerHover');
	    $(this).addClass('cardContainerSelected');
	    selectedImage = $(this).find('img').attr('src');
	});	
	
	$('#widgetImageSubmit').on('click', function(){
		$('#widgetImageModal').modal('hide');
		gridster.add_widget('<li class="upImage" style="background-image: url('+selectedImage+');"></li>', 30 , 3, 1, 100);
	});
	
	//Slider
	$('#widgetSlider').on('click', function(){
		$('#widgetSliderModal').modal('show');
		imageUploadedList('widgetSliderUploadedList');
	});
	
	
	$('#widgetSliderUploadedList').on('click', '.card', function(){
		$(this).removeClass('cardContainerHover');
	    $(this).addClass('cardContainerSelected');
	    selectedImage = $(this).find('img').attr('src');
	});	
	
	
	//Slider upload 
    $('#widgetSliderUploadInput').on('change', function(){
    	imageUpload('widgetSliderUploadInput', 'widgetSliderUploadResult');
    });	
	
    
	//Slider search
	$('#widgetSliderSearchButton').on('click', function(){
		var queryValue = $('#widgetSliderSearchInput').val();
		if(queryValue){
			unsplash(queryValue, 'widgetSliderSearchResult');
		}
	});
	
	$('#widgetSliderSearchResult').on('click', '.card', function(){
		$(this).removeClass('cardContainerHover');
	    $(this).addClass('cardContainerSelected');
	    selectedImage = $(this).find('img').attr('src');
	});	
	
	$('#widgetSliderSubmit').on('click', function(){
		$('#widgetSliderModal').modal('hide');
		gridster.add_widget('<li class="upSlider" style="background-image: url('+selectedImage+');"><span class="oi oi-layers upSliderIcon"></span></li>', 30 , 3, 1, 100);
	});	
	
});