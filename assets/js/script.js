$(document).ready(function(){

	addYoutubePlayer( 'a.video_pop_up' )
	closeYoutubePlayer('.close', '.hide_overlay');

	addDatePicker('#birthdate');

	$('a.social').on("click", function(e) {
    socialLinkPopup(e, 600, 400, 'yes', $(this));
  });

	scrollToFixed();
	$(window).scroll(function(){
		var scroll 				= $(window).scrollTop()
		var headerHeight 		= $('.navigator.sticky.topfix').height();
		var heroBannerHeight 	= $('section.feature-banner').height();

		scrollToFixed();
		hotMenu( scroll, headerHeight, heroBannerHeight );
	});

	// SLICK
	$('.carousel').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 1,
				  infinite: true,
				  dots: true
				}
			},
			{
				breakpoint: 428,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  infinite: true,
				  dots: true,
				  arrows: false
				}
			}
		]
		
	});
	$('.carousel-hero-banner').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 2000,
	  infinite: true,
	  dots: true,
	  arrows: false
	});

});

function addYoutubePlayer( objAdd ){

	$( objAdd ).on('click', function(){

		var ytId = $(this).data('youtubevideo');
		var ytCaption = $(this).data('caption');
		var youtubeEmbedPlayer = '<iframe width="560" height="430" src="https://www.youtube.com/embed/'+ytId+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

		// ADD YOUTUBE EMBED PLAYER
		var ytEmbedReplace = $('.youtube-placeholder').html( youtubeEmbedPlayer );

		// REPLACE CAPTION IN MODAL
		$('.modal-footer').html( ytCaption );

		// RESIZE IFRAME TO RATIO 16:9
		// var ifYoutube = $('.youtube-placeholder iframe');
		// var ifWidth = ifYoutube.width();
		// var ifHeight = ifWidth*0.5625;
		// ifYoutube.height(ifHeight);

	});


}

function closeYoutubePlayer(objCloss, objOverlay) { // CONDITION : close youtube player when close popup with bottun
	$(objCloss).click(function (e) {
		// var videoEl = jQuery(this).closest(objOverlay).find('iframe');
		// videoEl.attr('src', videoEl.attr('src'));

			$('.youtube-placeholder').html('');
			$('.modal-footer').html('');

	});
}

function addDatePicker(obj_id) { // CONDITION : datepicker working when has DOM on page

	if ($(obj_id).length > 0) {
		$(obj_id).datepicker({
			autoclose: true,
			todayHighlight: true
		}).datepicker('update', new Date());
		// console.log("added Datepicker");
	} else {
		// console.log("not has it.");
	}
}

function socialLinkPopup(e, intWidth, intHeight, blnResize, action) {

	// console.log(e);

    // Prevent default anchor event
    e.preventDefault();

    // Set values for window
    intWidth = intWidth || '500';
    intHeight = intHeight || '400';
    strResize = (blnResize ? 'yes' : 'no');

    // Set title and open popup with focus on it
    var strTitle = ((typeof action.attr('title') !== 'undefined') ? action.attr('title') : 'Social Share'),
        strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
        objWindow = window.open(action.attr('href'), strTitle, strParam).focus();
}

function ulBranchList() {
	
	var domUlBranchList = $('ul.branch-list');
	var domUlBranchListParent = domUlBranchList.parents('li');

	
	domUlBranchList.css( 'top', domUlBranchList.parents('ul.hotmenu').height()+'px' );

	// console.log(domUlBranchListParent.attr('class'));
	
	domUlBranchListParent.on({
		mouseenter: function(){
			domUlBranchList.slideDown();
		},
		mouseleave: function(){
			domUlBranchList.slideUp();
		}

	});
	
}

function hotMenu( scroll, headerHeight, heroBannerHeight ) {

	// SETUP ul.branch-list.height()
	ulBranchList();

	// console.log(headerHeight+' | '+heroBannerHeight);
	// console.log('top: '+scroll);

	var domHotmenu = $('ul.hotmenu');
	var domHotmenuParent = domHotmenu.parents('.hotmenu.--home');

	if( scroll > (headerHeight+heroBannerHeight-5)){
		
		// console.log('ready to fixed');
		// console.log('scroll: '+scroll+' total: '+(headerHeight+heroBannerHeight+25));
		// console.log('domHotmenu height: '+domHotmenu.height());
		// console.log( domHotmenuParent.attr('class') );
		// console.log( 'domHotmenu.height: '+domHotmenu.height());
		
		
		

		domHotmenu.addClass('--fixed');
		domHotmenu.css('top', headerHeight+'px');
		domHotmenuParent.css('height', (domHotmenu.height()+64)+'px');
	} else {
		domHotmenu.removeClass('--fixed');
		domHotmenu.css('top', '0');
	}
}

function scrollToFixed(){ // console.log('start Fn:scrollToFixed');

	// SETUP PARAMETER
	var scroll 						= $(window).scrollTop(),
		domSticky 					= $('.navigator.sticky'),
		// domHotmenu					= $('.hotmenu'),
		domCarousel 				= $('.carousel-hero-banner'),
		domTopbar 					= $('.topbar'),
		domNavbar           		= $('.navbar.navbar-paolo'),
		domSiteLogo 				= $('.navigator.sticky nav.navbar a.navbar-brand img'),

		stickyHeight 				= domSticky.height(),
		// hotmenuHeight 			= domHotmenu.height(),
		carouselHeight 				= domCarousel.height(),
		topbarHeight 				= domTopbar.height()+21,
		navbarHeight 				= domNavbar.height(),
		sumHeightTopbarCarousel 	= stickyHeight+carouselHeight,

		scWidth 					= screen.width,
		scHeight 					= screen.height;

			console.log('carouselHeight: '+carouselHeight);
			

	// RESPONSIVE PAGE
	// ---------------------------------------------------------------------------
  if ( scWidth > 768 ) {} else {}

	// ON SCROLLING
	// ---------------------------------------------------------------------------
  if( scroll < 1 ) {
		domNavbar.css('top', '0');
		domSiteLogo.css('max-width', '150px').css('bottom', '0');
		domSticky.css('height', '133px');
  }
	else {
		domNavbar.css('top', '-71px');
		domSiteLogo.css('max-width', '80px').css('bottom', '-20px');
		domSticky.css('height', topbarHeight+'px');

		if( scroll >= sumHeightTopbarCarousel ) {
			domCarousel.css('margin-bottom', '82px');
			// 20190719 : domHotmenu.css('position', 'fixed').css('width', '100%').css('top', topbarHeight+'px').css('z-index', '1');

		}
		else {
			domCarousel.css('margin-bottom', '0');
			// 20190719 : domHotmenu.css('position', 'relative').css('top', '0')
		} // if:scroll >= sumHeightTopbarCarousel

  } // if:scroll < 1


  // ANIMATION :
	// ---------------------------------------------------------------------------
	// ---------- desktop layout
  if( scWidth > 768 && scroll < 1 ){} //console.log('case 1');
  else if ( scWidth > 768 && scroll >= 1 ) {} //console.log('case 2');
	else if ( scWidth <= 768 && scroll < 1) { //console.log('case 3');

		domSiteLogo.css('width', '100px');
		domSticky.css('height', '96px').css('top', '0');
		domNavbar.css('top', '0').css('height', '96px');
		// 20190719 : domHotmenu.css('top', '0');
  }
	else if ( scWidth <= 768 && scroll >= 1 ) { //console.log('case 4');

		domSiteLogo.css('width', '100px').css('max-width', '100px').css('bottom', '0');
		domSticky.css('top', '0');
		domNavbar.css('top', '0').css('height', '96px');
		// 20190719 : domHotmenu.css('top', '0').css('z-index', '200');

		if( scroll >= domCarousel.height() ) {
			domCarousel.css('margin-bottom', '80px');
			// 20190719 : domHotmenu.css('position', 'fixed').css('top', '96px').css('width', '100%');
		}
		else {
			domCarousel.css('margin-bottom', '0');
		} //if:scroll >= domCarousel.height()

  }
  else { //console.log('case 5');
  }

} // if:scWidth > 768 && scroll < 1
