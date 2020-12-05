$(document).ready(function(){

    var windowsize = $(window).width();

    $('nav ul .normal-menu a, .scroll-link').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 30
        }, 500);
        return false;
    });

    $('.mobile-menu').click(function(){
        $('.normal-menu').fadeToggle();
    });
	
	
	/*
	 * Initi
	 */
	
	// if(config.contentLocker === false) {
	// 	$.ajax({
	// 		url : "functions/offers.php",
	// 		type: "POST",
	// 		cache: false,
	// 		dataType: "JSON",
	// 		async:false,
	// 		data : { session_id: $('#session_id').val() },
	// 		success: function(data, textStatus, jqXHR)
	// 		{
	// 			if(data.error === 0) {
	// 				$.each(data.msg, function(index, value){
	// 					$('.offersList').append('<li><a target="_blank" href="' + value.link[0] + '" rel="popover" data-img="' + value.image[0] + '">' + value.title[0] + '</a></li>');
	// 				});

	// 			} else {
	// 				$('.offers_loading_msg').text(data.msg);
	// 			}
	// 		},
	// 		error: function (jqXHR, textStatus, errorThrown)
	// 		{
	// 			console.log('error');
	// 		}
	// 	});
	// }
	
	// $('#review_rating').raty({
	// 	path: 'img/raty',
	// 	half: true
	// });
	
	

	
// 	var review_array = $.map(config.reviews, function(el) { return el; });
// 	var country_array = [
// 		'United States',
// 		'Canada',
// 		'United Kingdom',
// 		'China',
// 		'France',
// 		'Spain',
// 		'Portugal',
// 		'Germany'
// 	];
	
// 	shuffle(review_array);
// 	shuffle(country_array);
// //	add_review(review_array[2]['name'], review_array[2]['msg'], getRandomArbitrary(3, 4.5), moment().unix() - getRandomInt(80000, 200000), country_array[0], 200, false);
// //	add_review(review_array[1]['name'], review_array[1]['msg'], getRandomArbitrary(3, 4.5), moment().unix() - getRandomInt(5000, 75000), country_array[1], 150, false);
// //	add_review(review_array[0]['name'], review_array[0]['msg'], getRandomArbitrary(3, 4.5), moment().unix() - getRandomInt(100, 2000), country_array[2], 100, false);
	
// 	add_review(review_array[2]['name'], review_array[2]['msg'], review_array[2]['rating'], moment().unix() - getRandomInt(80000, 200000), review_array[2]['country'], 200, false);
// 	add_review(review_array[1]['name'], review_array[1]['msg'], review_array[1]['rating'], moment().unix() - getRandomInt(5000, 75000), review_array[1]['country'], 150, false);
// 	add_review(review_array[0]['name'], review_array[0]['msg'], review_array[0]['rating'], moment().unix() - getRandomInt(100, 2000), review_array[0]['country'], 100, false);
	
// 	$('.reviewSpinner').hide();
	
// 	$('a[rel=popover]').popover({
// 		html: true,
// 		trigger: 'hover',
// 		placement: 'bottom',
// 		content: function(){return '<img class="img-responsive" src="'+$(this).data('img') + '" />';}
// 	});
	
	$SELECTED_COIN = '';
	
	$('#coin_input').rangeslider({
		polyfill: false,
		rangeClass: 'rangeslider',
		fillClass: 'coin_fill',
		handleClass: 'coin_handle',
		onInit: function() {},
		onSlide: function(position, value) {
			$SELECTED_COIN = value;
			var comma_val = addCommas(value);
			$('.coins_val').text(comma_val);
		},
		onSlideEnd: function(position, value) {}
	});
	
    var $selected_device = '';

    $('.device-select').click(function(){
        fixDeviceBox($(this));
    });
	
	function addCommas(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function add_review(name, msg, rating, timestamp, country, fadeDelay, first) {
		var review="";
		review += "<li class=\"media\">";
		review += "	<div class=\"media-body\">";
		review += "		<strong class=\"text-success review_name\">" + name + "<span class='reviewSpan'> - <i class='fa fa-clock-o'><\/i> <span data-livestamp=\"" + timestamp + "\"></span><\/small><\/span><span class='reviewSpan'> - <i class='fa fa-globe'><\/i> " + country + "<\/span><\/strong>";
		review += "     <p class='no-margin'><small class=\"text-muted reviewTime\"><\/p>";
		review += "     <div class='review_rating' data-score='" + rating + "'><\/div>";
		review += "		<p>" + msg + "<\/p>";
		review += "	<\/div>";
		review += "<\/li>";
		if(first) {
			$('#reviews_section .media-list').prepend($(review).hide().fadeIn(fadeDelay));
		} else {
			$('#reviews_section .media-list').append($(review).hide().fadeIn(fadeDelay));
		}
		$('.review_rating').raty({
			path: 'img/raty',
			half: true,
			readOnly: true,
			score: function() {
				return $(this).attr('data-score');
			}
		});
	}
	
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

    function fixDeviceBox($parent_class) {
        resetAllDeviceBoxes();
        if($parent_class.hasClass('d-ps')){
            $selected_device = 'DEVICE_PLAYSTATION';
        }
        if($parent_class.hasClass('d-pc')){
            $selected_device = 'DEVICE_PC';
        }
        if($parent_class.hasClass('d-xb')){
            $selected_device = 'DEVICE_XBOX';
        }
        if($parent_class.hasClass('d-mobile')){
            $selected_device = 'DEVICE_MOBILE';
        }
        $parent_class.addClass('activated');
    }
    function resetAllDeviceBoxes() {
        var $device_1 = $('.d-ps');
        var $device_2 = $('.d-pc');
        var $device_3 = $('.d-xb');
        var $device_4 = $('.d-mobile');

        if($device_1.hasClass('activated')){
            $device_1.removeClass('activated');
        }
        if($device_2.hasClass('activated')){
            $device_2.removeClass('activated');
        }
        if($device_3.hasClass('activated')){
            $device_3.removeClass('activated');
        }
        if($device_4.hasClass('activated')){
            $device_4.removeClass('activated');
        }
    }
	
	
	$('.submitReviewBtn').click(function(){
		if($('#review_name').val() != '') {
			if($('#review_msg').val() != '') {
				if($('#review_rating').raty('score') != null) {
					add_review($('#review_name').val(), $('#review_msg').val(), $('#review_rating').raty('score'), moment().unix(), FIFA_SERVER, 1500, false);
					$('#review_name').val('');
					$('#review_msg').val('');
					$('#review_rating').raty({
						path: 'img/raty',
						half: true,
						score: 0
					});
				} else {
					sweetAlert("Error", "Please select a rating.", "error");
				}
			} else {
				sweetAlert("Error", "Please enter a message.", "error");
			}
		} else {
			sweetAlert("Error", "Please enter your name.", "error");
		}
	});
	
    $('.gen-button').click(function(){
        if($selected_device != '') {
            if($('#fifaversion_select').val() != '') {
                if($SELECTED_COIN != '') {
                    if($('#fifa_username').val() != '') {
						if(config.viral === false) {
							$('.generator-section').fadeOut('slow', function(){
								start_gen_console($('#fifa_username').val(), $selected_device, $('#fifaversion_select').val(), $SELECTED_COIN);
							});
						} else {
							
							/*
							 * Add Referal
							 */
							// if($('#ref_code').val() != 'false') {
							// 	$.ajax({
							// 		url : "functions/referal.php",
							// 		type: "POST",
							// 		cache: false,
							// 		dataType: "JSON",
							// 		data : { ref_code: $('#ref_code').val() },
							// 		success: function(data, textStatus, jqXHR)
							// 		{
							// 			if(data.success === 'yes') {
							// 				console.log('ref added');
							// 			}
							// 		}
							// 	});
							// }
							
							/*
							 * Open Viral Screen
							 */
							// $('.generator-section').fadeOut('slow', function(){
							// 	$('.viralSection').fadeIn('slow', function(){
							// 		var viralCheck = setInterval(function(){
							// 			$.ajax({
							// 				url : "functions/ajax_check_viral.php",
							// 				type: "POST",
							// 				cache: false,
							// 				dataType: "JSON",
							// 				data : { },
							// 				success: function(data, textStatus, jqXHR)
							// 				{
							// 					if(data.success === 'yes') {
							// 						$('.referal_count').text(data.count);
							// 						if(data.count >= 5) {
							// 							clearInterval(viralCheck);
							// 							$('.startGenBtn').removeAttr('disabled');
							// 							$('.startGenBtn').removeClass('disabled');
							// 						}
							// 					}
							// 				}
							// 			});
							// 		}, 5000);
							// 		$('html, body').animate({
							// 			scrollTop: $("#gen_section").offset().top + 100
							// 		}, 100);
							// 	});
							// });
							
						}
                    } else {
                        sweetAlert("Error", "Enter your clubname or Origin username.", "error");
                    }
                } else {
                    sweetAlert("Error", "Choose the amount of coins.", "error");
                }
            } else {
                sweetAlert("Error", "Select your game version.", "error");
            }
        } else {
            sweetAlert("Error", "Select your platform.", "error");
        }
    });
	
	
	$('.startGenBtn').click(function(){
		$('.viralSection').fadeOut('slow', function(){
			start_gen_console($('#fifa_username').val(), $selected_device, $('#fifaversion_select').val(), $SELECTED_COIN);
		});
	});
	
	function start_gen_console(username, device, fifaversion, coins){
		$('.gen-console-area').fadeIn('slow', function(){
			start_process(username, device, fifaversion, coins, function(){
				if(config.contentLocker === false) {
					$('.gen-console-area').fadeOut('slow', function(){
						$('.offers-section').fadeIn('slow', function(){
							var postbackCheck = setInterval(function(){
								$.ajax({
									url : "",
									type: "POST",
									cache: false,
									dataType: "JSON",
									data : { session_id: $('#session_id').val() },
									success: function(data, textStatus, jqXHR)
									{
										console.log('success');
										if(data.success === 'yes') {
											clearInterval(postbackCheck);
											$.magnificPopup.open({
												items: {
													src: '#loading_modal',
												},
												type: 'inline',
												preloader: false,
												modal: true,
												callbacks: {
													open: function() {
														setTimeout(function(){
															$('.loading_area').fadeOut(function(){
																$('.error_message').fadeIn();
															});
														}, 5000);
													}, 
													close: function() {
														console.log('closed');
													}
												}
											});

										}
									},
									error: function (jqXHR, textStatus, errorThrown)
									{
										console.log('error');
									}
								});
							}, 5000);
						});
					});
				} else {
					// content locker onclick code here
					call_locker();
				}
			});
			$('html, body').animate({
				scrollTop: $("#gen_section").offset().top + 100
			}, 100);
		});
	}


    var $console_text_area = $('.gen-dev-console');
    var $console_text_list = $('.dev-console-text');
    var $console_text_area_height = $console_text_area.height();

    function output_loading_message(text, delay){
        setTimeout(function(){
            var $loading_message_area = $('.gen-loading-msg');
            $loading_message_area.html(text);
        }, delay);
    }
    function output_to_console(text, delay){
        setTimeout(function(){
            var $output_text = $('<li><i class="fa fa-angle-right"></i> ' + text + '</li>');
            $output_text.hide().appendTo($console_text_list).fadeIn();
            $console_text_area.animate({scrollTop: $console_text_area_height}, 500);
            $console_text_area_height += $console_text_area.height();
        }, delay);
    }
    function output_to_console_green(text, delay){
        setTimeout(function(){
            var $output_text = $('<li class="console-green-text"><i class="fa fa-angle-right"></i> ' + text + '</li>');
            $output_text.hide().appendTo($console_text_list).fadeIn();
            $console_text_area.animate({scrollTop: $console_text_area_height}, 500);
            $console_text_area_height += $console_text_area.height();
        }, delay);
    }
    function output_to_console_red(text, delay){
        setTimeout(function(){
            var $output_text = $('<li class="console-red-text"><i class="fa fa-angle-right"></i> ' + text + '</li>');
            $output_text.hide().appendTo($console_text_list).fadeIn();
            $console_text_area.animate({scrollTop: $console_text_area_height}, 500);
            $console_text_area_height += $console_text_area.height();
        }, delay);
    }
    function output_to_console_yellow(text, delay){
        setTimeout(function(){
            var $output_text = $('<li class="console-yellow-text"><i class="fa fa-angle-right"></i> ' + text + '</li>');
            $output_text.hide().appendTo($console_text_list).fadeIn();
            $console_text_area.animate({scrollTop: $console_text_area_height}, 500);
            $console_text_area_height += $console_text_area.height();
        }, delay);
    }
    function start_process(username, device, version, coins, callback_function){
        //output_loading_message("Processing request", "Comunicating with our login servers");
        output_to_console("Performing server authentication: connect_to_server(332FS2);", 0);
        output_loading_message("Successully obtained server status verification", 300);
        output_to_console_green("Response: Successfully authenticated secure server connection.", 750);
        output_loading_message("Importing files for encryption of user request", 1200);
        output_to_console("Import: AES_256_Keys();", 1400);
        output_to_console("Import: Open_SSL_Encryption();", 1600);
        output_to_console("Import: Server_332FS2_Keychain();", 1880);
        output_loading_message("Importing of encryption files and methods completed", 2000);
        output_to_console_green("Response: All files were imported successfully.", 2400);
        output_to_console("Retrieving form input information: kernel.forms.obtain_user_information();", 2670);
        output_loading_message("User HTTP request information has been obtained", 2900);
        output_to_console_green("Response: Obtained user form input information.", 3100);
        output_to_console_yellow("USERNAME: " + username, 3400);
        output_to_console_yellow("DEVICE: " + device, 3500);
        output_to_console_yellow("FIFA_VERSION: " + version, 3500);
        output_to_console_yellow("COINS_AMOUNT: " + coins, 3500);
        output_to_console("Injecting the information securely into encryption server: kernel.generator.start_process();", 4200);
        output_loading_message("User information is being encrypted", 4400);
        output_to_console("Encrypting request: kernel.open_ssl_enc(" + username + ");", 4700);
        output_loading_message("User information encryption completed", 5000);
        output_to_console_green("Response: Successfully encrypted user request.", 5300);
        output_to_console_green("Encrypted Information: 608c4a1b463ec35ad0354c1edd5ae961add292b6675cbca8ac41d70d37d4e2a7dba2b", 5600);
        output_to_console("Retrieving current EA server script: read_ea_server_source();", 6000);
        output_loading_message("Obtaining methods to create a backdoor into EA servers", 6100);
        output_to_console_green("Response: Successfully obtained current server script.", 6400);
        output_to_console_yellow("MD5 hash: 2c58b6d627de1c58cc4fda16e1037a08", 6900);
        output_to_console_yellow("Local IP address: 192.168.5.6", 7100);
        output_to_console_yellow("Current version: 2.320.23.1", 7200);
        output_to_console_yellow("Login server version: 1.32.4.5", 7300);
        output_to_console_yellow("Number external methods: 43267", 7400);
        output_to_console_yellow("Initialization method: kernel.cc_server.application.main.init();", 7600);
        output_to_console("Injecting into main method: inject_ssl(kernel.cc_server.application.main.init);", 8000);
        output_loading_message("Processing orginal user request to confirm human source", 8250);
        output_to_console_green("Response: Successfully injected into Fifa servers.", 8430);
        setTimeout(function(){
            $('.loading-spinner').css('border-left', '1.1em solid #be2929');
        }, 8900);
        output_to_console_red("Automatic human verification failed.", 8900);
        output_to_console_red("Please complete manual human verification.", 8900);
        output_to_console_red("Initating redirect procedure.", 8900);
        output_loading_message("Redirecting to human verification screen", 9400);
        setTimeout(function(){
            callback_function();
        }, 12500);
    }
	

});